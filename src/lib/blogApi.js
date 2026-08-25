/**
 * Public blog API client — same-origin Pages Functions.
 * Responses are expected as BlogPost-shaped objects (already normalized by the API).
 */

const API_BASE = '/api/blog'

/**
 * @param {string} path
 * @param {RequestInit} [init]
 */
async function request(path, init) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.headers || {}),
    },
  })

  if (!res.ok) {
    const err = new Error(`Blog API ${res.status}`)
    err.status = res.status
    try {
      err.body = await res.json()
    } catch {
      err.body = null
    }
    throw err
  }

  if (res.status === 204) return null
  return res.json()
}

function asPosts(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.posts)) return data.posts
  return []
}

function asPost(data) {
  if (!data) return null
  if (data.post) return data.post
  if (data.slug) return data
  return null
}

function asCategories(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.categories)) return data.categories
  return []
}

/**
 * @param {{ category?: string, q?: string, limit?: number, cursor?: string }} [opts]
 * @returns {Promise<object[]>}
 */
export async function fetchPublishedPosts({ category, q, limit, cursor } = {}) {
  const params = new URLSearchParams()
  if (category && category !== 'All') params.set('category', category)
  if (q) params.set('q', q)
  if (limit != null) params.set('limit', String(limit))
  if (cursor) params.set('cursor', cursor)
  const qs = params.toString()
  const data = await request(`/posts${qs ? `?${qs}` : ''}`)
  return asPosts(data)
}

/**
 * @param {string} slug
 * @returns {Promise<object|null>}
 */
export async function fetchPostBySlug(slug) {
  if (!slug) return null
  const data = await request(`/posts/${encodeURIComponent(slug)}`)
  return asPost(data)
}

/**
 * Draft/preview via opaque token.
 * @param {string} slug
 * @param {string} token
 * @returns {Promise<object|null>}
 */
export async function fetchPostPreview(slug, token) {
  if (!slug || !token) return null
  const params = new URLSearchParams({ token: String(token) })
  const data = await request(`/posts/${encodeURIComponent(slug)}?${params}`)
  return asPost(data)
}

/**
 * @returns {Promise<object[]>}
 */
export async function fetchCategories() {
  const data = await request('/categories')
  return asCategories(data)
}
