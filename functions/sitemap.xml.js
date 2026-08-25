import { pagesBlogOnRequest } from './_lib/blogHttp.js'

/**
 * GET /sitemap.xml — static marketing paths + published blog posts.
 * Note: remove/rename public/sitemap.xml so this Function wins on Pages.
 */
export const onRequest = pagesBlogOnRequest
