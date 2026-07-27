import { useEffect } from 'react'
import { SITE } from '@/constants/site'

/**
 * Lightweight document meta updater for SPA routes.
 * For richer crawlability later, pair with prerender—keep this zero-dep for now.
 */
export function PageMeta({
  title,
  description = SITE.defaultDescription,
  canonicalPath = '',
  noIndex = false,
}) {
  const fullTitle = title
    ? title.includes('Mernify')
      ? title
      : `${title} — Mernify`
    : SITE.defaultTitle

  useEffect(() => {
    document.title = fullTitle

    const ensure = (selector, create) => {
      let el = document.head.querySelector(selector)
      if (!el) {
        el = create()
        document.head.appendChild(el)
      }
      return el
    }

    const desc = ensure('meta[name="description"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'description')
      return m
    })
    desc.setAttribute('content', description)

    const ogTitle = ensure('meta[property="og:title"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:title')
      return m
    })
    ogTitle.setAttribute('content', fullTitle)

    const ogDesc = ensure('meta[property="og:description"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:description')
      return m
    })
    ogDesc.setAttribute('content', description)

    const ogType = ensure('meta[property="og:type"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:type')
      return m
    })
    ogType.setAttribute('content', 'website')

    const canonical = ensure('link[rel="canonical"]', () => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'canonical')
      return l
    })
    const path = canonicalPath || window.location.pathname
    canonical.setAttribute('href', `${SITE.url}${path === '/' ? '/' : path}`)

    const robots = ensure('meta[name="robots"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'robots')
      return m
    })
    robots.setAttribute('content', noIndex ? 'noindex,nofollow' : 'index,follow')
  }, [fullTitle, description, canonicalPath, noIndex])

  return null
}
