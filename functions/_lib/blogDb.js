/**
 * D1 helpers for blog content (env.CONTENT_DB).
 * Returns the same store API as blogLocalStore.js.
 */

import { postToRowFields, rowToPost } from './blogNormalize.js'
import { canTransitionStatus, slugify } from './blogValidate.js'

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function randomToken() {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function newId() {
  return crypto.randomUUID()
}

/**
 * @param {D1Database} db
 */
export function createD1Store(db) {
  if (!db) {
    throw new Error('CONTENT_DB binding is missing')
  }

  async function getCategoryNames() {
    const { results } = await db.prepare('SELECT name FROM categories ORDER BY sort_order ASC, name ASC').all()
    return (results || []).map((r) => r.name)
  }

  async function assertCategory(name) {
    const row = await db.prepare('SELECT id FROM categories WHERE name = ?').bind(name).first()
    if (!row) {
      const err = new Error(`Unknown category: ${name}`)
      err.status = 400
      throw err
    }
  }

  return {
    kind: 'd1',

    async listPublished({ category, q, limit = 100, cursor } = {}) {
      const lim = Math.min(Math.max(Number(limit) || 100, 1), 200)
      let sql = `SELECT * FROM posts WHERE status = 'published'`
      const binds = []
      if (category && category !== 'All') {
        sql += ' AND category = ?'
        binds.push(category)
      }
      if (cursor) {
        sql += ' AND published_at < ?'
        binds.push(cursor)
      }
      sql += ' ORDER BY published_at DESC LIMIT ?'
      binds.push(lim)

      const { results } = await db.prepare(sql).bind(...binds).all()
      let posts = (results || []).map((row) => rowToPost(row, { includeStatus: false }))

      if (q && String(q).trim()) {
        const needle = String(q).trim().toLowerCase()
        posts = posts.filter((post) => {
          const hay = [post.title, post.excerpt, post.category, ...(post.tags || []), post.author?.name]
            .join(' ')
            .toLowerCase()
          return hay.includes(needle)
        })
      }

      return { posts, nextCursor: posts.length === lim ? posts[posts.length - 1]?.publishedAt : null }
    },

    async getBySlug(slug, { anyStatus = false } = {}) {
      const row = anyStatus
        ? await db.prepare('SELECT * FROM posts WHERE slug = ?').bind(slug).first()
        : await db
            .prepare(`SELECT * FROM posts WHERE slug = ? AND status = 'published'`)
            .bind(slug)
            .first()
      if (!row) return null
      return rowToPost(row, { includeStatus: anyStatus })
    },

    async listAdmin({ status, q, limit = 200 } = {}) {
      const lim = Math.min(Math.max(Number(limit) || 200, 1), 500)
      let sql = 'SELECT * FROM posts WHERE 1=1'
      const binds = []
      if (status && status !== 'all') {
        sql += ' AND status = ?'
        binds.push(status)
      }
      sql += ' ORDER BY updated_at_ts DESC LIMIT ?'
      binds.push(lim)
      const { results } = await db.prepare(sql).bind(...binds).all()
      let posts = (results || []).map((row) => rowToPost(row, { includeStatus: true }))
      if (q && String(q).trim()) {
        const needle = String(q).trim().toLowerCase()
        posts = posts.filter((post) => {
          const hay = [post.title, post.slug, post.excerpt, post.category, post.status]
            .join(' ')
            .toLowerCase()
          return hay.includes(needle)
        })
      }
      return { posts }
    },

    async getById(id) {
      const row = await db.prepare('SELECT * FROM posts WHERE id = ?').bind(id).first()
      if (!row) return null
      return rowToPost(row, { includeStatus: true })
    },

    async create(payload, { email } = {}) {
      await assertCategory(payload.category)
      const id = newId()
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

      try {
        await db
          .prepare(
            `INSERT INTO posts (
              id, slug, title, excerpt, category, author_name, author_role,
              published_at, updated_at, reading_minutes, featured, image, image_alt, image_src_set,
              tags_json, sections_json, faq_json, status, seo_title, seo_description, seo_og_image,
              created_at, updated_at_ts, published_by
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          )
          .bind(
            id,
            fields.slug,
            fields.title,
            fields.excerpt,
            fields.category,
            fields.author_name,
            fields.author_role,
            fields.published_at,
            fields.updated_at,
            fields.reading_minutes,
            fields.featured,
            fields.image,
            fields.image_alt,
            fields.image_src_set,
            fields.tags_json,
            fields.sections_json,
            fields.faq_json,
            fields.status,
            fields.seo_title,
            fields.seo_description,
            fields.seo_og_image,
            now,
            fields.updated_at_ts,
            fields.published_by,
          )
          .run()
      } catch (err) {
        if (String(err?.message || err).includes('UNIQUE')) {
          const e = new Error('slug already exists')
          e.status = 409
          throw e
        }
        throw err
      }

      return this.getById(id)
    },

    async update(id, payload) {
      const existing = await db.prepare('SELECT * FROM posts WHERE id = ?').bind(id).first()
      if (!existing) return null

      const merged = {
        ...rowToPost(existing, { includeStatus: true }),
        ...payload,
        author: payload.author || {
          name: existing.author_name,
          role: existing.author_role,
        },
      }
      if (payload.category) await assertCategory(payload.category)

      const nextStatus = payload.status || existing.status
      if (payload.status && payload.status !== existing.status) {
        if (!canTransitionStatus(existing.status, payload.status)) {
          const e = new Error(`Cannot transition status from ${existing.status} to ${payload.status}`)
          e.status = 400
          throw e
        }
      }

      const fields = postToRowFields(merged, {
        status: nextStatus,
        publishedBy: existing.published_by,
        nowTs: Date.now(),
      })

      try {
        await db
          .prepare(
            `UPDATE posts SET
              slug = ?, title = ?, excerpt = ?, category = ?, author_name = ?, author_role = ?,
              published_at = ?, updated_at = ?, reading_minutes = ?, featured = ?,
              image = ?, image_alt = ?, image_src_set = ?,
              tags_json = ?, sections_json = ?, faq_json = ?, status = ?,
              seo_title = ?, seo_description = ?, seo_og_image = ?,
              updated_at_ts = ?, published_by = ?
            WHERE id = ?`,
          )
          .bind(
            fields.slug,
            fields.title,
            fields.excerpt,
            fields.category,
            fields.author_name,
            fields.author_role,
            fields.published_at,
            fields.updated_at || todayIso(),
            fields.reading_minutes,
            fields.featured,
            fields.image,
            fields.image_alt,
            fields.image_src_set,
            fields.tags_json,
            fields.sections_json,
            fields.faq_json,
            fields.status,
            fields.seo_title,
            fields.seo_description,
            fields.seo_og_image,
            fields.updated_at_ts,
            fields.published_by,
            id,
          )
          .run()
      } catch (err) {
        if (String(err?.message || err).includes('UNIQUE')) {
          const e = new Error('slug already exists')
          e.status = 409
          throw e
        }
        throw err
      }

      return this.getById(id)
    },

    async setStatus(id, status, { email } = {}) {
      const existing = await db.prepare('SELECT * FROM posts WHERE id = ?').bind(id).first()
      if (!existing) return null
      if (!canTransitionStatus(existing.status, status)) {
        const e = new Error(`Cannot transition status from ${existing.status} to ${status}`)
        e.status = 400
        throw e
      }

      const now = Date.now()
      let publishedAt = existing.published_at
      let updatedAt = todayIso()
      let publishedBy = existing.published_by

      if (status === 'published') {
        if (!publishedAt) publishedAt = todayIso()
        updatedAt = todayIso()
        publishedBy = email || publishedBy || null
      }

      await db
        .prepare(
          `UPDATE posts SET status = ?, published_at = ?, updated_at = ?, updated_at_ts = ?, published_by = ? WHERE id = ?`,
        )
        .bind(status, publishedAt, updatedAt, now, publishedBy, id)
        .run()

      return this.getById(id)
    },

    async deletePost(id) {
      const existing = await db.prepare('SELECT id FROM posts WHERE id = ?').bind(id).first()
      if (!existing) return false
      await db.prepare('DELETE FROM preview_tokens WHERE post_id = ?').bind(id).run()
      await db.prepare('DELETE FROM posts WHERE id = ?').bind(id).run()
      return true
    },

    async listCategories() {
      const { results } = await db
        .prepare('SELECT * FROM categories ORDER BY sort_order ASC, name ASC')
        .all()
      return (results || []).map((row) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        sortOrder: row.sort_order,
        createdAt: row.created_at,
      }))
    },

    async createCategory({ name, slug, sortOrder = 0 }) {
      const id = newId()
      const s = slug || slugify(name)
      const now = Date.now()
      try {
        await db
          .prepare(
            `INSERT INTO categories (id, name, slug, sort_order, created_at) VALUES (?, ?, ?, ?, ?)`,
          )
          .bind(id, name, s, sortOrder, now)
          .run()
      } catch (err) {
        if (String(err?.message || err).includes('UNIQUE')) {
          const e = new Error('category name or slug already exists')
          e.status = 409
          throw e
        }
        throw err
      }
      const cats = await this.listCategories()
      return cats.find((c) => c.id === id)
    },

    async updateCategory(id, { name, slug, sortOrder }) {
      const existing = await db.prepare('SELECT * FROM categories WHERE id = ?').bind(id).first()
      if (!existing) return null
      const nextName = name != null ? name : existing.name
      const nextSlug = slug != null ? slug : existing.slug
      const nextSort = sortOrder != null ? sortOrder : existing.sort_order
      try {
        await db
          .prepare(`UPDATE categories SET name = ?, slug = ?, sort_order = ? WHERE id = ?`)
          .bind(nextName, nextSlug, nextSort, id)
          .run()
      } catch (err) {
        if (String(err?.message || err).includes('UNIQUE')) {
          const e = new Error('category name or slug already exists')
          e.status = 409
          throw e
        }
        throw err
      }
      if (name && name !== existing.name) {
        await db.prepare(`UPDATE posts SET category = ? WHERE category = ?`).bind(name, existing.name).run()
      }
      const cats = await this.listCategories()
      return cats.find((c) => c.id === id)
    },

    async deleteCategory(id) {
      const existing = await db.prepare('SELECT * FROM categories WHERE id = ?').bind(id).first()
      if (!existing) return false
      const used = await db
        .prepare('SELECT id FROM posts WHERE category = ? LIMIT 1')
        .bind(existing.name)
        .first()
      if (used) {
        const e = new Error('Cannot delete category while posts still use it')
        e.status = 409
        throw e
      }
      await db.prepare('DELETE FROM categories WHERE id = ?').bind(id).run()
      return true
    },

    async createPreviewToken(postId, { email, ttlMs = 7 * 24 * 60 * 60 * 1000 } = {}) {
      const post = await db.prepare('SELECT id FROM posts WHERE id = ?').bind(postId).first()
      if (!post) return null
      const token = randomToken()
      const tokenHash = await sha256Hex(token)
      const expiresAt = Date.now() + ttlMs
      await db
        .prepare(
          `INSERT INTO preview_tokens (token_hash, post_id, expires_at, created_by, revoked)
           VALUES (?, ?, ?, ?, 0)`,
        )
        .bind(tokenHash, postId, expiresAt, email || null)
        .run()
      return { token, expiresAt }
    },

    async verifyPreviewToken(slug, token) {
      if (!token) return null
      const tokenHash = await sha256Hex(token)
      const row = await db
        .prepare(
          `SELECT p.*, t.expires_at, t.revoked
           FROM preview_tokens t
           JOIN posts p ON p.id = t.post_id
           WHERE t.token_hash = ? AND p.slug = ?`,
        )
        .bind(tokenHash, slug)
        .first()
      if (!row || row.revoked) return null
      if (Number(row.expires_at) < Date.now()) return null
      return rowToPost(row, { includeStatus: true })
    },

    async revokePreviewTokens(postId) {
      await db.prepare(`UPDATE preview_tokens SET revoked = 1 WHERE post_id = ?`).bind(postId).run()
      return true
    },

    async insertMedia(record) {
      const id = record.id || newId()
      await db
        .prepare(
          `INSERT INTO media (id, r2_key, public_url, content_type, bytes, alt, post_id, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          id,
          record.r2Key || record.r2_key,
          record.publicUrl || record.public_url,
          record.contentType || record.content_type || null,
          record.bytes || null,
          record.alt || null,
          record.postId || record.post_id || null,
          Date.now(),
        )
        .run()
      return { id, ...record }
    },

    getCategoryNames,
  }
}
