/**
 * Vercel serverless function: transparent site proxy.
 * Strips X-Frame-Options so any URL can be embedded in an iframe.
 * Route: GET /api/site-preview?url=<encoded_full_url>
 *
 * Same logic as the Vite dev middleware in vite.config.js.
 */
export default async function handler(req, res) {
  const targetUrl = req.query?.url
  if (!targetUrl) {
    res.status(400).send('Missing ?url= parameter')
    return
  }

  let parsed
  try {
    parsed = new URL(targetUrl)
  } catch {
    res.status(400).send('Invalid URL')
    return
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
    // Deliberately omit X-Frame-Options and frame-related CSP

    if (ct.includes('text/html')) {
      let html = await upstream.text()
      // Base tag ensures relative URLs resolve to the origin
      html = html.replace(/(<head[^>]*>)/i, `$1<base href="${origin}/">`)
      // Neutralise common JS frame-busting checks (best-effort)
      html = html.replace(/top\s*!==?\s*(?:self|window)/g, 'false')
      html = html.replace(/self\s*!==?\s*top/g, 'false')
      res.send(html)
    } else {
      const buf = await upstream.arrayBuffer()
      res.send(Buffer.from(buf))
    }
  } catch (err) {
    res.status(502).send(`Proxy error: ${err.message}`)
  }
}
