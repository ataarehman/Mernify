const STORAGE_KEY = 'mf-consent-v1'

export function readConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function writeConsent(value) {
  const payload = {
    necessary: true,
    analytics: Boolean(value.analytics),
    marketing: Boolean(value.marketing),
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  window.dispatchEvent(new CustomEvent('mf:consent', { detail: payload }))
  return payload
}

export function hasAnalyticsConsent() {
  return Boolean(readConsent()?.analytics)
}
