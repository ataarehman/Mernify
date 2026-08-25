/**
 * Blog admin auth: signed session cookie, Cloudflare Access JWT, optional header bypass.
 *
 * Accept admin if ANY of:
 * 1. Valid `mernify_admin_session` cookie (HMAC-SHA256)
 * 2. Valid Cf-Access-Jwt-Assertion when CF_ACCESS_AUD is set
 * 3. BLOG_ADMIN_BYPASS=1 + x-blog-admin-secret === BLOG_ADMIN_SECRET (scripts only)
 */

const SESSION_COOKIE = 'mernify_admin_session'
/** Session TTL: 7 days */
export const SESSION_TTL_SEC = 7 * 24 * 60 * 60

const JWKS_CACHE = new Map()

function b64urlToBytes(input) {
  const pad = '='.repeat((4 - (input.length % 4)) % 4)
  const b64 = (input + pad).replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i)
  return out
}

function bytesToB64url(bytes) {
  let bin = ''
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  for (let i = 0; i < arr.length; i += 1) bin += String.fromCharCode(arr[i])
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function decodeJwtPart(part) {
  const json = new TextDecoder().decode(b64urlToBytes(part))
  return JSON.parse(json)
}

async function importRsaKey(jwk) {
  return crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify'],
  )
}

async function getJwks(teamDomain) {
  const host = String(teamDomain || '')
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
  if (!host) return null

  const cached = JWKS_CACHE.get(host)
  if (cached && cached.expires > Date.now()) return cached.keys

  const res = await fetch(`https://${host}/cdn-cgi/access/certs`)
  if (!res.ok) return null
  const body = await res.json()
  const keys = body.keys || []
  JWKS_CACHE.set(host, { keys, expires: Date.now() + 60 * 60 * 1000 })
  return keys
}

async function verifyAccessJwt(token, env) {
  const parts = String(token || '').split('.')
  if (parts.length !== 3) return null

  const header = decodeJwtPart(parts[0])
  const payload = decodeJwtPart(parts[1])
  const aud = env.CF_ACCESS_AUD
  const payloadAud = payload.aud
  const audOk = Array.isArray(payloadAud)
    ? payloadAud.includes(aud)
    : payloadAud === aud
  if (!audOk) return null

  if (payload.exp && payload.exp * 1000 < Date.now()) return null

  const keys = await getJwks(env.CF_ACCESS_TEAM_DOMAIN)
  if (!keys?.length) return null

  const jwk = keys.find((k) => k.kid === header.kid) || keys[0]
  if (!jwk) return null

  const key = await importRsaKey(jwk)
  const data = new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
  const sig = b64urlToBytes(parts[2])
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, sig, data)
  if (!ok) return null

  const email = payload.email || payload.common_name || null
  return { email }
}

function parseCookies(header) {
  const out = {}
  if (!header) return out
  for (const part of String(header).split(';')) {
    const idx = part.indexOf('=')
    if (idx < 0) continue
    const k = part.slice(0, idx).trim()
    const v = part.slice(idx + 1).trim()
    if (k) out[k] = v
  }
  return out
}

async function sha256Bytes(str) {
  const data = new TextEncoder().encode(String(str))
  return new Uint8Array(await crypto.subtle.digest('SHA-256', data))
}

/** Timing-safe string compare via SHA-256 of both sides. */
export async function timingSafeEqualString(a, b) {
  const ha = await sha256Bytes(a ?? '')
  const hb = await sha256Bytes(b ?? '')
  if (ha.length !== hb.length) return false
  let diff = 0
  for (let i = 0; i < ha.length; i += 1) diff |= ha[i] ^ hb[i]
  return diff === 0
}

async function importHmacKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(String(secret)),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

function getSessionSecret(env) {
  const s = env.BLOG_ADMIN_SESSION_SECRET
  return s && String(s).trim() ? String(s).trim() : null
}

export function passwordAuthConfigured(env) {
  return Boolean(
    env.BLOG_ADMIN_USERNAME &&
      String(env.BLOG_ADMIN_USERNAME).trim() &&
      env.BLOG_ADMIN_PASSWORD != null &&
      String(env.BLOG_ADMIN_PASSWORD).length > 0,
  )
}

function authConfigured(env) {
  return (
    passwordAuthConfigured(env) ||
    Boolean(env.CF_ACCESS_AUD) ||
    (env.BLOG_ADMIN_BYPASS === '1' && Boolean(env.BLOG_ADMIN_SECRET))
  )
}

/**
 * Create a signed session token: base64url(json).base64url(hmac)
 */
export async function createSessionToken(username, env, { ttlSec = SESSION_TTL_SEC } = {}) {
  const secret = getSessionSecret(env)
  if (!secret) throw new Error('BLOG_ADMIN_SESSION_SECRET is not configured')

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    sub: String(username),
    iat: now,
    exp: now + ttlSec,
  }
  const payloadB64 = bytesToB64url(new TextEncoder().encode(JSON.stringify(payload)))
  const key = await importHmacKey(secret)
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64))
  return `${payloadB64}.${bytesToB64url(sig)}`
}

/**
 * Verify session cookie value. Returns { username } or null.
 */
export async function verifySessionToken(token, env) {
  if (!token || typeof token !== 'string') return null
  const secret = getSessionSecret(env)
  if (!secret) return null

  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [payloadB64, sigB64] = parts

  try {
    const key = await importHmacKey(secret)
    const ok = await crypto.subtle.verify(
      'HMAC',
      key,
      b64urlToBytes(sigB64),
      new TextEncoder().encode(payloadB64),
    )
    if (!ok) return null

    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(payloadB64)))
    if (!payload?.sub || typeof payload.sub !== 'string') return null
    if (!payload.exp || payload.exp * 1000 < Date.now()) return null
    return { username: payload.sub }
  } catch {
    return null
  }
}

function isHttpsRequest(request) {
  const url = new URL(request.url)
  if (url.protocol === 'https:') return true
  const proto = request.headers.get('x-forwarded-proto')
  return String(proto || '')
    .split(',')[0]
    .trim()
    .toLowerCase() === 'https'
}

/**
 * Build Set-Cookie for a new session.
 */
export function buildSessionCookieHeader(token, request, { maxAge = SESSION_TTL_SEC } = {}) {
  const parts = [
    `${SESSION_COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ]
  if (isHttpsRequest(request)) parts.push('Secure')
  return parts.join('; ')
}

/**
 * Build Set-Cookie that clears the session.
 */
export function buildClearSessionCookieHeader(request) {
  const parts = [
    `${SESSION_COOKIE}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0',
  ]
  if (isHttpsRequest(request)) parts.push('Secure')
  return parts.join('; ')
}

export function getSessionCookieFromRequest(request) {
  const cookies = parseCookies(request.headers.get('Cookie'))
  return cookies[SESSION_COOKIE] || null
}

/**
 * Validate username/password against env (timing-safe).
 */
export async function validateAdminCredentials(username, password, env) {
  if (!passwordAuthConfigured(env)) return false
  const userOk = await timingSafeEqualString(
    String(username ?? ''),
    String(env.BLOG_ADMIN_USERNAME).trim(),
  )
  const passOk = await timingSafeEqualString(
    String(password ?? ''),
    String(env.BLOG_ADMIN_PASSWORD),
  )
  return userOk && passOk
}

/**
 * Light delay on failed login to slow credential stuffing (no extra deps).
 */
export function loginFailureDelayMs() {
  return 250 + Math.floor(Math.random() * 150)
}

export async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms))
}

/**
 * @param {Request} request
 * @param {Record<string, string|undefined>} env
 * @returns {Promise<{ ok: boolean, email: string|null, username?: string|null, error?: string }>}
 */
export async function verifyAccess(request, env = {}) {
  // 1) Signed session cookie
  if (passwordAuthConfigured(env) && getSessionSecret(env)) {
    const raw = getSessionCookieFromRequest(request)
    if (raw) {
      const session = await verifySessionToken(raw, env)
      if (session) {
        return {
          ok: true,
          email: null,
          username: session.username,
        }
      }
    }
  }

  // 2) Optional header bypass (scripts / curl — never rely on SPA for this)
  if (env.BLOG_ADMIN_BYPASS === '1') {
    const secret = request.headers.get('x-blog-admin-secret')
    if (env.BLOG_ADMIN_SECRET && secret && secret === env.BLOG_ADMIN_SECRET) {
      return { ok: true, email: 'local-admin@mernify.local', username: 'bypass' }
    }
  }

  // 3) Cloudflare Access JWT
  if (env.CF_ACCESS_AUD) {
    const assertion = request.headers.get('Cf-Access-Jwt-Assertion')
    if (assertion) {
      try {
        const verified = await verifyAccessJwt(assertion, env)
        if (verified) {
          return { ok: true, email: verified.email, username: verified.email }
        }
        return { ok: false, email: null, error: 'Invalid Access token' }
      } catch {
        return { ok: false, email: null, error: 'Access verification failed' }
      }
    }
  }

  if (!authConfigured(env)) {
    return { ok: false, email: null, error: 'Admin auth is not configured' }
  }

  if (env.CF_ACCESS_AUD && !request.headers.get('Cf-Access-Jwt-Assertion')) {
    // Session already checked; Access configured but no assertion and no session
    return { ok: false, email: null, error: 'Unauthorized' }
  }

  if (env.BLOG_ADMIN_BYPASS === '1') {
    return { ok: false, email: null, error: 'Unauthorized' }
  }

  return { ok: false, email: null, error: 'Unauthorized' }
}

export { SESSION_COOKIE }
