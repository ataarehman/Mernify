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

/**
 * Recalculate ScrollTrigger after layout / entrance settles.
 * Double rAF + short timeout covers fonts, images, and Lenis attach.
 */
export function refreshScrollTriggers(ScrollTrigger, { afterMs = 120 } = {}) {
  if (!ScrollTrigger || typeof window === 'undefined') return () => {}

  const run = () => {
    try {
      ScrollTrigger.refresh()
    } catch {
      // ignore
    }
  }

  run()
  const raf = requestAnimationFrame(() => {
    requestAnimationFrame(run)
  })
  const timer = window.setTimeout(run, afterMs)

  return () => {
    cancelAnimationFrame(raf)
    window.clearTimeout(timer)
  }
}
