import {
  parseContactBody,
  sendContactEmail,
  validateContactPayload,
} from '../_lib/contactMail.js'

const RATE_WINDOW_MS = 60_000
const RATE_MAX = 8
/** @type {Map<string, { count: number, reset: number }>} */
const rateMap = new Map()

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
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
  return entry.count > RATE_MAX
}

/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Form → /api/contact → EMAIL_SERVICE_URL (mail microservice) → info@mernify.co
 * Auth: EMAIL_SECRET via header x-email-secret (server-side only).
 *
 * Never self-proxies to /api/contact (that caused fake { ok: true }).
 * Success only after the mail service accepts the message.
 */
export async function onRequestPost({ request, env }) {
  const ip = clientIp(request)
  if (rateLimit(ip)) {
    return json({ error: 'Too many requests. Please try again shortly.' }, 429)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const fields = parseContactBody(body)
  const check = validateContactPayload(fields)
  if (check.honeypot) return json({ ok: true })
  if (check.error) return json({ error: check.error }, check.status)

  const result = await sendContactEmail(fields, env, ip)
  if (!result.ok) return json({ error: result.error }, result.status)
  return json({ ok: true, provider: result.provider, id: result.id || undefined })
}
