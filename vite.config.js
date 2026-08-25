import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { Buffer } from 'node:buffer'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { handleSitePreview } from './functions/_lib/preview.js'
import {
  parseContactBody,
  sendContactEmail,
  validateContactPayload,
} from './functions/_lib/contactMail.js'
import { handleBlogRequest } from './functions/_lib/blogHttp.js'
import { createLocalStore, resolveRepoRoot } from './functions/_lib/blogLocalStore.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Same-origin proxy used by case-study device frames.
 * Active for `vite` (dev) and `vite preview` so local builds match prod Pages Function.
 * Route: GET/HEAD /site-preview?url=<encoded_full_url>
 */
function sitePreviewProxy() {
  const attach = (server) => {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith('/site-preview')) return next()

      try {
        const requestUrl = new URL(req.url, 'http://localhost').toString()
        const upstream = await handleSitePreview(requestUrl, { method: req.method || 'GET' })

        res.statusCode = upstream.status
        upstream.headers.forEach((value, key) => {
          if (key.toLowerCase() === 'content-encoding') return
          res.setHeader(key, value)
        })

        if (req.method === 'HEAD' || req.method === 'OPTIONS') {
          res.end()
          return
        }

        const buf = Buffer.from(await upstream.arrayBuffer())
        res.end(buf)
      } catch (err) {
        res.statusCode = 502
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(`Proxy error: ${err.message}`)
      }
    })
  }

  return {
    name: 'site-preview-proxy',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}

/** Local POST /api/contact — mirrors Cloudflare Pages Function → mail microservice. */
function contactApi(mode) {
  const readJson = (req) =>
    new Promise((resolve, reject) => {
      const chunks = []
      req.on('data', (chunk) => chunks.push(chunk))
      req.on('end', () => {
        try {
          const raw = Buffer.concat(chunks).toString('utf8') || '{}'
          resolve(JSON.parse(raw))
        } catch (err) {
          reject(err)
        }
      })
      req.on('error', reject)
    })

  const attach = (server) => {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url?.split('?')[0]
      if (url !== '/api/contact') return next()

      if (req.method === 'OPTIONS') {
        res.statusCode = 204
        res.end()
        return
      }

      if (req.method !== 'POST') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Method not allowed' }))
        return
      }

      try {
        // Reload .env on every request so EMAIL_SECRET takes effect without restart.
        const env = loadEnv(mode, process.cwd(), '')
        const body = await readJson(req)
        const fields = parseContactBody(body)
        const check = validateContactPayload(fields)
        if (check.honeypot) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true }))
          return
        }
        if (check.error) {
          res.statusCode = check.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: check.error }))
          return
        }

        const result = await sendContactEmail(
          fields,
          {
            EMAIL_SERVICE_URL: env.EMAIL_SERVICE_URL,
            EMAIL_SECRET: env.EMAIL_SECRET,
            RESEND_API_KEY: env.RESEND_API_KEY,
            WEB3FORMS_ACCESS_KEY: env.WEB3FORMS_ACCESS_KEY,
            CONTACT_TO: env.CONTACT_TO || 'info@mernify.co',
            CONTACT_FROM: env.CONTACT_FROM || 'Mernify <hello@mernify.co>',
          },
          'local-dev',
        )

        res.statusCode = result.ok ? 200 : result.status
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify(
            result.ok
              ? { ok: true, provider: result.provider, id: result.id || undefined }
              : { error: result.error },
          ),
        )
      } catch (err) {
        const isJson = err instanceof SyntaxError
        res.statusCode = isJson ? 400 : 500
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            error: isJson ? 'Invalid JSON' : 'Server error processing contact form.',
          }),
        )
        console.error('[contact api]', err)
      }
    })
  }

  return {
    name: 'contact-api',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}

/** Local POST /api/newsletter — same mail microservice as contact. */
function newsletterApi(mode) {
  const readJson = (req) =>
    new Promise((resolve, reject) => {
      const chunks = []
      req.on('data', (chunk) => chunks.push(chunk))
      req.on('end', () => {
        try {
          const raw = Buffer.concat(chunks).toString('utf8') || '{}'
          resolve(JSON.parse(raw))
        } catch (err) {
          reject(err)
        }
      })
      req.on('error', reject)
    })

  const attach = (server) => {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url?.split('?')[0]
      if (url !== '/api/newsletter') return next()

      if (req.method === 'OPTIONS') {
        res.statusCode = 204
        res.end()
        return
      }
      if (req.method !== 'POST') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Method not allowed' }))
        return
      }

      try {
        const env = loadEnv(mode, process.cwd(), '')
        const body = await readJson(req)
        const email = String(body.email || '').trim()
        if (body.website || body.company_url) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true }))
          return
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Invalid email' }))
          return
        }

        const fields = parseContactBody({
          name: 'Newsletter subscriber',
          email,
          message: `Newsletter signup from the website.\n\nPlease add ${email} to Mernify updates / mailing list.`,
          consent: true,
          source: 'newsletter',
          page: String(body.page || ''),
          website: '',
        })
        const check = validateContactPayload(fields)
        if (check.error) {
          res.statusCode = check.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: check.error }))
          return
        }

        const result = await sendContactEmail(
          fields,
          {
            EMAIL_SERVICE_URL: env.EMAIL_SERVICE_URL,
            EMAIL_SECRET: env.EMAIL_SECRET,
            RESEND_API_KEY: env.RESEND_API_KEY,
            WEB3FORMS_ACCESS_KEY: env.WEB3FORMS_ACCESS_KEY,
            CONTACT_TO: env.CONTACT_TO || 'info@mernify.co',
            CONTACT_FROM: env.CONTACT_FROM || 'Mernify <hello@mernify.co>',
          },
          'local-dev',
        )

        res.statusCode = result.ok ? 200 : result.status
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify(
            result.ok ? { ok: true, provider: result.provider } : { error: result.error },
          ),
        )
      } catch (err) {
        res.statusCode = err instanceof SyntaxError ? 400 : 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Server error processing newsletter.' }))
        console.error('[newsletter api]', err)
      }
    })
  }

  return {
    name: 'newsletter-api',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}

/** Local /api/blog + /api/admin/blog + /api/admin/auth + /sitemap.xml — mirrors Pages Functions via blogHttp. */
function blogApi(mode) {
  const store = createLocalStore(resolveRepoRoot())

  const readRawBody = (req) =>
    new Promise((resolve, reject) => {
      const chunks = []
      req.on('data', (chunk) => chunks.push(chunk))
      req.on('end', () => resolve(Buffer.concat(chunks)))
      req.on('error', reject)
    })

  const localWriter = async ({ buffer, id, ext }) => {
    const d = new Date()
    const yyyyMm = `${d.getUTCFullYear()}/${String(d.getUTCMonth() + 1).padStart(2, '0')}`
    const absDir = path.join(resolveRepoRoot(), 'public', 'uploads', 'blog', yyyyMm)
    await fs.mkdir(absDir, { recursive: true })
    const filename = `${id}.${ext}`
    await fs.writeFile(path.join(absDir, filename), buffer)
    return `/uploads/blog/${yyyyMm}/${filename}`
  }

  const attach = (server) => {
    server.middlewares.use(async (req, res, next) => {
      const pathname = req.url?.split('?')[0] || ''
      const isBlog =
        pathname.startsWith('/api/blog') ||
        pathname.startsWith('/api/admin/blog') ||
        pathname.startsWith('/api/admin/auth') ||
        pathname === '/sitemap.xml'
      if (!isBlog) return next()

      try {
        await store.ensureSeeded()
        const loaded = loadEnv(mode, process.cwd(), '')
        // Local Vite defaults for session login when unset (never baked into client JS).
        const env = {
          ...loaded,
          BLOG_ADMIN_USERNAME:
            loaded.BLOG_ADMIN_USERNAME || 'admin',
          BLOG_ADMIN_PASSWORD:
            loaded.BLOG_ADMIN_PASSWORD || 'local-dev-blog-admin',
          BLOG_ADMIN_SESSION_SECRET:
            loaded.BLOG_ADMIN_SESSION_SECRET ||
            'local-dev-mernify-admin-session-secret',
          // Optional script bypass — do NOT auto-enable; session login is the local UI path.
          BLOG_ADMIN_BYPASS: loaded.BLOG_ADMIN_BYPASS || '',
          BLOG_ADMIN_SECRET: loaded.BLOG_ADMIN_SECRET || '',
        }
        const host = req.headers.host || 'localhost:5173'
        const requestUrl = `http://${host}${req.url}`
        const headers = new Headers()
        for (const [key, value] of Object.entries(req.headers)) {
          if (value == null) continue
          if (Array.isArray(value)) headers.set(key, value.join(', '))
          else headers.set(key, String(value))
        }

        const method = req.method || 'GET'
        let body
        if (method !== 'GET' && method !== 'HEAD') {
          body = await readRawBody(req)
        }

        const request = new Request(requestUrl, { method, headers, body })
        const upstream = await handleBlogRequest(request, env, {
          store,
          localWriter,
          siteOrigin: env.SITE_ORIGIN || 'http://localhost:5173',
        })

        res.statusCode = upstream.status
        upstream.headers.forEach((value, key) => {
          if (key.toLowerCase() === 'content-encoding') return
          res.setHeader(key, value)
        })

        if (method === 'HEAD' || method === 'OPTIONS') {
          res.end()
          return
        }

        const buf = Buffer.from(await upstream.arrayBuffer())
        res.end(buf)
      } catch (err) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: err?.message || 'Blog API error' }))
        console.error('[blog api]', err)
      }
    })
  }

  return {
    name: 'blog-api',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}

/**
 * Serve admin SPA for client routes (/admin/new, /admin/edit/:id, …).
 * Mirrors public/_redirects for Cloudflare Pages.
 */
function adminSpaFallback() {
  const rewrite = (req, _res, next) => {
    const raw = req.url || ''
    const pathname = raw.split('?')[0] || ''
    if (pathname === '/admin' || pathname === '/admin/') {
      req.url = '/admin/index.html' + (raw.includes('?') ? `?${raw.split('?')[1]}` : '')
      return next()
    }
    // Client routes only — leave real assets alone (e.g. /admin/index.html)
    if (
      pathname.startsWith('/admin/') &&
      !pathname.startsWith('/admin/index.html') &&
      !/\.[a-zA-Z0-9]+$/.test(pathname)
    ) {
      req.url = '/admin/index.html' + (raw.includes('?') ? `?${raw.split('?')[1]}` : '')
    }
    return next()
  }

  return {
    name: 'admin-spa-fallback',
    configureServer(server) {
      // Run before Vite's HTML/fallback middleware
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      sitePreviewProxy(),
      contactApi(mode),
      newsletterApi(mode),
      blogApi(mode),
      adminSpaFallback(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      open: false,
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
      modulePreload: { polyfill: false },
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          admin: path.resolve(__dirname, 'admin/index.html'),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) return 'gsap'
            if (id.includes('node_modules/lenis')) return 'lenis'
            if (id.includes('node_modules/lucide-react')) return 'icons'
            if (
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router') ||
              id.includes('node_modules/react/')
            ) {
              return 'react-vendor'
            }
            return undefined
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
  }
})
