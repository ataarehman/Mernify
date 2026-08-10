/**
 * Contact form submission — shared by Home inquiry + Contact page forms.
 *
 * Browser always posts same-origin `/api/contact`.
 * Server path: /api/contact → EMAIL_SERVICE_URL (mail microservice) → info@mernify.co
 *
 * Success only after the API accepts delivery. No mailto-as-success.
 * Never put EMAIL_SECRET / RESEND_API_KEY in VITE_* variables.
 */

import { MESSAGE_MAX } from '@/lib/contactValidation'

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

function toSafePayload(payload) {
  return {
    name: sanitizeField(payload.name, 120),
    email: sanitizeField(payload.email, 160),
    company: sanitizeField(payload.company, 160),
    service: sanitizeField(payload.service, 120),
    budget: sanitizeField(payload.budget, 80),
    timeline: sanitizeField(payload.timeline, 120),
    message: sanitizeField(payload.message, MESSAGE_MAX),
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
      const err = new Error(message)
      err.status = response.status
      throw err
    }
    return response
  } finally {
    clearTimeout(timeout)
  }
}

export async function submitContactForm(payload) {
  const safe = toSafePayload(payload)
  const body = {
    ...safe,
    source: 'mernify-website',
    page: typeof window !== 'undefined' ? window.location.pathname : '',
  }

  await postJson('/api/contact', body)
  return { mode: 'api-contact' }
}

/** Same-origin /api/contact is always the delivery path. */
export function hasContactEndpoint() {
  return true
}
