/**
 * Shared blog HTTP router — used by Pages Functions and Vite middleware.
 *
 * handleBlogRequest(request, env, { store, localWriter, siteOrigin })
 */

import {
  verifyAccess,
  validateAdminCredentials,
  createSessionToken,
  buildSessionCookieHeader,
  buildClearSessionCookieHeader,
  loginFailureDelayMs,
  sleep,
  passwordAuthConfigured,
} from './accessAuth.js'
import { uploadBlogMedia } from './blogMedia.js'
import { createD1Store } from './blogDb.js'
import {
  validateCategoryPayload,
  validatePostPayload,
} from './blogValidate.js'

const STATIC_PATHS = [
  '/',
  '/services',
  '/services/product-engineering',
  '/services/saas-development',
  '/services/web-development',
  '/services/mobile-app-development',
  '/services/ai-integration',
  '/services/workflow-automation',
  '/services/ui-ux-design',
  '/services/cloud-devops',
  '/services/api-development',
  '/services/dedicated-product-teams',
  '/industries',
  '/case-studies',
  '/mobile-applications',
  '/case-studies/tailorize',
  '/case-studies/servloom',
  '/case-studies/goodbooks-plus-analytics',
  '/case-studies/medbill-ultra',
  '/case-studies/metro-electric',
  '/case-studies/spaceworx',
  '/case-studies/mrzzm',
  '/case-studies/pathe-be',
  '/process',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/blog',
]

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...headers,
    },
  })
}

function xml(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=600',
    },
  })
}

function notFound(msg = 'Not found') {
  return json({ error: msg }, 404)
}

function methodNotAllowed() {
  return json({ error: 'Method not allowed' }, 405)
}

async function requireAdmin(request, env) {
  const auth = await verifyAccess(request, env)
  if (!auth.ok) {
    return { error: json({ error: auth.error || 'Unauthorized' }, 401) }
  }
  return { email: auth.email || auth.username || null, username: auth.username || null }
}

/**
 * Auth routes (no prior session required except /me returns 401 when unauthenticated).
 */
async function handleAdminAuth(request, env, pathname, method) {
  if (pathname === '/api/admin/auth/login' && method === 'POST') {
    if (!passwordAuthConfigured(env)) {
      return json({ error: 'Admin auth is not configured' }, 401)
    }
    if (!env.BLOG_ADMIN_SESSION_SECRET) {
      return json({ error: 'Admin auth is not configured' }, 401)
    }

    let body
    try {
      body = await request.json()
    } catch {
      await sleep(loginFailureDelayMs())
      return json({ error: 'Invalid credentials' }, 401)
    }

    const username = body?.username != null ? String(body.username) : ''
    const password = body?.password != null ? String(body.password) : ''
    const ok = await validateAdminCredentials(username, password, env)
    if (!ok) {
      await sleep(loginFailureDelayMs())
      return json({ error: 'Invalid credentials' }, 401)
    }

    const token = await createSessionToken(
      String(env.BLOG_ADMIN_USERNAME).trim(),
      env,
    )
    return json(
      { ok: true, authenticated: true, username: String(env.BLOG_ADMIN_USERNAME).trim() },
      200,
      { 'Set-Cookie': buildSessionCookieHeader(token, request) },
    )
  }

  if (pathname === '/api/admin/auth/logout' && method === 'POST') {
    return json(
      { ok: true },
      200,
      { 'Set-Cookie': buildClearSessionCookieHeader(request) },
    )
  }

  if (pathname === '/api/admin/auth/me' && method === 'GET') {
    const auth = await verifyAccess(request, env)
    if (!auth.ok) {
      return json({ error: auth.error || 'Unauthorized', authenticated: false }, 401)
    }
    return json({
      authenticated: true,
      username: auth.username || null,
      email: auth.email || null,
    })
  }

  return null
}

function matchPath(pathname) {
  const p = pathname.replace(/\/+$/, '') || '/'
  return p
}

/**
 * @param {Request} request
 * @param {Record<string, any>} env
 * @param {{ store: object, localWriter?: Function, siteOrigin?: string }} options
 */
export async function handleBlogRequest(request, env, options = {}) {
  const url = new URL(request.url)
  const pathname = matchPath(url.pathname)
  const method = (request.method || 'GET').toUpperCase()

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204 })
  }

  // Auth routes do not need a blog store / D1
  if (pathname.startsWith('/api/admin/auth')) {
    try {
      const authRes = await handleAdminAuth(request, env, pathname, method)
      if (authRes) return authRes
      return notFound()
    } catch (err) {
      const status = err?.status || 500
      if (status >= 500) console.error('[blogHttp]', err)
      return json({ error: err?.message || 'Server error' }, status)
    }
  }

  const store = options.store
  if (!store) return json({ error: 'Blog store unavailable' }, 503)

  try {
    // ── Sitemap ───────────────────────────────────────────────────────────
    if (pathname === '/sitemap.xml' && method === 'GET') {
      return handleSitemap(store, options.siteOrigin || env.SITE_ORIGIN || 'https://mernify.co')
    }

    // ── Public blog ───────────────────────────────────────────────────────
    if (pathname === '/api/blog/posts' && method === 'GET') {
      const { posts, nextCursor } = await store.listPublished({
        category: url.searchParams.get('category') || undefined,
        q: url.searchParams.get('q') || undefined,
        limit: url.searchParams.get('limit') || undefined,
        cursor: url.searchParams.get('cursor') || undefined,
      })
      return json(
        { posts, nextCursor },
        200,
        { 'Cache-Control': 'public, max-age=60, s-maxage=300' },
      )
    }

    const publicPost = pathname.match(/^\/api\/blog\/posts\/([^/]+)$/)
    if (publicPost && method === 'GET') {
      const slug = decodeURIComponent(publicPost[1])
      const token = url.searchParams.get('token')
      if (token) {
        const preview = await store.verifyPreviewToken(slug, token)
        if (!preview) return json({ error: 'Invalid or expired preview token' }, 403)
        return json({ post: preview }, 200, { 'Cache-Control': 'no-store' })
      }
      const post = await store.getBySlug(slug)
      if (!post) return notFound('Post not found')
      return json(
        { post },
        200,
        { 'Cache-Control': 'public, max-age=60, s-maxage=300' },
      )
    }

    if (pathname === '/api/blog/categories' && method === 'GET') {
      const categories = await store.listCategories()
      return json(
        { categories },
        200,
        { 'Cache-Control': 'public, max-age=300, s-maxage=600' },
      )
    }

    // ── Admin blog ────────────────────────────────────────────────────────
    if (!pathname.startsWith('/api/admin/blog')) {
      return notFound()
    }

    const admin = await requireAdmin(request, env)
    if (admin.error) return admin.error
    const email = admin.email

    if (pathname === '/api/admin/blog/posts') {
      if (method === 'GET') {
        const result = await store.listAdmin({
          status: url.searchParams.get('status') || undefined,
          q: url.searchParams.get('q') || undefined,
          limit: url.searchParams.get('limit') || undefined,
        })
        return json(result)
      }
      if (method === 'POST') {
        let body
        try {
          body = await request.json()
        } catch {
          return json({ error: 'Invalid JSON' }, 400)
        }
        const check = validatePostPayload(body, { partial: false })
        if (check.error) return json({ error: check.error }, check.status || 400)
        const post = await store.create(check.value, { email })
        return json({ post }, 201)
      }
      return methodNotAllowed()
    }

    const adminPostAction = pathname.match(
      /^\/api\/admin\/blog\/posts\/([^/]+)\/(publish|unpublish|archive|preview-token)$/,
    )
    if (adminPostAction && method === 'POST') {
      const id = decodeURIComponent(adminPostAction[1])
      const action = adminPostAction[2]
      if (action === 'publish') {
        const post = await store.setStatus(id, 'published', { email })
        if (!post) return notFound('Post not found')
        return json({ post })
      }
      if (action === 'unpublish') {
        const post = await store.setStatus(id, 'draft', { email })
        if (!post) return notFound('Post not found')
        return json({ post })
      }
      if (action === 'archive') {
        const post = await store.setStatus(id, 'archived', { email })
        if (!post) return notFound('Post not found')
        return json({ post })
      }
      if (action === 'preview-token') {
        const minted = await store.createPreviewToken(id, { email })
        if (!minted) return notFound('Post not found')
        const post = await store.getById(id)
        return json({
          token: minted.token,
          expiresAt: minted.expiresAt,
          previewPath: post ? `/blog/${post.slug}?token=${minted.token}` : null,
        })
      }
    }

    const adminPost = pathname.match(/^\/api\/admin\/blog\/posts\/([^/]+)$/)
    if (adminPost) {
      const id = decodeURIComponent(adminPost[1])
      if (method === 'GET') {
        const post = await store.getById(id)
        if (!post) return notFound('Post not found')
        return json({ post })
      }
      if (method === 'PATCH') {
        let body
        try {
          body = await request.json()
        } catch {
          return json({ error: 'Invalid JSON' }, 400)
        }
        const check = validatePostPayload(body, { partial: true })
        if (check.error) return json({ error: check.error }, check.status || 400)
        const post = await store.update(id, check.value)
        if (!post) return notFound('Post not found')
        return json({ post })
      }
      if (method === 'DELETE') {
        const ok = await store.deletePost(id)
        if (!ok) return notFound('Post not found')
        return json({ ok: true })
      }
      return methodNotAllowed()
    }

    if (pathname === '/api/admin/blog/upload' && method === 'POST') {
      const form = await request.formData()
      const file = form.get('file')
      if (!file || typeof file === 'string') {
        return json({ error: 'file is required' }, 400)
      }
      const result = await uploadBlogMedia({
        file,
        env,
        store,
        alt: form.get('alt') ? String(form.get('alt')) : undefined,
        postId: form.get('postId') ? String(form.get('postId')) : undefined,
        localWriter: options.localWriter,
      })
      return json({ ok: true, ...result }, 201)
    }

    if (pathname === '/api/admin/blog/categories') {
      if (method === 'GET') {
        const categories = await store.listCategories()
        return json({ categories })
      }
      if (method === 'POST') {
        let body
        try {
          body = await request.json()
        } catch {
          return json({ error: 'Invalid JSON' }, 400)
        }
        const check = validateCategoryPayload(body, { partial: false })
        if (check.error) return json({ error: check.error }, check.status || 400)
        const category = await store.createCategory({
          name: check.value.name,
          slug: check.value.slug,
          sortOrder: check.value.sortOrder ?? 0,
        })
        return json({ category }, 201)
      }
      return methodNotAllowed()
    }

    const adminCat = pathname.match(/^\/api\/admin\/blog\/categories\/([^/]+)$/)
    if (adminCat) {
      const id = decodeURIComponent(adminCat[1])
      if (method === 'PATCH') {
        let body
        try {
          body = await request.json()
        } catch {
          return json({ error: 'Invalid JSON' }, 400)
        }
        const check = validateCategoryPayload(body, { partial: true })
        if (check.error) return json({ error: check.error }, check.status || 400)
        const category = await store.updateCategory(id, {
          name: check.value.name,
          slug: check.value.slug,
          sortOrder: check.value.sortOrder,
        })
        if (!category) return notFound('Category not found')
        return json({ category })
      }
      if (method === 'DELETE') {
        const ok = await store.deleteCategory(id)
        if (!ok) return notFound('Category not found')
        return json({ ok: true })
      }
      return methodNotAllowed()
    }

    return notFound()
  } catch (err) {
    const status = err?.status || 500
    if (status >= 500) console.error('[blogHttp]', err)
    return json({ error: err?.message || 'Server error' }, status)
  }
}

async function handleSitemap(store, siteOrigin) {
  const origin = String(siteOrigin).replace(/\/$/, '')
  const { posts } = await store.listPublished({ limit: 500 })
  const urls = [
    ...STATIC_PATHS.map((p) => ({ loc: `${origin}${p === '/' ? '/' : p}`, lastmod: null })),
    ...posts.map((post) => ({
      loc: `${origin}/blog/${post.slug}`,
      lastmod: post.updatedAt || post.publishedAt || null,
    })),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => {
    const last = u.lastmod ? `\n    <lastmod>${escapeXml(u.lastmod)}</lastmod>` : ''
    return `  <url>\n    <loc>${escapeXml(u.loc)}</loc>${last}\n  </url>`
  })
  .join('\n')}
</urlset>
`
  return xml(body)
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Pages Functions entry — builds D1 store from env.CONTENT_DB.
 * Auth routes skip the D1 requirement.
 * @param {{ request: Request, env: Record<string, any> }} context
 */
export async function pagesBlogOnRequest(context) {
  const { request, env } = context
  const pathname = matchPath(new URL(request.url).pathname)

  if (pathname.startsWith('/api/admin/auth')) {
    return handleBlogRequest(request, env, { store: null })
  }

  if (!env?.CONTENT_DB) {
    return json({ error: 'CONTENT_DB binding is not configured' }, 503)
  }
  const store = createD1Store(env.CONTENT_DB)
  return handleBlogRequest(request, env, {
    store,
    siteOrigin: env.SITE_ORIGIN || 'https://mernify.co',
  })
}
