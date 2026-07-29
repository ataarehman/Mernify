/**
 * Production server for custom remote deployments.
 * - Serves the Vite build from dist/
 * - Proxies /api/site-preview so iframes can load any site
 * - SPA fallback: all other routes return index.html
 *
 * Usage on your server:
 *   npm run build
 *   npm start            (or: pm2 start server.js --name mernify)
 *
 * Set PORT env var to change from the default 3000.
 */

import express from 'express'
import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000
const DIST = path.join(__dirname, 'dist')

// ── Proxy endpoint ────────────────────────────────────────────────────────────
app.get('/api/site-preview', async (req, res) => {
  const targetUrl = req.query.url
  if (!targetUrl) return res.status(400).send('Missing ?url= parameter')

  let parsed
  try {
    parsed = new URL(targetUrl)
  } catch {
    return res.status(400).send('Invalid URL')
  }

  try {
    const origin = parsed.origin
    const upstream = await fetch(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    })

    res.status(upstream.status)
    const ct = upstream.headers.get('content-type') || 'text/html'
    res.setHeader('Content-Type', ct)
    // Deliberately omit X-Frame-Options and CSP frame-ancestors

    if (ct.includes('text/html')) {
      let html = await upstream.text()
      // Inject base tag so relative URLs (images, CSS, JS) resolve to real domain
      html = html.replace(/(<head[^>]*>)/i, `$1<base href="${origin}/">`)
      // Neutralise JS frame-busting (best-effort)
      html = html.replace(/top\s*!==?\s*(?:self|window)/g, 'false')
      html = html.replace(/self\s*!==?\s*top/g, 'false')
      return res.send(html)
    }

    const buf = await upstream.arrayBuffer()
    return res.send(Buffer.from(buf))
  } catch (err) {
    return res.status(502).send(`Proxy error: ${err.message}`)
  }
})

// ── Static files from dist/ ───────────────────────────────────────────────────
app.use(express.static(DIST))

// ── SPA fallback ──────────────────────────────────────────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(DIST, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Mernify running on http://localhost:${PORT}`)
})
