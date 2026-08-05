/**
 * Safe readers for public (VITE_*) runtime config.
 * These values are embedded in the client bundle — never store private API secrets here.
 */

function trimEnv(value) {
  return String(value ?? '').trim()
}

/** Booking link used when VITE_CALENDLY_URL is not configured by the host. */
const DEFAULT_CALENDLY_URL = 'https://calendly.com/contact-mernify/30min'

/** Accept https Calendly (or calendly-style) booking URLs only. */
export function resolveCalendlyUrl(raw = import.meta.env.VITE_CALENDLY_URL) {
  const value = trimEnv(raw) || DEFAULT_CALENDLY_URL
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return ''
    const host = url.hostname.toLowerCase()
    if (host === 'calendly.com' || host.endsWith('.calendly.com')) return url.toString()
    // Allow other https booking tools if explicitly configured
    return url.toString()
  } catch {
    return ''
  }
}

/** GA4 measurement IDs look like G-XXXXXXXXXX */
export function resolveGaId(raw = import.meta.env.VITE_GA_MEASUREMENT_ID) {
  const value = trimEnv(raw)
  if (!value) return ''
  if (!/^G-[A-Z0-9]+$/i.test(value)) return ''
  return value
}

export function resolveContactEndpoint(raw = import.meta.env.VITE_CONTACT_ENDPOINT) {
  const value = trimEnv(raw)
  if (!value) return '/api/contact'
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '/api/contact'
    return url.toString()
  } catch {
    return '/api/contact'
  }
}

/** Case-study live-preview proxy.
 * Prefer same-origin `/site-preview` (Vite middleware + Cloudflare Pages Function).
 * Optional absolute Worker URL via VITE_PROXY_URL for hosts without Pages Functions.
 */
export function resolveProxyUrl(raw = import.meta.env.VITE_PROXY_URL) {
  const value = trimEnv(raw)
  if (!value) return '/site-preview'
  // Relative path allowed for custom same-origin mounts
  if (value.startsWith('/')) return value.replace(/\/$/, '') || '/site-preview'
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '/site-preview'
    return url.toString().replace(/\/$/, '')
  } catch {
    return '/site-preview'
  }
}
