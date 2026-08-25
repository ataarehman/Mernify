/**
 * Blog catalog API — posts live in blogPostsData.js (structured long-form sections).
 * Listing/card consumers keep using the same field names (title, excerpt, image, …).
 * Async loaders prefer `/api/blog` when VITE_BLOG_API !== '0', with static fallback.
 */

import { blogPostsData } from '@/content/blogPostsData'

export const blogCategories = [
  'All',
  'AI',
  'Web Development',
  'Cloud',
  'DevOps',
  'UI/UX',
  'Business',
  'Product Engineering',
  'SaaS',
  'MERN',
]

/** @typedef {{ name: string, role: string }} BlogAuthor */
/**
 * @typedef {{
 *   type: 'p' | 'h2' | 'h3' | 'ul' | 'ol' | 'callout' | 'figure',
 *   text?: string,
 *   id?: string,
 *   items?: string[],
 *   src?: string,
 *   alt?: string,
 *   caption?: string,
 * }} BlogSection
 */
/**
 * @typedef {{
 *   slug: string,
 *   title: string,
 *   excerpt: string,
 *   category: string,
 *   author: BlogAuthor,
 *   publishedAt: string,
 *   updatedAt?: string,
 *   readingMinutes: number,
 *   featured: boolean,
 *   image: string,
 *   imageAlt: string,
 *   tags: string[],
 *   sections: BlogSection[],
 *   faq?: { question: string, answer: string }[],
 *   body?: string[],
 *   wordCount?: number,
 *   seoTitle?: string,
 *   seoDescription?: string,
 *   seoOgImage?: string,
 *   id?: string,
 *   status?: string,
 * }} BlogPost
 */

function sectionPlainText(section) {
  if (!section) return ''
  if (section.text) return section.text
  if (section.items?.length) return section.items.join(' ')
  if (section.caption) return section.caption
  return ''
}

export function getPostPlainText(post) {
  if (!post) return ''
  const fromSections = (post.sections || []).map(sectionPlainText).filter(Boolean)
  if (fromSections.length) return fromSections.join(' ')
  return (post.body || []).join(' ')
}

export function estimateReadingMinutes(post, wpm = 220) {
  const words = getPostPlainText(post).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / wpm))
}

export function getPostWordCount(post) {
  return getPostPlainText(post).trim().split(/\s+/).filter(Boolean).length
}

export function getPostToc(post) {
  return (post?.sections || [])
    .filter((section) => section.type === 'h2' && section.id && section.text)
    .map((section) => ({ id: section.id, label: section.text }))
}

export function normalizePost(post) {
  const wordCount = getPostWordCount(post)
  const readingMinutes = post.readingMinutes || estimateReadingMinutes(post)
  const body =
    post.body?.length > 0
      ? post.body
      : (post.sections || []).filter((s) => s.type === 'p' && s.text).map((s) => s.text)

  const imageSrcSet =
    post.imageSrcSet ||
    (post.image?.includes('/blog/') && post.image.endsWith('-hero.webp')
      ? `${post.image.replace('-hero.webp', '-hero-md.webp')} 1000w, ${post.image} 2400w`
      : undefined)

  return {
    ...post,
    updatedAt: post.updatedAt || post.publishedAt,
    readingMinutes,
    wordCount,
    body,
    faq: post.faq || [],
    sections: post.sections || [],
    imageSrcSet,
  }
}

function sortByPublishedDesc(posts) {
  return [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

function isBlogApiEnabled() {
  return import.meta.env.VITE_BLOG_API !== '0'
}

/** @type {BlogPost[]} */
export const blogPosts = blogPostsData.map(normalizePost)

export function getBlogPosts() {
  return sortByPublishedDesc(blogPosts)
}

export function getFeaturedPosts(limit = 3, posts) {
  const source = posts ? sortByPublishedDesc(posts) : getBlogPosts()
  const featured = source.filter((post) => post.featured)
  if (featured.length >= limit) return featured.slice(0, limit)
  return source.slice(0, limit)
}

export function getLatestPosts(limit = 3, posts) {
  const source = posts ? sortByPublishedDesc(posts) : getBlogPosts()
  return source.slice(0, limit)
}

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null
}

export function filterBlogPosts({ category = 'All', query = '', posts } = {}) {
  const q = query.trim().toLowerCase()
  const source = posts ? sortByPublishedDesc(posts) : getBlogPosts()
  return source.filter((post) => {
    if (category !== 'All' && post.category !== category) return false
    if (!q) return true
    const haystack = [post.title, post.excerpt, post.category, ...(post.tags || []), post.author?.name]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}

export function getRelatedPosts(post, limit = 3, posts) {
  if (!post) return []
  const source = posts ? sortByPublishedDesc(posts) : getBlogPosts()
  const others = source.filter((item) => item.slug !== post.slug)

  const scored = others.map((item) => {
    let score = 0
    if (item.category === post.category) score += 5
    const sharedTags = (item.tags || []).filter((tag) => (post.tags || []).includes(tag)).length
    score += sharedTags * 2
    return { item, score }
  })

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.item.publishedAt < b.item.publishedAt ? 1 : -1
  })

  const related = scored.filter((entry) => entry.score > 0).map((entry) => entry.item)
  if (related.length >= limit) return related.slice(0, limit)
  const fill = others.filter((item) => !related.some((r) => r.slug === item.slug))
  return [...related, ...fill].slice(0, limit)
}

export function getAdjacentPosts(slug, posts) {
  const list = posts ? sortByPublishedDesc(posts) : getBlogPosts()
  const index = list.findIndex((post) => post.slug === slug)
  if (index < 0) return { previous: null, next: null }
  return {
    previous: list[index + 1] || null,
    next: list[index - 1] || null,
  }
}

export function formatBlogDate(iso) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(`${iso}T12:00:00`))
  } catch {
    return iso
  }
}

/**
 * Prefer API posts; on empty/failure fall back to static catalog (zero visual change).
 * @param {{ category?: string, q?: string }} [opts]
 * @returns {Promise<BlogPost[]>}
 */
export async function loadBlogPosts(opts = {}) {
  const fallback = () => {
    if (opts.category || opts.q) {
      return filterBlogPosts({ category: opts.category || 'All', query: opts.q || '' })
    }
    return getBlogPosts()
  }

  if (!isBlogApiEnabled()) return fallback()

  try {
    const { fetchPublishedPosts } = await import('@/lib/blogApi')
    const apiPosts = await fetchPublishedPosts({
      category: opts.category,
      q: opts.q,
    })
    if (!apiPosts?.length) return fallback()
    return sortByPublishedDesc(apiPosts.map(normalizePost))
  } catch {
    return fallback()
  }
}

/**
 * Prefer API by slug; merge/fallback to static.
 * @param {string} slug
 * @returns {Promise<BlogPost|null>}
 */
export async function loadBlogPostBySlug(slug) {
  if (!slug) return null
  const staticPost = getBlogPostBySlug(slug)

  if (!isBlogApiEnabled()) return staticPost

  try {
    const { fetchPostBySlug } = await import('@/lib/blogApi')
    const apiPost = await fetchPostBySlug(slug)
    if (apiPost) return normalizePost(apiPost)
  } catch {
    /* static fallback */
  }
  return staticPost
}

/**
 * Preview draft/unpublished via token. No static fallback.
 * @param {string} slug
 * @param {string} token
 * @returns {Promise<BlogPost|null>}
 */
export async function loadBlogPostPreview(slug, token) {
  if (!slug || !token) return null
  try {
    const { fetchPostPreview } = await import('@/lib/blogApi')
    const apiPost = await fetchPostPreview(slug, token)
    if (apiPost) return normalizePost(apiPost)
  } catch {
    return null
  }
  return null
}
