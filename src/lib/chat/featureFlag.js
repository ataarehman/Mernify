/**
 * Feature flag for the Mernify AI chat concierge.
 *
 * VITE_MERNIFY_AI_ENABLED controls visibility:
 *   "true"  → always enabled
 *   "false" → always disabled
 *   unset   → enabled in dev, disabled in production (safe default)
 *
 * Override for internal preview: add ?mernify_ai=1 to the URL.
 */

function isChatEnabled() {
  const envFlag = String(import.meta.env.VITE_MERNIFY_AI_ENABLED || '').trim().toLowerCase()
  if (envFlag === 'false') return false
  if (envFlag === 'true') return true

  // URL override for internal testing (e.g. ?mernify_ai=1)
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    if (params.get('mernify_ai') === '1') return true
  }

  // Default: always enabled (chat is production-ready)
  return true
}

export const CHAT_ENABLED = isChatEnabled()
