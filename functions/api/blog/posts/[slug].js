import { pagesBlogOnRequest } from '../../../_lib/blogHttp.js'

/** GET /api/blog/posts/:slug — published, or draft with ?token= */
export const onRequest = pagesBlogOnRequest
