import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { Buffer } from 'node:buffer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleSitePreview } from './functions/_lib/preview.js'
import {
  parseContactBody,
  sendContactEmail,
  validateContactPayload,
} from './functions/_lib/contactMail.js'

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

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), sitePreviewProxy(), contactApi(mode), newsletterApi(mode)],
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
