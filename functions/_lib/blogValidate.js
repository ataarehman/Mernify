/**
 * Validate blog post / category payloads and status transitions.
 */

export const SECTION_TYPES = new Set(['p', 'h2', 'h3', 'ul', 'ol', 'callout', 'figure'])
export const POST_STATUSES = new Set(['draft', 'published', 'archived'])

/** Allowed transitions: from → Set(to) */
export const STATUS_TRANSITIONS = {
  draft: new Set(['published', 'archived', 'draft']),
  published: new Set(['draft', 'archived', 'published']),
  archived: new Set(['draft', 'archived']),
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const MAX_SECTIONS_JSON = 500_000
const MAX_IMAGES_PER_POST = 20

export function isValidSlug(slug) {
  return typeof slug === 'string' && slug.length >= 1 && slug.length <= 160 && SLUG_RE.test(slug)
}

export function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 160)
}

/**
 * @param {unknown} section
 * @param {number} index
 * @returns {{ error?: string }}
 */
export function validateSection(section, index = 0) {
  if (!section || typeof section !== 'object') {
    return { error: `sections[${index}] must be an object` }
  }
  const type = section.type
  if (!SECTION_TYPES.has(type)) {
    return {
      error: `sections[${index}].type must be one of: ${[...SECTION_TYPES].join(', ')}`,
    }
  }

  if (type === 'p' || type === 'callout') {
    if (typeof section.text !== 'string' || !section.text.trim()) {
      return { error: `sections[${index}].text is required for type ${type}` }
    }
  }

  if (type === 'h2' || type === 'h3') {
    if (typeof section.text !== 'string' || !section.text.trim()) {
      return { error: `sections[${index}].text is required for type ${type}` }
    }
    if (section.id != null && (typeof section.id !== 'string' || !isValidSlug(section.id))) {
      return { error: `sections[${index}].id must be a kebab-case slug` }
    }
  }

  if (type === 'ul' || type === 'ol') {
    if (!Array.isArray(section.items) || section.items.length === 0) {
      return { error: `sections[${index}].items must be a non-empty string array` }
    }
    if (!section.items.every((item) => typeof item === 'string')) {
      return { error: `sections[${index}].items must be strings` }
    }
  }

  if (type === 'figure') {
    if (typeof section.src !== 'string' || !section.src.trim()) {
      return { error: `sections[${index}].src is required for figure` }
    }
    if (section.alt != null && typeof section.alt !== 'string') {
      return { error: `sections[${index}].alt must be a string` }
    }
    if (section.caption != null && typeof section.caption !== 'string') {
      return { error: `sections[${index}].caption must be a string` }
    }
  }

  return {}
}

/**
 * @param {Record<string, unknown>} payload
 * @param {{ partial?: boolean, requireStatus?: boolean }} [opts]
 * @returns {{ error?: string, status?: number, value?: Record<string, unknown> }}
 */
export function validatePostPayload(payload, opts = {}) {
  const partial = Boolean(opts.partial)
  if (!payload || typeof payload !== 'object') {
    return { error: 'Invalid JSON body', status: 400 }
  }

  const value = { ...payload }

  if (!partial || value.slug !== undefined) {
    if (!isValidSlug(value.slug)) {
      return { error: 'slug must be lowercase kebab-case (a-z, 0-9, hyphens)', status: 400 }
    }
  }

  if (!partial || value.title !== undefined) {
    if (typeof value.title !== 'string' || !value.title.trim()) {
      return { error: 'title is required', status: 400 }
    }
    value.title = value.title.trim()
  }

  if (!partial || value.excerpt !== undefined) {
    if (typeof value.excerpt !== 'string' || !value.excerpt.trim()) {
      return { error: 'excerpt is required', status: 400 }
    }
    value.excerpt = value.excerpt.trim()
  }

  if (!partial || value.category !== undefined) {
    if (typeof value.category !== 'string' || !value.category.trim()) {
      return { error: 'category is required', status: 400 }
    }
    value.category = value.category.trim()
  }

  if (!partial || value.author !== undefined) {
    const author = value.author
    if (!author || typeof author !== 'object') {
      return { error: 'author { name, role } is required', status: 400 }
    }
    if (typeof author.name !== 'string' || !author.name.trim()) {
      return { error: 'author.name is required', status: 400 }
    }
    if (typeof author.role !== 'string' || !author.role.trim()) {
      return { error: 'author.role is required', status: 400 }
    }
    value.author = { name: author.name.trim(), role: author.role.trim() }
  }

  if (value.sections !== undefined) {
    if (!Array.isArray(value.sections)) {
      return { error: 'sections must be an array', status: 400 }
    }
    const encoded = JSON.stringify(value.sections)
    if (encoded.length > MAX_SECTIONS_JSON) {
      return { error: 'sections payload too large', status: 400 }
    }
    let figureCount = 0
    for (let i = 0; i < value.sections.length; i += 1) {
      const check = validateSection(value.sections[i], i)
      if (check.error) return { error: check.error, status: 400 }
      if (value.sections[i].type === 'figure') figureCount += 1
    }
    if (figureCount > MAX_IMAGES_PER_POST) {
      return { error: `at most ${MAX_IMAGES_PER_POST} figure sections allowed`, status: 400 }
    }
  } else if (!partial) {
    value.sections = []
  }

  if (value.tags !== undefined) {
    if (!Array.isArray(value.tags) || !value.tags.every((t) => typeof t === 'string')) {
      return { error: 'tags must be a string array', status: 400 }
    }
  } else if (!partial) {
    value.tags = []
  }

  if (value.faq !== undefined) {
    if (!Array.isArray(value.faq)) {
      return { error: 'faq must be an array', status: 400 }
    }
    for (let i = 0; i < value.faq.length; i += 1) {
      const item = value.faq[i]
      if (!item || typeof item.question !== 'string' || typeof item.answer !== 'string') {
        return { error: `faq[${i}] must have question and answer strings`, status: 400 }
      }
    }
  } else if (!partial) {
    value.faq = []
  }

  if (value.status !== undefined) {
    if (!POST_STATUSES.has(value.status)) {
      return { error: 'status must be draft|published|archived', status: 400 }
    }
  } else if (!partial && opts.requireStatus !== false) {
    value.status = 'draft'
  }

  if (value.featured !== undefined) {
    value.featured = Boolean(value.featured)
  }

  if (value.publishedAt !== undefined && value.publishedAt !== null) {
    if (typeof value.publishedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}/.test(value.publishedAt)) {
      return { error: 'publishedAt must be YYYY-MM-DD', status: 400 }
    }
  }

  if (value.updatedAt !== undefined && value.updatedAt !== null) {
    if (typeof value.updatedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}/.test(value.updatedAt)) {
      return { error: 'updatedAt must be YYYY-MM-DD', status: 400 }
    }
  }

  return { value }
}

/**
 * @param {string} from
 * @param {string} to
 */
export function canTransitionStatus(from, to) {
  if (!POST_STATUSES.has(from) || !POST_STATUSES.has(to)) return false
  return STATUS_TRANSITIONS[from]?.has(to) === true
}

/**
 * @param {Record<string, unknown>} payload
 * @param {{ partial?: boolean }} [opts]
 */
export function validateCategoryPayload(payload, opts = {}) {
  const partial = Boolean(opts.partial)
  if (!payload || typeof payload !== 'object') {
    return { error: 'Invalid JSON body', status: 400 }
  }
  const value = { ...payload }

  if (!partial || value.name !== undefined) {
    if (typeof value.name !== 'string' || !value.name.trim()) {
      return { error: 'name is required', status: 400 }
    }
    value.name = value.name.trim()
  }

  if (value.slug !== undefined) {
    if (!isValidSlug(value.slug)) {
      return { error: 'slug must be lowercase kebab-case', status: 400 }
    }
  } else if (!partial && value.name) {
    value.slug = slugify(value.name)
  }

  if (value.sortOrder !== undefined) {
    const n = Number(value.sortOrder)
    if (!Number.isFinite(n)) return { error: 'sortOrder must be a number', status: 400 }
    value.sortOrder = Math.trunc(n)
  }

  return { value }
}
