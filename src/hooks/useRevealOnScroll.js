import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/app/providers/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * AOS-style per-element fade/slide reveals.
 * Supports `data-delay` in milliseconds (e.g. data-delay="200").
 */
export function useRevealOnScroll(
  scopeRef,
  {
    selector = '[data-fade-up]',
    start = 'top 88%',
    y = 40,
    duration = 0.9,
    once = true,
    deps = [],
  } = {},
) {
  const { prefersReducedMotion } = useReducedMotion()

  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const targets = Array.from(scope.querySelectorAll(selector))
    if (!targets.length) return undefined

    if (prefersReducedMotion) {
      gsap.set(targets, { autoAlpha: 1, y: 0 })
      return undefined
    }

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        const delayMs = Number(el.getAttribute('data-delay') || 0)
        gsap.fromTo(
          el,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            delay: Number.isFinite(delayMs) ? delayMs / 1000 : 0,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start,
              once,
            },
          },
        )
      })
    }, scope)

    return () => ctx.revert()
  }, [
    scopeRef,
    selector,
    start,
    y,
    duration,
    once,
    prefersReducedMotion,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ])
}
