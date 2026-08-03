/** Main marketing routes that play the entrance curtain. */
export const PAGE_ENTRANCE_COMPLETE_EVENT = 'mf:page-entrance-complete'

let entranceGeneration = 0
let entranceReady = true

export function shouldPlayPageEntrance(pathname) {
  if (pathname === '/') return true
  const exact = new Set([
    '/about',
    '/services',
    '/industries',
    '/case-studies',
    '/process',
    '/contact',
  ])
  if (exact.has(pathname)) return true
  if (pathname.startsWith('/services/')) return true
  if (pathname.startsWith('/case-studies/')) return true
  return false
}

/** Call when a route starts an entrance curtain so late subscribers wait. */
export function beginPageEntrance() {
  entranceGeneration += 1
  entranceReady = false
}

/** Notify listeners that the page entrance curtain finished (or was skipped). */
export function notifyPageEntranceComplete() {
  entranceReady = true
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(PAGE_ENTRANCE_COMPLETE_EVENT))
}

/**
 * Run `callback` after entrance completes.
 * Safe if the complete event already fired before this subscriber mounts.
 * Returns a cleanup function.
 */
export function whenPageEntranceReady(callback, { playEntrance = true, fallbackMs = 3200 } = {}) {
  if (typeof window === 'undefined') return () => {}

  let settled = false
  const run = () => {
    if (settled) return
    settled = true
    callback()
  }

  if (!playEntrance || entranceReady) {
    const id = requestAnimationFrame(() => requestAnimationFrame(run))
    return () => {
      settled = true
      cancelAnimationFrame(id)
    }
  }

  const gen = entranceGeneration
  const onReady = () => {
    if (gen !== entranceGeneration && !entranceReady) return
    run()
  }

  window.addEventListener(PAGE_ENTRANCE_COMPLETE_EVENT, onReady, { once: true })
  const timer = window.setTimeout(run, fallbackMs)

  return () => {
    settled = true
    window.removeEventListener(PAGE_ENTRANCE_COMPLETE_EVENT, onReady)
    window.clearTimeout(timer)
  }
}
