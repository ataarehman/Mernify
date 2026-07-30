import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Vite plugin: transparent site proxy that strips X-Frame-Options.
 *  Route: GET /site-preview?url=<encoded_full_url>
 *  Only active in dev. In production, point to a serverless function. */
function sitePreviewProxy() {
  return {
    name: 'site-preview-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/site-preview')) return next()

        let targetUrl
        try {
          targetUrl = new URL(req.url, 'http://localhost').searchParams.get('url')
          if (!targetUrl) throw new Error('missing url param')
          new URL(targetUrl) // validate it's a full URL
        } catch {
          res.statusCode = 400
          res.end('Missing or invalid ?url= parameter')
          return
        }

        try {
          const origin = new URL(targetUrl).origin
          const upstream = await fetch(targetUrl, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
              Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.9',
            },
            redirect: 'follow',
          })

          res.statusCode = upstream.status
          const ct = upstream.headers.get('content-type') || 'text/html'
          res.setHeader('Content-Type', ct)
          // Explicitly omit X-Frame-Options and CSP frame-ancestors

          if (ct.includes('text/html')) {
            let html = await upstream.text()
            // Inject base tag so all relative URLs resolve to the origin
            html = html.replace(/(<head[^>]*>)/i, `$1<base href="${origin}/">`)
            // Remove js-based frame-busting patterns (best-effort)
            html = html.replace(/top\s*!==?\s*(?:self|window)/g, 'false')
            html = html.replace(/self\s*!==?\s*top/g, 'false')
            res.end(html)
          } else {
            const buf = await upstream.arrayBuffer()
            res.end(Buffer.from(buf))
          }
        } catch (err) {
          res.statusCode = 502
          res.setHeader('Content-Type', 'text/plain')
          res.end(`Proxy error: ${err.message}`)
        }
      })
    },
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
