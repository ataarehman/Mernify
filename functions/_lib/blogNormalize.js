/**
 * Blog post normalization — mirrors src/content/blog.js (plain JS for Pages + Vite).
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

/**
 * @param {Record<string, unknown>} post
 * @returns {Record<string, unknown>}
 */
export function normalizePost(post) {
  const wordCount = getPostWordCount(post)
  const readingMinutes = post.readingMinutes || estimateReadingMinutes(post)
  const body =
    Array.isArray(post.body) && post.body.length > 0
      ? post.body
      : (post.sections || []).filter((s) => s.type === 'p' && s.text).map((s) => s.text)

  const imageSrcSet =
    post.imageSrcSet ||
    (typeof post.image === 'string' &&
    post.image.includes('/blog/') &&
    post.image.endsWith('-hero.webp')
      ? `${post.image.replace('-hero.webp', '-hero-md.webp')} 1000w, ${post.image} 2400w`
      : undefined)

  return {
    ...post,
    updatedAt: post.updatedAt || post.publishedAt || null,
    readingMinutes,
    wordCount,
    body,
    faq: post.faq || [],
    sections: post.sections || [],
    tags: post.tags || [],
    featured: Boolean(post.featured),
    imageSrcSet,
  }
}

function parseJson(value, fallback) {
  if (value == null || value === '') return fallback
  if (typeof value !== 'string') return value
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

/**
 * Map a D1 / local-store row to a BlogPost-shaped object.
 * @param {Record<string, unknown>} row
 * @param {{ includeStatus?: boolean, includeId?: boolean }} [opts]
 */
export function rowToPost(row, opts = {}) {
  const includeStatus = opts.includeStatus !== false
  const includeId = opts.includeId !== false

  const post = {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: {
      name: row.author_name || row.authorName || '',
      role: row.author_role || row.authorRole || '',
    },
    publishedAt: row.published_at || row.publishedAt || null,
    updatedAt: row.updated_at || row.updatedAt || null,
    readingMinutes: row.reading_minutes ?? row.readingMinutes ?? null,
    featured: Boolean(row.featured),
    image: row.image || '',
    imageAlt: row.image_alt || row.imageAlt || '',
    imageSrcSet: row.image_src_set || row.imageSrcSet || undefined,
    tags: parseJson(row.tags_json ?? row.tags, []),
    sections: parseJson(row.sections_json ?? row.sections, []),
    faq: parseJson(row.faq_json ?? row.faq, []),
    seoTitle: row.seo_title || row.seoTitle || undefined,
    seoDescription: row.seo_description || row.seoDescription || undefined,
    seoOgImage: row.seo_og_image || row.seoOgImage || undefined,
  }

  if (includeId && row.id) post.id = row.id
  if (includeStatus && row.status) post.status = row.status

  return normalizePost(post)
}

/**
 * Flatten a BlogPost payload into DB column fields.
 * @param {Record<string, unknown>} post
 * @param {{ status?: string, publishedBy?: string|null, nowTs?: number }} [meta]
 */
export function postToRowFields(post, meta = {}) {
  const nowTs = meta.nowTs ?? Date.now()
  const author = post.author || {}
  const readingMinutes =
    post.readingMinutes != null
      ? Number(post.readingMinutes)
      : estimateReadingMinutes({
          sections: post.sections || [],
          body: post.body || [],
        })

  return {
    slug: String(post.slug || '').trim(),
    title: String(post.title || '').trim(),
    excerpt: String(post.excerpt || '').trim(),
    category: String(post.category || '').trim(),
    author_name: String(author.name || '').trim(),
    author_role: String(author.role || '').trim(),
    published_at: post.publishedAt || null,
    updated_at: post.updatedAt || post.publishedAt || null,
    reading_minutes: readingMinutes,
    featured: post.featured ? 1 : 0,
    image: post.image != null ? String(post.image) : '',
    image_alt: post.imageAlt != null ? String(post.imageAlt) : '',
    image_src_set: post.imageSrcSet || null,
    tags_json: JSON.stringify(Array.isArray(post.tags) ? post.tags : []),
    sections_json: JSON.stringify(Array.isArray(post.sections) ? post.sections : []),
    faq_json: JSON.stringify(Array.isArray(post.faq) ? post.faq : []),
    status: meta.status || post.status || 'draft',
    seo_title: post.seoTitle || null,
    seo_description: post.seoDescription || null,
    seo_og_image: post.seoOgImage || null,
    updated_at_ts: nowTs,
    published_by: meta.publishedBy !== undefined ? meta.publishedBy : null,
  }
}
