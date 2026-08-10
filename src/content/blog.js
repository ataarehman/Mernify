/**
 * Blog catalog API — posts live in blogPostsData.js (structured long-form sections).
 * Listing/card consumers keep using the same field names (title, excerpt, image, …).
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

function normalizePost(post) {
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

/** @type {BlogPost[]} */
export const blogPosts = blogPostsData.map(normalizePost)

export function getBlogPosts() {
  return [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getFeaturedPosts(limit = 3) {
  const featured = getBlogPosts().filter((post) => post.featured)
  if (featured.length >= limit) return featured.slice(0, limit)
  return getBlogPosts().slice(0, limit)
}

export function getLatestPosts(limit = 3) {
  return getBlogPosts().slice(0, limit)
}

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null
}

export function filterBlogPosts({ category = 'All', query = '' } = {}) {
  const q = query.trim().toLowerCase()
  return getBlogPosts().filter((post) => {
    if (category !== 'All' && post.category !== category) return false
    if (!q) return true
    const haystack = [post.title, post.excerpt, post.category, ...post.tags, post.author.name]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}

export function getRelatedPosts(post, limit = 3) {
  if (!post) return []
  const others = getBlogPosts().filter((item) => item.slug !== post.slug)

  const scored = others.map((item) => {
    let score = 0
    if (item.category === post.category) score += 5
    const sharedTags = item.tags.filter((tag) => post.tags.includes(tag)).length
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

export function getAdjacentPosts(slug) {
  const posts = getBlogPosts()
  const index = posts.findIndex((post) => post.slug === slug)
  if (index < 0) return { previous: null, next: null }
  return {
    previous: posts[index + 1] || null,
    next: posts[index - 1] || null,
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
