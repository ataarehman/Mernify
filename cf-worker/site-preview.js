/**
 * Cloudflare Worker — site preview proxy
 *
 * Fetches any URL server-side, strips X-Frame-Options and CSP
 * frame-ancestors so the response can be embedded in an iframe.
 *
 * ── Deploy in 2 minutes ──────────────────────────────────────────────
 * 1. Go to https://dash.cloudflare.com  →  Workers & Pages  →  Create
 * 2. Choose "Hello World" starter, name it e.g. "mernify-preview"
 * 3. Click "Edit code", paste the entire content of this file, Save & Deploy
 * 4. Copy the worker URL: https://mernify-preview.<your-subdomain>.workers.dev
 * 5. In your site root create .env.production:
 *      VITE_PROXY_URL=https://mernify-preview.<your-subdomain>.workers.dev
 * 6. Rebuild and redeploy your site.  Done.
 *
 * Free tier: 100,000 requests / day — more than enough for a portfolio.
 */

export default {
  async fetch(request) {
    const url = new URL(request.url)

    // Allow browser pre-flight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(),
      })
    }

    const targetUrl = url.searchParams.get('url')
    if (!targetUrl) {
      return new Response('Missing ?url= parameter', { status: 400, headers: corsHeaders() })
    }

    let targetOrigin
    try {
      targetOrigin = new URL(targetUrl).origin
    } catch {
      return new Response('Invalid URL', { status: 400, headers: corsHeaders() })
    }

    let upstream
    try {
      upstream = await fetch(targetUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        redirect: 'follow',
      })
    } catch (err) {
      return new Response(`Upstream fetch failed: ${err.message}`, {
        status: 502,
        headers: corsHeaders(),
      })
    }

    const ct = upstream.headers.get('content-type') || 'text/html'
    const headers = {
      'Content-Type': ct,
      ...corsHeaders(),
      // Deliberately omit X-Frame-Options and CSP frame-ancestors
    }

    if (ct.includes('text/html')) {
      let html = await upstream.text()
      // Inject base tag so relative URLs (images, CSS, JS) still resolve correctly
      html = html.replace(/(<head[^>]*>)/i, `$1<base href="${targetOrigin}/">`)
      // Neutralise common JS frame-busting patterns (best-effort)
      html = html.replace(/top\s*!==?\s*(?:self|window)/g, 'false')
      html = html.replace(/self\s*!==?\s*top/g, 'false')
      return new Response(html, { status: upstream.status, headers })
    }

    const buf = await upstream.arrayBuffer()
    return new Response(buf, { status: upstream.status, headers })
  },
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
