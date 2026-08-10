/**
 * Shared contact-form delivery.
 * Used by Cloudflare Pages Function and local Vite middleware.
 *
 * Providers (server-side secrets only — never VITE_*):
 * 1. EMAIL_SERVICE_URL + EMAIL_SECRET — deployed mail microservice (primary)
 *    Default URL: https://mernify.co/api/email
 * 2. RESEND_API_KEY — optional fallback (only if configured)
 * 3. WEB3FORMS_ACCESS_KEY — optional fallback
 *
 * Recipient for Resend/Web3Forms is forced to CONTACT_TO or info@mernify.co.
 * The microservice delivers to whatever inbox it is configured for (should be info@mernify.co).
 *
 * Success is returned only after a provider accepts the message (no fake ok).
 */

const MESSAGE_MIN = 20
const MESSAGE_MAX = 5000
const DEFAULT_TO = 'info@mernify.co'
const DEFAULT_EMAIL_SERVICE_URL = 'https://mernify.co/api/email'

export function sanitize(value, max) {
  const cleaned = String(value ?? '')
    .split('')
    .filter((ch) => {
      const code = ch.charCodeAt(0)
      return code >= 32 || code === 9 || code === 10 || code === 13
    })
    .join('')
  return cleaned.replace(/<[^>]*>/g, '').trim().slice(0, max)
}

export function parseContactBody(body) {
  return {
    website: sanitize(body.website || body.company_url, 200),
    name: sanitize(body.name, 120),
    email: sanitize(body.email, 160),
    company: sanitize(body.company, 160),
    service: sanitize(body.service, 120),
    budget: sanitize(body.budget, 80),
    timeline: sanitize(body.timeline, 120),
    message: sanitize(body.message, MESSAGE_MAX),
    consent: Boolean(body.consent),
    source: sanitize(body.source, 80),
    page: sanitize(body.page, 200),
  }
}

export function validateContactPayload(fields) {
  if (fields.website) return { honeypot: true }
  if (!fields.name || fields.name.length < 2) return { error: 'Invalid name', status: 400 }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return { error: 'Invalid email', status: 400 }
  }
  if (!fields.message || fields.message.length < MESSAGE_MIN) {
    return { error: 'Invalid message', status: 400 }
  }
  if (fields.message.length > MESSAGE_MAX) {
    return { error: 'Message too long', status: 400 }
  }
  if (!fields.consent) return { error: 'Consent required', status: 400 }
  return { ok: true }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function recipient(env) {
  return String(env.CONTACT_TO || DEFAULT_TO).trim() || DEFAULT_TO
}

function subjectFor(fields) {
  return `New Form Submission — ${fields.name}`
}

function buildEmailBodies(fields, ip = '') {
  const rows = [
    ['Name', fields.name],
    ['Email', fields.email],
    ['Company', fields.company || '—'],
    ['Service', fields.service || '—'],
    ['Budget', fields.budget || '—'],
    ['Target start date', fields.timeline || '—'],
    ['Page', fields.page || '—'],
    ['Source', fields.source || '—'],
  ]
  if (ip) rows.push(['IP', ip])

  const text = [
    `New Form Submission — ${fields.name}`,
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    fields.message,
  ].join('\n')

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 16px 8px 0;color:#64748b;vertical-align:top;white-space:nowrap;font-size:13px;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;color:#0f172a;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('')

  const html = `
    <div style="font-family:Segoe UI,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#0f172a;background:#ffffff;">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#4f46e5;font-weight:700;">Mernify</p>
      <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;font-weight:650;">New Form Submission</h1>
      <table style="border-collapse:collapse;width:100%;margin:0 0 20px;">${htmlRows}</table>
      <p style="margin:0 0 8px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;">Message</p>
      <div style="white-space:pre-wrap;padding:16px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;line-height:1.55;">${escapeHtml(fields.message)}</div>
      <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;">Reply directly to this email to respond to ${escapeHtml(fields.email)}.</p>
    </div>
  `.trim()

  return { text, html }
}

/**
 * Primary path — deployed mail microservice (nginx → /api/email → /send).
 * Auth: header `x-email-secret` = EMAIL_SECRET.
 */
async function sendViaEmailMicroservice(fields, env, ip) {
  const endpoint = String(env.EMAIL_SERVICE_URL || DEFAULT_EMAIL_SERVICE_URL)
    .replace(/^\uFEFF/, '')
    .trim()
  const secret = String(env.EMAIL_SECRET || '').replace(/^\uFEFF/, '').trim()

  if (!secret) return null
  if (!endpoint) return null

  const { text, html } = buildEmailBodies(fields, ip)
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-email-secret': secret,
  }

  let res
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        to: recipient(env),
        subject: subjectFor(fields),
        name: fields.name,
        email: fields.email,
        company: fields.company || '',
        service: fields.service || '',
        budget: fields.budget || '',
        timeline: fields.timeline || '',
        page: fields.page || '',
        source: fields.source || 'mernify-website',
        message: text,
        html,
        text,
      }),
    })
  } catch (err) {
    console.error('[contactMail] Email microservice unreachable', err?.message)
    return {
      ok: false,
      status: 502,
      error: 'Email service unreachable. Please try again or email info@mernify.co.',
    }
  }

  if (res.status === 401 || res.status === 403) {
    console.error('[contactMail] Email microservice unauthorized — check EMAIL_SECRET')
    return {
      ok: false,
      status: 503,
      error: 'Email delivery is not configured. Check EMAIL_SECRET on the server.',
    }
  }

  if (!res.ok) {
    let detail = ''
    try {
      detail = await res.text()
    } catch {
      /* ignore */
    }
    console.error('[contactMail] Email microservice failed', res.status, detail.slice(0, 300))
    return {
      ok: false,
      status: 502,
      error: 'Email delivery failed. Please try again or email info@mernify.co.',
    }
  }

  return { ok: true, provider: 'email-microservice' }
}

async function sendViaResend(fields, env, ip) {
  const apiKey = String(env.RESEND_API_KEY || '').trim()
  if (!apiKey) return null

  const to = recipient(env)
  const from = String(env.CONTACT_FROM || '').trim() || 'Mernify <hello@mernify.co>'
  const { text, html } = buildEmailBodies(fields, ip)

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: fields.email,
      subject: subjectFor(fields),
      text,
      html,
    }),
  })

  if (!resendRes.ok) {
    let detail = ''
    try {
      detail = await resendRes.text()
    } catch {
      /* ignore */
    }
    console.error('[contactMail] Resend failed', resendRes.status, detail.slice(0, 400))
    return {
      ok: false,
      status: 502,
      error: 'Email delivery failed. Please try again or email info@mernify.co.',
    }
  }

  let id = ''
  try {
    const data = await resendRes.json()
    id = data?.id ? String(data.id) : ''
  } catch {
    /* ignore */
  }

  return { ok: true, provider: 'resend', id }
}

async function sendViaWeb3Forms(fields, env, ip) {
  const accessKey = String(env.WEB3FORMS_ACCESS_KEY || '').trim()
  if (!accessKey) return null

  const { text, html } = buildEmailBodies(fields, ip)

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: subjectFor(fields),
      from_name: fields.name,
      name: fields.name,
      email: fields.email,
      replyto: fields.email,
      company: fields.company || '—',
      service: fields.service || '—',
      budget: fields.budget || '—',
      timeline: fields.timeline || '—',
      page: fields.page || '—',
      source: fields.source || '—',
      message: text,
      html,
      content_type: 'text/html',
    }),
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    /* ignore */
  }

  if (!res.ok || data?.success === false) {
    console.error('[contactMail] Web3Forms failed', res.status, data)
    return {
      ok: false,
      status: 502,
      error: 'Email delivery failed. Please try again or email info@mernify.co.',
    }
  }

  return { ok: true, provider: 'web3forms' }
}

/**
 * @param {object} fields - from parseContactBody
 * @param {object} env
 * @param {string} [ip]
 */
export async function sendContactEmail(fields, env, ip = '') {
  const hasMicroserviceSecret = Boolean(String(env.EMAIL_SECRET || '').trim())
  const hasResend = Boolean(String(env.RESEND_API_KEY || '').trim())
  const hasWeb3 = Boolean(String(env.WEB3FORMS_ACCESS_KEY || '').trim())

  if (hasMicroserviceSecret) {
    const micro = await sendViaEmailMicroservice(fields, env, ip)
    if (micro) return micro
  }

  if (hasResend) {
    const resend = await sendViaResend(fields, env, ip)
    if (resend) return resend
  }

  if (hasWeb3) {
    const web3 = await sendViaWeb3Forms(fields, env, ip)
    if (web3) return web3
  }

  console.error('[contactMail] Missing provider secrets', {
    hasMicroserviceSecret,
    hasResend,
    hasWeb3,
    emailServiceUrl: String(env.EMAIL_SERVICE_URL || DEFAULT_EMAIL_SERVICE_URL),
  })

  return {
    ok: false,
    status: 503,
    error:
      'Email delivery is not configured. Set EMAIL_SECRET (mail service) on the server.',
  }
}
