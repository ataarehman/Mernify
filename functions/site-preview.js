/**
 * Cloudflare Pages Function — GET/HEAD/OPTIONS /site-preview?url=
 * Same path as the Vite dev middleware, so production needs no VITE_PROXY_URL
 * when the site is deployed on Cloudflare Pages.
 */
import { handleSitePreview } from './_lib/preview.js'

export async function onRequest(context) {
  return handleSitePreview(context.request.url, { method: context.request.method })
}
