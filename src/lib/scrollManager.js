/**
 * Production-safe document scroll reset.
 * Prefer Lenis when present; always force native scroll to 0 without smooth animation.
 */
export function disableBrowserScrollRestoration() {
  if (typeof window === 'undefined') return
  try {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  } catch {
    // ignore
  }
}

export function scrollDocumentToTop(lenisRef) {
  if (typeof window === 'undefined') return

  disableBrowserScrollRestoration()

  const instance = lenisRef?.current
  if (instance && typeof instance.scrollTo === 'function') {
    try {
      instance.scrollTo(0, { immediate: true, force: true })
    } catch {
      // fall through to native
    }
  }

  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

let refreshTimer = 0
let refreshRaf = 0
let refreshQueued = false

/**
 * Recalculate ScrollTrigger after layout / entrance settles.
 * Coalesces bursty callers (hero + sections) into one refresh cycle.
 */
export function refreshScrollTriggers(ScrollTrigger, { afterMs = 120 } = {}) {
  if (!ScrollTrigger || typeof window === 'undefined') return () => {}

  const run = () => {
    refreshQueued = false
    try {
      ScrollTrigger.refresh()
    } catch {
      // ignore
    }
  }

  if (!refreshQueued) {
    refreshQueued = true
    run()
  }

  window.clearTimeout(refreshTimer)
  cancelAnimationFrame(refreshRaf)

  refreshRaf = requestAnimationFrame(() => {
    requestAnimationFrame(run)
  })
  refreshTimer = window.setTimeout(run, afterMs)

  return () => {
    cancelAnimationFrame(refreshRaf)
    window.clearTimeout(refreshTimer)
  }
}
