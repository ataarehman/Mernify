import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/app/providers/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Section timeline helper — gsap.context + cleanup.
 * Pass build(timeline, context) to create animations.
 */
export function useSectionTimeline(scopeRef, build, deps = []) {
  const { prefersReducedMotion } = useReducedMotion()

  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope || typeof build !== 'function') return undefined

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        build(null, { reduced: true, gsap, ScrollTrigger })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      build(tl, { reduced: false, gsap, ScrollTrigger })
    }, scope)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps provided by caller
  }, [scopeRef, prefersReducedMotion, ...deps])
}
