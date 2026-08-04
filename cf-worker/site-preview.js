/**
 * Cloudflare Worker — site preview proxy (standalone deploy)
 *
 * Prefer Cloudflare Pages Function at /site-preview (functions/site-preview.js)
 * so the portfolio works with zero VITE_PROXY_URL. Use this Worker only when
 * the static site is hosted somewhere that cannot run Pages Functions.
 *
 * Deploy:
 * 1. dash.cloudflare.com → Workers → Create → paste this file
 * 2. Set VITE_PROXY_URL=https://mernify-preview.<subdomain>.workers.dev
 * 3. Rebuild the site
 */

const ALLOWED_HOSTS = new Set([
  'tailorize.sa',
  'www.tailorize.sa',
  'servloom.com',
  'www.servloom.com',
  'godiva.com',
  'www.godiva.com',
  'goodbooksplus.com',
  'www.goodbooksplus.com',
  'medbillultra.com',
  'www.medbillultra.com',
  'metroelectric.com.au',
  'www.metroelectric.com.au',
  'spaceworx.us',
  'www.spaceworx.us',
  'mrzzm.mountsol.dev',
  'kinepolis.be',
  'www.kinepolis.be',
  'marmot.com',
  'www.marmot.com',
  'pathe.be',
  'www.pathe.be',
  'trendyol.com',
  'www.trendyol.com',
])

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() })
    }

    const url = new URL(request.url)
    const targetUrl = url.searchParams.get('url')
    if (!targetUrl) {
      return new Response('Missing ?url= parameter', { status: 400, headers: corsHeaders() })
    }

    let targetOrigin
    let host
    try {
      const parsed = new URL(targetUrl)
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        return new Response('Only http(s) URLs are allowed', { status: 400, headers: corsHeaders() })
      }
      targetOrigin = parsed.origin
      host = parsed.hostname.toLowerCase()
    } catch {
      return new Response('Invalid URL', { status: 400, headers: corsHeaders() })
    }

    if (!ALLOWED_HOSTS.has(host)) {
      return new Response('Host not allowlisted for preview', { status: 403, headers: corsHeaders() })
    }

    if (url.searchParams.get('probe') === '1') {
      return new Response(JSON.stringify({ ok: true, origin: targetOrigin }), {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders() },
      })
    }

    if (request.method === 'HEAD') {
      return new Response(null, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8', ...corsHeaders() },
      })
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
    }

    if (ct.includes('text/html')) {
      let html = await upstream.text()
      if (/<head[^>]*>/i.test(html)) {
        html = html.replace(/(<head[^>]*>)/i, `$1<base href="${targetOrigin}/">`)
      } else {
        html = `<head><base href="${targetOrigin}/"></head>${html}`
      }
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
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Expose-Headers': 'X-Mernify-Preview',
    'Cache-Control': 'public, max-age=300',
    'X-Mernify-Preview': '1',
  }
}
