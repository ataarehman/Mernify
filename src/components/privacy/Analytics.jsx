import { useEffect } from 'react'
import { hasAnalyticsConsent, readConsent } from '@/lib/consent'
import { resolveGaId } from '@/lib/env'

const GA_ID = resolveGaId()

function loadGa(measurementId) {
  if (!measurementId || window.gtag) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { anonymize_ip: true })
}

/**
 * Loads GA4 only after analytics consent. No-ops without a valid VITE_GA_MEASUREMENT_ID.
 */
export function Analytics() {
  useEffect(() => {
    if (!GA_ID) return undefined

    const maybeLoad = () => {
      if (hasAnalyticsConsent()) loadGa(GA_ID)
    }

    maybeLoad()
    const onConsent = () => maybeLoad()
    window.addEventListener('mf:consent', onConsent)
    return () => window.removeEventListener('mf:consent', onConsent)
  }, [])

  useEffect(() => {
    readConsent()
  }, [])

  return null
}
