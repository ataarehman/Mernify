/**
 * Admin blog API client.
 * Auth: HttpOnly session cookie (`mernify_admin_session`) via credentials: 'include'.
 * Production may also accept Cloudflare Access JWT (handled server-side).
 */

const API_BASE = '/api/admin/blog'
const AUTH_BASE = '/api/admin/auth'

let onUnauthorized = null

/** Register a handler invoked when any admin API returns 401. */
export function setUnauthorizedHandler(fn) {
  onUnauthorized = typeof fn === 'function' ? fn : null
}

function adminHeaders({ json = true, formData = false } = {}) {
  const headers = {}
  if (json && !formData) headers['Content-Type'] = 'application/json'
  headers.Accept = 'application/json'
  return headers
}

async function parseBody(res) {
  if (res.status === 204) return null
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

async function request(url, init = {}, { notifyUnauthorized = false } = {}) {
  const isForm = typeof FormData !== 'undefined' && init.body instanceof FormData
  const res = await fetch(url, {
    ...init,
    credentials: 'include',
    headers: {
      ...adminHeaders({ formData: isForm }),
      ...(init.headers || {}),
    },
  })

  if (!res.ok) {
    const err = new Error(`Admin API ${res.status}`)
    err.status = res.status
    try {
      err.body = await res.json()
    } catch {
      err.body = null
    }
    if (notifyUnauthorized && res.status === 401) {
      onUnauthorized?.(err)
    }
    throw err
  }

  return parseBody(res)
}

async function blogRequest(path, init = {}) {
  return request(`${API_BASE}${path}`, init, { notifyUnauthorized: true })
}

function asList(data, key) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.[key])) return data[key]
  return []
}

/* ── Auth ─────────────────────────────────────────────── */

export async function login(username, password) {
  const data = await request(`${AUTH_BASE}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  return data
}

export async function logout() {
  return request(`${AUTH_BASE}/logout`, { method: 'POST' })
}

export async function getMe() {
  return request(`${AUTH_BASE}/me`)
}

/* ── Blog admin ───────────────────────────────────────── */

export async function listPosts({ status, q } = {}) {
  const params = new URLSearchParams()
  if (status) params.set('status', status)
  if (q) params.set('q', q)
  const qs = params.toString()
  const data = await blogRequest(`/posts${qs ? `?${qs}` : ''}`)
  return asList(data, 'posts')
}

export async function getPost(id) {
  const data = await blogRequest(`/posts/${encodeURIComponent(id)}`)
  return data?.post || data
}

export async function createPost(payload) {
  const data = await blogRequest('/posts', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return data?.post || data
}

export async function updatePost(id, payload) {
  const data = await blogRequest(`/posts/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  return data?.post || data
}

export async function deletePost(id) {
  return blogRequest(`/posts/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export async function publishPost(id) {
  const data = await blogRequest(`/posts/${encodeURIComponent(id)}/publish`, {
    method: 'POST',
  })
  return data?.post || data
}

export async function unpublishPost(id) {
  const data = await blogRequest(`/posts/${encodeURIComponent(id)}/unpublish`, {
    method: 'POST',
  })
  return data?.post || data
}

export async function archivePost(id) {
  const data = await blogRequest(`/posts/${encodeURIComponent(id)}/archive`, {
    method: 'POST',
  })
  return data?.post || data
}

export async function createPreviewToken(id) {
  const data = await blogRequest(`/posts/${encodeURIComponent(id)}/preview-token`, {
    method: 'POST',
  })
  return data
}

export async function uploadFeaturedImage(file, { slug, alt } = {}) {
  const form = new FormData()
  form.append('file', file)
  if (slug) form.append('slug', slug)
  if (alt) form.append('alt', alt)
  const data = await blogRequest('/upload', { method: 'POST', body: form })
  return data
}

export async function listCategories() {
  const data = await blogRequest('/categories')
  return asList(data, 'categories')
}

export async function createCategory(payload) {
  const data = await blogRequest('/categories', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return data?.category || data
}

export async function updateCategory(id, payload) {
  const data = await blogRequest(`/categories/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  return data?.category || data
}

export async function deleteCategory(id) {
  return blogRequest(`/categories/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
