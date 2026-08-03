import { useEffect } from 'react'
import { SITE } from '@/constants/site'

function ensureMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
    document.head.appendChild(el)
  }
  return el
}

function ensureLink(rel) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  return el
}

/**
 * Lightweight document meta updater for SPA routes.
 * Sets title, description, canonical, Open Graph, and Twitter cards.
 */
export function PageMeta({
  title,
  description = SITE.defaultDescription,
  canonicalPath = '',
  noIndex = false,
  image = SITE.ogImage,
  type = 'website',
}) {
  const fullTitle = title
    ? title.includes('Mernify')
      ? title
      : `${title} — Mernify`
    : SITE.defaultTitle

  useEffect(() => {
    document.title = fullTitle

    const path = canonicalPath || window.location.pathname
    const canonicalHref = `${SITE.url}${path === '/' ? '/' : path}`
    const absoluteImage = image
      ? image.startsWith('http')
        ? image
        : `${SITE.url}${image.startsWith('/') ? image : `/${image}`}`
      : `${SITE.url}${SITE.ogImage}`

    const desc = ensureMeta('meta[name="description"]', { name: 'description' })
    desc.setAttribute('content', description)

    const ogTitle = ensureMeta('meta[property="og:title"]', { property: 'og:title' })
    ogTitle.setAttribute('content', fullTitle)

    const ogDesc = ensureMeta('meta[property="og:description"]', { property: 'og:description' })
    ogDesc.setAttribute('content', description)

    const ogType = ensureMeta('meta[property="og:type"]', { property: 'og:type' })
    ogType.setAttribute('content', type)

    const ogUrl = ensureMeta('meta[property="og:url"]', { property: 'og:url' })
    ogUrl.setAttribute('content', canonicalHref)

    const ogSite = ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name' })
    ogSite.setAttribute('content', SITE.name)

    const ogImage = ensureMeta('meta[property="og:image"]', { property: 'og:image' })
    ogImage.setAttribute('content', absoluteImage)

    const ogImageW = ensureMeta('meta[property="og:image:width"]', { property: 'og:image:width' })
    ogImageW.setAttribute('content', '1200')

    const ogImageH = ensureMeta('meta[property="og:image:height"]', { property: 'og:image:height' })
    ogImageH.setAttribute('content', '630')

    const twitterCard = ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card' })
    twitterCard.setAttribute('content', 'summary_large_image')

    const twitterTitle = ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' })
    twitterTitle.setAttribute('content', fullTitle)

    const twitterDesc = ensureMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
    })
    twitterDesc.setAttribute('content', description)

    const twitterImage = ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image' })
    twitterImage.setAttribute('content', absoluteImage)

    const canonical = ensureLink('canonical')
    canonical.setAttribute('href', canonicalHref)

    const robots = ensureMeta('meta[name="robots"]', { name: 'robots' })
    robots.setAttribute('content', noIndex ? 'noindex,nofollow' : 'index,follow')
  }, [fullTitle, description, canonicalPath, noIndex, image, type])

  return null
}
