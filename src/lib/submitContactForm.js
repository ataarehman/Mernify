/**
 * Contact form submission.
 *
 * Priority:
 * 1. VITE_CONTACT_ENDPOINT — Cloudflare Worker / custom API (JSON POST)
 * 2. VITE_WEB3FORMS_ACCESS_KEY — https://web3forms.com
 * 3. mailto fallback — development / misconfigured production only
 *
 * Note: All VITE_* values are public in the client bundle.
 * Never put RESEND_API_KEY or other private secrets in VITE_* variables.
 */

const EMAIL = 'hello@mernify.com'

function sanitizeField(value, max = 500) {
  return String(value ?? '')
    .split('')
    .filter((ch) => {
      const code = ch.charCodeAt(0)
      return code >= 32 || code === 9 || code === 10 || code === 13
    })
    .join('')
    .trim()
    .slice(0, max)
}

function buildMailto(payload) {
  const subject = encodeURIComponent(`Mernify inquiry — ${payload.company || payload.name}`)
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company || '—'}`,
      `Service interest: ${payload.service || '—'}`,
      `Budget: ${payload.budget || '—'}`,
      `Timeline: ${payload.timeline || '—'}`,
      '',
      payload.message,
    ].join('\n'),
  )
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`
}

function toSafePayload(payload) {
  return {
    name: sanitizeField(payload.name, 120),
    email: sanitizeField(payload.email, 160),
    company: sanitizeField(payload.company, 160),
    service: sanitizeField(payload.service, 120),
    budget: sanitizeField(payload.budget, 80),
    timeline: sanitizeField(payload.timeline, 120),
    message: sanitizeField(payload.message, 5000),
    consent: Boolean(payload.consent),
  }
}

async function postJson(url, body) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    if (!response.ok) {
      let message = `Request failed (${response.status})`
      try {
        const data = await response.json()
        if (data?.error) message = String(data.error).slice(0, 180)
        else if (data?.message) message = String(data.message).slice(0, 180)
      } catch {
        /* ignore */
      }
      throw new Error(message)
    }
    return response
  } finally {
    clearTimeout(timeout)
  }
}

export async function submitContactForm(payload) {
  const safe = toSafePayload(payload)
  const endpoint = String(import.meta.env.VITE_CONTACT_ENDPOINT || '').trim()
  const web3Key = String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim()

  if (endpoint) {
    await postJson(endpoint, {
      ...safe,
      source: 'mernify-website',
      page: typeof window !== 'undefined' ? window.location.pathname : '',
    })
    return { mode: 'endpoint' }
  }

  if (web3Key) {
    await postJson('https://api.web3forms.com/submit', {
      access_key: web3Key,
      subject: `Mernify inquiry — ${safe.company || safe.name}`,
      from_name: safe.name,
      email: safe.email,
      name: safe.name,
      company: safe.company,
      service: safe.service,
      budget: safe.budget,
      timeline: safe.timeline,
      message: safe.message,
      consent: safe.consent,
      replyto: safe.email,
    })
    return { mode: 'web3forms' }
  }

  window.location.href = buildMailto(safe)
  return { mode: 'mailto' }
}

/** True when a real delivery path is configured (not mailto-only). */
export function hasContactEndpoint() {
  return Boolean(
    String(import.meta.env.VITE_CONTACT_ENDPOINT || '').trim() ||
      String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim(),
  )
}
