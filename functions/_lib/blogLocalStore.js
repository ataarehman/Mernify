/**
 * File-based blog store for local Vite — same API as createD1Store.
 * Data: `.data/blog-store.json` (gitignored).
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash, randomBytes, randomUUID } from 'node:crypto'
import { postToRowFields, rowToPost } from './blogNormalize.js'
import { canTransitionStatus, slugify } from './blogValidate.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const DEFAULT_CATEGORIES = [
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

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function sha256Hex(text) {
  return createHash('sha256').update(text).digest('hex')
}

function emptyStore() {
  return { categories: [], posts: [], preview_tokens: [], media: [] }
}

/**
 * @param {string} [rootDir]
 */
export function createLocalStore(rootDir = process.cwd()) {
  const dataDir = path.join(rootDir, '.data')
  const storePath = path.join(dataDir, 'blog-store.json')
  let writeChain = Promise.resolve()
  let ready = null

  async function readRaw() {
    try {
      const raw = await fs.readFile(storePath, 'utf8')
      return JSON.parse(raw)
    } catch (err) {
      if (err?.code === 'ENOENT') return emptyStore()
      throw err
    }
  }

  async function writeRaw(data) {
    await fs.mkdir(dataDir, { recursive: true })
    const tmp = `${storePath}.${process.pid}.tmp`
    await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8')
    await fs.rename(tmp, storePath)
  }

  function withStore(fn) {
    const run = writeChain.then(async () => {
      const data = await readRaw()
      const result = await fn(data)
      if (result?.persist !== false) {
        await writeRaw(data)
      }
      return result?.value
    })
    // Keep the queue alive after failures
    writeChain = run.catch(() => {})
    return run
  }

  async function ensureSeeded() {
    if (ready) return ready
    ready = (async () => {
      await fs.mkdir(dataDir, { recursive: true })
      let data = await readRaw()
      const isEmpty = !data.posts?.length && !data.categories?.length
      if (!isEmpty) return

      const now = Date.now()
      data = emptyStore()
      data.categories = DEFAULT_CATEGORIES.map((name, index) => ({
        id: randomUUID(),
        name,
        slug: slugify(name),
        sort_order: index,
        created_at: now,
      }))

      try {
        const dataUrl = new URL('../../src/content/blogPostsData.js', import.meta.url)
        const mod = await import(dataUrl.href)
        const posts = mod.blogPostsData || []
        for (const post of posts) {
          const fields = postToRowFields(post, {
            status: 'published',
            publishedBy: 'seed',
            nowTs: now,
          })
          data.posts.push({
            id: randomUUID(),
            ...fields,
            created_at: now,
          })
        }
      } catch (err) {
        console.warn('[blogLocalStore] seed from blogPostsData failed:', err?.message || err)
      }

      await writeRaw(data)
    })()
    return ready
  }

  async function assertCategory(data, name) {
    if (!data.categories.some((c) => c.name === name)) {
      const e = new Error(`Unknown category: ${name}`)
      e.status = 400
      throw e
    }
  }

  const api = {
    kind: 'local',
    storePath,
    ensureSeeded,

    async listPublished({ category, q, limit = 100, cursor } = {}) {
      await ensureSeeded()
      return withStore(async (data) => {
        let posts = data.posts.filter((p) => p.status === 'published')
        if (category && category !== 'All') {
          posts = posts.filter((p) => p.category === category)
        }
        posts.sort((a, b) => (a.published_at < b.published_at ? 1 : -1))
        if (cursor) {
          posts = posts.filter((p) => p.published_at < cursor)
        }
        const lim = Math.min(Math.max(Number(limit) || 100, 1), 200)
        posts = posts.slice(0, lim)
        let mapped = posts.map((row) => rowToPost(row, { includeStatus: false }))
        if (q && String(q).trim()) {
          const needle = String(q).trim().toLowerCase()
          mapped = mapped.filter((post) => {
            const hay = [post.title, post.excerpt, post.category, ...(post.tags || []), post.author?.name]
              .join(' ')
              .toLowerCase()
            return hay.includes(needle)
          })
        }
        return {
          persist: false,
          value: {
            posts: mapped,
            nextCursor: mapped.length === lim ? mapped[mapped.length - 1]?.publishedAt : null,
          },
        }
      })
    },

    async getBySlug(slug, { anyStatus = false } = {}) {
      await ensureSeeded()
      return withStore(async (data) => {
        const row = data.posts.find(
          (p) => p.slug === slug && (anyStatus || p.status === 'published'),
        )
        return {
          persist: false,
          value: row ? rowToPost(row, { includeStatus: anyStatus }) : null,
        }
      })
    },

    async listAdmin({ status, q, limit = 200 } = {}) {
      await ensureSeeded()
      return withStore(async (data) => {
        let posts = [...data.posts]
        if (status && status !== 'all') posts = posts.filter((p) => p.status === status)
        posts.sort((a, b) => (b.updated_at_ts || 0) - (a.updated_at_ts || 0))
        const lim = Math.min(Math.max(Number(limit) || 200, 1), 500)
        posts = posts.slice(0, lim)
        let mapped = posts.map((row) => rowToPost(row, { includeStatus: true }))
        if (q && String(q).trim()) {
          const needle = String(q).trim().toLowerCase()
          mapped = mapped.filter((post) => {
            const hay = [post.title, post.slug, post.excerpt, post.category, post.status]
              .join(' ')
              .toLowerCase()
            return hay.includes(needle)
          })
        }
        return { persist: false, value: { posts: mapped } }
      })
    },

    async getById(id) {
      await ensureSeeded()
      return withStore(async (data) => {
        const row = data.posts.find((p) => p.id === id)
        return {
          persist: false,
          value: row ? rowToPost(row, { includeStatus: true }) : null,
        }
      })
    },

    async create(payload, { email } = {}) {
      await ensureSeeded()
      return withStore(async (data) => {
        await assertCategory(data, payload.category)
        if (data.posts.some((p) => p.slug === payload.slug)) {
          const e = new Error('slug already exists')
          e.status = 409
          throw e
        }
        const id = randomUUID()
        const now = Date.now()
        const fields = postToRowFields(payload, {
          status: payload.status || 'draft',
          publishedBy: null,
          nowTs: now,
        })
        if (fields.status === 'published' && !fields.published_at) {
          fields.published_at = todayIso()
          fields.updated_at = fields.published_at
          fields.published_by = email || null
        }
        data.posts.push({ id, ...fields, created_at: now })
        return { value: rowToPost(data.posts[data.posts.length - 1], { includeStatus: true }) }
      })
    },

    async update(id, payload) {
      await ensureSeeded()
      return withStore(async (data) => {
        const idx = data.posts.findIndex((p) => p.id === id)
        if (idx < 0) return { persist: false, value: null }
        const existing = data.posts[idx]
        if (payload.category) await assertCategory(data, payload.category)
        if (payload.slug && payload.slug !== existing.slug) {
          if (data.posts.some((p) => p.slug === payload.slug)) {
            const e = new Error('slug already exists')
            e.status = 409
            throw e
          }
        }
        const nextStatus = payload.status || existing.status
        if (payload.status && payload.status !== existing.status) {
          if (!canTransitionStatus(existing.status, payload.status)) {
            const e = new Error(`Cannot transition status from ${existing.status} to ${payload.status}`)
            e.status = 400
            throw e
          }
        }
        const merged = {
          ...rowToPost(existing, { includeStatus: true }),
          ...payload,
          author: payload.author || {
            name: existing.author_name,
            role: existing.author_role,
          },
        }
        const fields = postToRowFields(merged, {
          status: nextStatus,
          publishedBy: existing.published_by,
          nowTs: Date.now(),
        })
        data.posts[idx] = {
          ...existing,
          ...fields,
          id: existing.id,
          created_at: existing.created_at,
        }
        return { value: rowToPost(data.posts[idx], { includeStatus: true }) }
      })
    },

    async setStatus(id, status, { email } = {}) {
      await ensureSeeded()
      return withStore(async (data) => {
        const row = data.posts.find((p) => p.id === id)
        if (!row) return { persist: false, value: null }
        if (!canTransitionStatus(row.status, status)) {
          const e = new Error(`Cannot transition status from ${row.status} to ${status}`)
          e.status = 400
          throw e
        }
        row.status = status
        row.updated_at = todayIso()
        row.updated_at_ts = Date.now()
        if (status === 'published') {
          if (!row.published_at) row.published_at = todayIso()
          row.published_by = email || row.published_by || null
        }
        return { value: rowToPost(row, { includeStatus: true }) }
      })
    },

    async deletePost(id) {
      await ensureSeeded()
      return withStore(async (data) => {
        const before = data.posts.length
        data.posts = data.posts.filter((p) => p.id !== id)
        data.preview_tokens = data.preview_tokens.filter((t) => t.post_id !== id)
        return { value: data.posts.length < before }
      })
    },

    async listCategories() {
      await ensureSeeded()
      return withStore(async (data) => {
        const cats = [...data.categories].sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name))
        return {
          persist: false,
          value: cats.map((row) => ({
            id: row.id,
            name: row.name,
            slug: row.slug,
            sortOrder: row.sort_order,
            createdAt: row.created_at,
          })),
        }
      })
    },

    async createCategory({ name, slug, sortOrder = 0 }) {
      await ensureSeeded()
      return withStore(async (data) => {
        const s = slug || slugify(name)
        if (data.categories.some((c) => c.name === name || c.slug === s)) {
          const e = new Error('category name or slug already exists')
          e.status = 409
          throw e
        }
        const row = {
          id: randomUUID(),
          name,
          slug: s,
          sort_order: sortOrder,
          created_at: Date.now(),
        }
        data.categories.push(row)
        return {
          value: {
            id: row.id,
            name: row.name,
            slug: row.slug,
            sortOrder: row.sort_order,
            createdAt: row.created_at,
          },
        }
      })
    },

    async updateCategory(id, { name, slug, sortOrder }) {
      await ensureSeeded()
      return withStore(async (data) => {
        const row = data.categories.find((c) => c.id === id)
        if (!row) return { persist: false, value: null }
        const prevName = row.name
        if (name != null) row.name = name
        if (slug != null) row.slug = slug
        if (sortOrder != null) row.sort_order = sortOrder
        if (data.categories.some((c) => c.id !== id && (c.name === row.name || c.slug === row.slug))) {
          const e = new Error('category name or slug already exists')
          e.status = 409
          throw e
        }
        if (name && name !== prevName) {
          for (const post of data.posts) {
            if (post.category === prevName) post.category = name
          }
        }
        return {
          value: {
            id: row.id,
            name: row.name,
            slug: row.slug,
            sortOrder: row.sort_order,
            createdAt: row.created_at,
          },
        }
      })
    },

    async deleteCategory(id) {
      await ensureSeeded()
      return withStore(async (data) => {
        const row = data.categories.find((c) => c.id === id)
        if (!row) return { persist: false, value: false }
        if (data.posts.some((p) => p.category === row.name)) {
          const e = new Error('Cannot delete category while posts still use it')
          e.status = 409
          throw e
        }
        data.categories = data.categories.filter((c) => c.id !== id)
        return { value: true }
      })
    },

    async createPreviewToken(postId, { email, ttlMs = 7 * 24 * 60 * 60 * 1000 } = {}) {
      await ensureSeeded()
      return withStore(async (data) => {
        if (!data.posts.some((p) => p.id === postId)) return { persist: false, value: null }
        const token = randomBytes(32).toString('hex')
        const tokenHash = sha256Hex(token)
        const expiresAt = Date.now() + ttlMs
        data.preview_tokens.push({
          token_hash: tokenHash,
          post_id: postId,
          expires_at: expiresAt,
          created_by: email || null,
          revoked: 0,
        })
        return { value: { token, expiresAt } }
      })
    },

    async verifyPreviewToken(slug, token) {
      await ensureSeeded()
      return withStore(async (data) => {
        if (!token) return { persist: false, value: null }
        const tokenHash = sha256Hex(token)
        const t = data.preview_tokens.find((x) => x.token_hash === tokenHash && !x.revoked)
        if (!t || t.expires_at < Date.now()) return { persist: false, value: null }
        const post = data.posts.find((p) => p.id === t.post_id && p.slug === slug)
        return {
          persist: false,
          value: post ? rowToPost(post, { includeStatus: true }) : null,
        }
      })
    },

    async revokePreviewTokens(postId) {
      await ensureSeeded()
      return withStore(async (data) => {
        for (const t of data.preview_tokens) {
          if (t.post_id === postId) t.revoked = 1
        }
        return { value: true }
      })
    },

    async insertMedia(record) {
      await ensureSeeded()
      return withStore(async (data) => {
        const id = record.id || randomUUID()
        data.media.push({
          id,
          r2_key: record.r2Key || record.r2_key,
          public_url: record.publicUrl || record.public_url,
          content_type: record.contentType || record.content_type || null,
          bytes: record.bytes || null,
          alt: record.alt || null,
          post_id: record.postId || record.post_id || null,
          created_at: Date.now(),
        })
        return { value: { id, ...record } }
      })
    },
  }

  return api
}

/** Resolve package root when imported from functions/_lib */
export function resolveRepoRoot() {
  return path.resolve(__dirname, '../..')
}
