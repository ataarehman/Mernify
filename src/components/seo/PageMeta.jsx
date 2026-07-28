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
  image = '',
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

    const path = canonicalPath || window.location.pathname
    const canonicalHref = `${SITE.url}${path === '/' ? '/' : path}`
    const absoluteImage = image
      ? image.startsWith('http')
        ? image
        : `${SITE.url}${image.startsWith('/') ? image : `/${image}`}`
      : ''

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

    const ogUrl = ensure('meta[property="og:url"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:url')
      return m
    })
    ogUrl.setAttribute('content', canonicalHref)

    if (absoluteImage) {
      const ogImage = ensure('meta[property="og:image"]', () => {
        const m = document.createElement('meta')
        m.setAttribute('property', 'og:image')
        return m
      })
      ogImage.setAttribute('content', absoluteImage)

      const twitterCard = ensure('meta[name="twitter:card"]', () => {
        const m = document.createElement('meta')
        m.setAttribute('name', 'twitter:card')
        return m
      })
      twitterCard.setAttribute('content', 'summary_large_image')

      const twitterImage = ensure('meta[name="twitter:image"]', () => {
        const m = document.createElement('meta')
        m.setAttribute('name', 'twitter:image')
        return m
      })
      twitterImage.setAttribute('content', absoluteImage)
    }

    const twitterTitle = ensure('meta[name="twitter:title"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'twitter:title')
      return m
    })
    twitterTitle.setAttribute('content', fullTitle)

    const twitterDesc = ensure('meta[name="twitter:description"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'twitter:description')
      return m
    })
    twitterDesc.setAttribute('content', description)

    const canonical = ensure('link[rel="canonical"]', () => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'canonical')
      return l
    })
    canonical.setAttribute('href', canonicalHref)

    const robots = ensure('meta[name="robots"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'robots')
      return m
    })
    robots.setAttribute('content', noIndex ? 'noindex,nofollow' : 'index,follow')
  }, [fullTitle, description, canonicalPath, noIndex, image])

  return null
}
