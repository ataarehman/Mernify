/**
 * Cloudflare Worker — Mernify contact form API
 *
 * Accepts JSON POST from the marketing site and emails via Resend.
 * Secrets stay on the Worker — never put RESEND_API_KEY in VITE_* vars.
 *
 * Deploy:
 * 1. Cloudflare Dashboard → Workers → Create → paste this file
 * 2. Settings → Variables / Secrets:
 *      RESEND_API_KEY   = re_xxxxxxxx (https://resend.com)  [Secret]
 *      CONTACT_TO      = info@mernify.co
 *      CONTACT_FROM    = Mernify <info@mernify.co>  (verified domain preferred)
 *      ALLOWED_ORIGIN  = https://mernify.co,https://www.mernify.co
 * 3. Copy worker URL into VITE_CONTACT_ENDPOINT
 * 4. Rebuild the static site
 *
 * Security: CORS allowlist, honeypot, field validation, length limits,
 * basic in-memory rate limit per IP (best-effort on Workers).
 */

const RATE_WINDOW_MS = 60_000
const RATE_MAX = 8
/** @type {Map<string, { count: number, reset: number }>} */
const rateMap = new Map()

const CORS = (origin) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Max-Age': '86400',
  Vary: 'Origin',
})

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...headers,
    },
  })
}

function sanitize(value, max) {
  const cleaned = String(value ?? '')
    .split('')
    .filter((ch) => {
      const code = ch.charCodeAt(0)
      return code >= 32 || code === 9 || code === 10 || code === 13
    })
    .join('')
  return cleaned.replace(/<[^>]*>/g, '').trim().slice(0, max)
}

function clientIp(request) {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

function rateLimit(ip) {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS })
    return false
  }
  entry.count += 1
  if (entry.count > RATE_MAX) return true
  return false
}

function originAllowed(origin, allowed) {
  if (!origin || origin === 'null') return false
  return allowed.some(
    (a) =>
      origin === a ||
      (a.includes('localhost') && origin.startsWith('http://localhost')) ||
      (a.includes('127.0.0.1') && origin.startsWith('http://127.0.0.1')) ||
      origin.endsWith('.pages.dev'),
  )
}

/** Build CORS headers only when the request Origin is allowed — never echo a mismatched fallback. */
function corsFor(origin, allowed) {
  if (originAllowed(origin, allowed)) return CORS(origin)
  return {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    Vary: 'Origin',
  }
}

export default {
  async fetch(request, env) {
    const allowed = (env.ALLOWED_ORIGIN || 'https://mernify.co,https://www.mernify.co')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const origin = request.headers.get('Origin') || ''
    const cors = corsFor(origin, allowed)

    if (request.method === 'OPTIONS') {
      if (origin && !originAllowed(origin, allowed)) {
        return json({ error: 'Origin not allowed' }, 403, cors)
      }
      return new Response(null, { status: 204, headers: cors })
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, cors)
    }

    if (!originAllowed(origin, allowed)) {
      return json({ error: 'Origin not allowed' }, 403, cors)
    }

    const ip = clientIp(request)
    if (rateLimit(ip)) {
      return json({ error: 'Too many requests. Please try again shortly.' }, 429, cors)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return json({ error: 'Invalid JSON' }, 400, cors)
    }

    // Honeypot — silent success
    if (body.website || body.company_url) {
      return json({ ok: true }, 200, cors)
    }

    const name = sanitize(body.name, 120)
    const email = sanitize(body.email, 160)
    const message = sanitize(body.message, 5000)
    const company = sanitize(body.company, 160)
    const service = sanitize(body.service, 120)
    const budget = sanitize(body.budget, 80)
    const timeline = sanitize(body.timeline, 120)

    if (!name) return json({ error: 'Invalid name' }, 400, cors)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Invalid email' }, 400, cors)
    }
    if (!message || message.length < 20) {
      return json({ error: 'Invalid message' }, 400, cors)
    }
    if (!body.consent) {
      return json({ error: 'Consent required' }, 400, cors)
    }

    const apiKey = env.RESEND_API_KEY
    if (!apiKey) {
      return json({ error: 'Server misconfigured' }, 500, cors)
    }

    const to = env.CONTACT_TO || 'info@mernify.co'
    const from = env.CONTACT_FROM || 'Mernify <info@mernify.co>'

    const text = [
      `New inquiry from ${name}`,
      `Email: ${email}`,
      `Company: ${company || '—'}`,
      `Service: ${service || '—'}`,
      `Budget: ${budget || '—'}`,
      `Timeline: ${timeline || '—'}`,
      `IP: ${ip}`,
      '',
      message,
    ].join('\n')

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Mernify inquiry — ${company || name}`,
        text,
      }),
    })

    if (!resendRes.ok) {
      // Do not leak upstream response bodies to browsers
      return json({ error: 'Delivery failed. Please email info@mernify.co.' }, 502, cors)
    }

    return json({ ok: true }, 200, cors)
  },
}
