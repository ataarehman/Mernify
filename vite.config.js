import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Buffer } from 'node:buffer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleSitePreview } from './functions/_lib/preview.js'

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
          // Node http will set content-length from body; skip hop-by-hop noise
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

export default defineConfig({
  plugins: [react(), sitePreviewProxy()],
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
    // Do not expose source maps in production (audit PF-002 / SEC-001)
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
})
