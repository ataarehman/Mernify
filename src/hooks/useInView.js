import { useEffect, useState } from 'react'

/**
 * Track whether an element is near/in the viewport.
 * Used to pause expensive loops (WebGL, marquees, autoplay) when offscreen.
 */
export function useInView(ref, { rootMargin = '20% 0px', threshold = 0 } = {}) {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref?.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting))
      },
      { rootMargin, threshold },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin, threshold])

  return inView
}
