/**
 * Shared site-preview proxy logic (Vite middleware + Cloudflare Pages Function).
 * Fetches an allowlisted URL and strips frame-blocking headers so it can render in an iframe.
 */

/** Hostnames permitted for case-study live previews (open-proxy protection). */
export const ALLOWED_HOSTS = new Set([
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

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Expose-Headers': 'X-Mernify-Preview',
    'Cache-Control': 'public, max-age=300',
    'X-Mernify-Preview': '1',
  }
}

export function parseTargetUrl(requestUrl) {
  const targetUrl = new URL(requestUrl).searchParams.get('url')
  if (!targetUrl) return { error: 'Missing ?url= parameter', status: 400 }
  let parsed
  try {
    parsed = new URL(targetUrl)
  } catch {
    return { error: 'Invalid URL', status: 400 }
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { error: 'Only http(s) URLs are allowed', status: 400 }
  }
  const host = parsed.hostname.toLowerCase()
  if (!ALLOWED_HOSTS.has(host)) {
    return { error: 'Host not allowlisted for preview', status: 403 }
  }
  return { targetUrl: parsed.toString(), targetOrigin: parsed.origin }
}

function rewriteHtml(html, targetOrigin) {
  let out = html
  if (/<head[^>]*>/i.test(out)) {
    out = out.replace(/(<head[^>]*>)/i, `$1<base href="${targetOrigin}/">`)
  } else {
    out = `<head><base href="${targetOrigin}/"></head>${out}`
  }
  // Best-effort neutralize common frame-busting checks
  out = out.replace(/top\s*!==?\s*(?:self|window)/g, 'false')
  out = out.replace(/self\s*!==?\s*top/g, 'false')
  return out
}

/**
 * @param {string} requestUrl - full request URL including ?url=
 * @param {{ method?: string }} [opts]
 * @returns {Promise<Response>}
 */
export async function handleSitePreview(requestUrl, opts = {}) {
  const method = (opts.method || 'GET').toUpperCase()

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() })
  }

  const request = new URL(requestUrl)
  const parsed = parseTargetUrl(requestUrl)
  if (parsed.error) {
    return new Response(parsed.error, {
      status: parsed.status,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', ...corsHeaders() },
    })
  }

  // Lightweight health check used by the case-study page (avoids downloading full HTML twice)
  if (request.searchParams.get('probe') === '1') {
    return new Response(JSON.stringify({ ok: true, origin: parsed.targetOrigin }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...corsHeaders(),
      },
    })
  }

  if (method === 'HEAD') {
    return new Response(null, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...corsHeaders(),
      },
    })
  }

  let upstream
  try {
    upstream = await fetch(parsed.targetUrl, {
      headers: {
        'User-Agent': BROWSER_UA,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    })
  } catch (err) {
    return new Response(`Upstream fetch failed: ${err.message}`, {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', ...corsHeaders() },
    })
  }

  const ct = upstream.headers.get('content-type') || 'text/html; charset=utf-8'
  const headers = {
    'Content-Type': ct,
    ...corsHeaders(),
    // Deliberately omit upstream X-Frame-Options / CSP frame-ancestors
  }

  if (ct.includes('text/html')) {
    const html = rewriteHtml(await upstream.text(), parsed.targetOrigin)
    return new Response(html, { status: upstream.status, headers })
  }

  const buf = await upstream.arrayBuffer()
  return new Response(buf, { status: upstream.status, headers })
}
