/**
 * Blog media upload — R2 (production). Local disk writes are opt-in via `localWriter`.
 * Limits: 5MB; image/webp|jpeg|png only.
 */

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024
export const ALLOWED_TYPES = new Set(['image/webp', 'image/jpeg', 'image/png'])

const EXT_BY_TYPE = {
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
  'image/png': 'png',
}

/**
 * @param {File|Blob} file
 * @returns {{ error?: string, status?: number }}
 */
export function validateUploadFile(file) {
  if (!file) return { error: 'file is required', status: 400 }
  const type = file.type || ''
  if (!ALLOWED_TYPES.has(type)) {
    return { error: 'Only webp, jpeg, and png images are allowed', status: 400 }
  }
  if (typeof file.size === 'number' && file.size > MAX_UPLOAD_BYTES) {
    return { error: 'File exceeds 5MB limit', status: 400 }
  }
  return {}
}

function yyyyMm() {
  const d = new Date()
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  return `${y}/${m}`
}

/**
 * @param {object} opts
 * @param {File|Blob} opts.file
 * @param {Record<string, any>} opts.env
 * @param {{ insertMedia?: Function }} [opts.store]
 * @param {string} [opts.alt]
 * @param {string} [opts.postId]
 * @param {(args: { key: string, buffer: Uint8Array, contentType: string, id: string, ext: string }) => Promise<string>} [opts.localWriter]
 *   Returns public URL for local uploads when BLOG_MEDIA is absent.
 */
export async function uploadBlogMedia({ file, env, store, alt, postId, localWriter }) {
  const check = validateUploadFile(file)
  if (check.error) {
    const err = new Error(check.error)
    err.status = check.status
    throw err
  }

  const ext = EXT_BY_TYPE[file.type] || 'bin'
  const id = crypto.randomUUID()
  const key = `blog/_uploads/${yyyyMm()}/${id}.${ext}`
  const buffer = new Uint8Array(await file.arrayBuffer())
  if (buffer.byteLength > MAX_UPLOAD_BYTES) {
    const err = new Error('File exceeds 5MB limit')
    err.status = 400
    throw err
  }

  const bucket = env?.BLOG_MEDIA
  let publicUrl

  if (bucket && typeof bucket.put === 'function') {
    await bucket.put(key, buffer, {
      httpMetadata: { contentType: file.type },
    })
    const base = String(env.MEDIA_PUBLIC_BASE || '').replace(/\/$/, '')
    publicUrl = base ? `${base}/${key}` : `/${key}`
  } else if (typeof localWriter === 'function') {
    publicUrl = await localWriter({ key, buffer, contentType: file.type, id, ext })
  } else {
    const err = new Error('Media storage is not configured (BLOG_MEDIA)')
    err.status = 503
    throw err
  }

  const record = {
    id,
    r2Key: key,
    publicUrl,
    contentType: file.type,
    bytes: buffer.byteLength,
    alt: alt || null,
    postId: postId || null,
  }

  if (store?.insertMedia) {
    await store.insertMedia(record)
  }

  return {
    id,
    url: publicUrl,
    key,
    contentType: file.type,
    bytes: record.bytes,
  }
}
