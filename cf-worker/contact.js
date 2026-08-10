/**
 * Cloudflare Worker — Mernify contact form API (Resend)
 *
 * Single email sender for the website + AI leads.
 *
 * Deploy:
 *   npx wrangler deploy --config cf-worker/wrangler.contact.toml
 *
 * Secrets / vars (Dashboard or wrangler secret put):
 *   RESEND_API_KEY   = re_xxxxxxxx                         [Secret]
 *   CONTACT_TO       = info@mernify.co
 *   CONTACT_FROM     = Mernify <hello@mernify.co>          (verified domain)
 *   ALLOWED_ORIGIN   = http://localhost:5173,http://127.0.0.1:5173,https://mernify.co,https://www.mernify.co
 *
 * Callers (server-side only — do not put Resend in VITE_*):
 *   - Website: Pages Function /api/contact (service binding CONTACT_WORKER or CONTACT_ENDPOINT)
 *   - AI Worker: CONTACT_ENDPOINT → this Worker URL
 *
 * Local:
 *   npm run contact:worker
 *   Root .env: CONTACT_ENDPOINT=http://127.0.0.1:8788
 *   cf-worker/.dev.vars: RESEND_API_KEY=re_...
 */

const RATE_WINDOW_MS = 60_000
const RATE_MAX = 8
/** @type {Map<string, { count: number, reset: number }>} */
const rateMap = new Map()
const DEFAULT_TO = 'info@mernify.co'

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
  return entry.count > RATE_MAX
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

function corsFor(origin, allowed) {
  if (originAllowed(origin, allowed)) return CORS(origin)
  return {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    Vary: 'Origin',
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildBodies({ name, email, company, service, budget, timeline, message, ip }) {
  const rows = [
    ['Name', name],
    ['Email', email],
    ['Company', company || '—'],
    ['Service', service || '—'],
    ['Budget', budget || '—'],
    ['Target start date', timeline || '—'],
    ['IP', ip || '—'],
  ]
  const text = [
    `New form submission from ${name}`,
    ...rows.map(([l, v]) => `${l}: ${v}`),
    '',
    'Message:',
    message,
  ].join('\n')

  const htmlRows = rows
    .map(
      ([l, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#64748b;">${escapeHtml(l)}</td><td style="padding:8px 0;color:#0f172a;">${escapeHtml(v)}</td></tr>`,
    )
    .join('')

  const html = `
    <div style="font-family:Segoe UI,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#0f172a;">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#4f46e5;font-weight:700;">Mernify</p>
      <h1 style="margin:0 0 20px;font-size:22px;">New Form Submission</h1>
      <table style="border-collapse:collapse;width:100%;margin:0 0 20px;">${htmlRows}</table>
      <div style="white-space:pre-wrap;padding:16px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">${escapeHtml(message)}</div>
    </div>
  `.trim()

  return { text, html }
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

    if (!name || name.length < 2) return json({ error: 'Invalid name' }, 400, cors)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Invalid email' }, 400, cors)
    }
    if (!message || message.length < 20) {
      return json({ error: 'Invalid message' }, 400, cors)
    }
    if (!body.consent) return json({ error: 'Consent required' }, 400, cors)

    const apiKey = String(env.RESEND_API_KEY || '').trim()
    if (!apiKey) {
      console.error('[contact-worker] RESEND_API_KEY missing')
      return json({ error: 'Server misconfigured' }, 500, cors)
    }

    const to = String(env.CONTACT_TO || DEFAULT_TO).trim() || DEFAULT_TO
    const from = String(env.CONTACT_FROM || '').trim() || 'Mernify <hello@mernify.co>'
    const { text, html } = buildBodies({
      name,
      email,
      company,
      service,
      budget,
      timeline,
      message,
      ip,
    })

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
        subject: `New Form Submission — ${name}`,
        text,
        html,
      }),
    })

    if (!resendRes.ok) {
      const detail = await resendRes.text().catch(() => '')
      console.error('[contact-worker] Resend failed', resendRes.status, detail.slice(0, 400))
      return json({ error: 'Delivery failed. Please email info@mernify.co.' }, 502, cors)
    }

    let id = ''
    try {
      const data = await resendRes.json()
      id = data?.id ? String(data.id) : ''
    } catch {
      /* ignore */
    }

    return json({ ok: true, id }, 200, cors)
  },
}
