import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/app/providers/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * AOS-like fade-up for a list of elements inside a scope.
 */
export function useFadeUp(scopeRef, {
  selector = '[data-fade-up]',
  start = 'top 85%',
  y = 36,
  stagger = 0.1,
  duration = 0.85,
  once = true,
} = {}) {
  const { prefersReducedMotion } = useReducedMotion()

  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const targets = scope.querySelectorAll(selector)
    if (!targets.length) return undefined

    if (prefersReducedMotion) {
      gsap.set(targets, { autoAlpha: 1, y: 0 })
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: scope,
            start,
            once,
          },
        },
      )
    }, scope)

    return () => ctx.revert()
  }, [
    scopeRef,
    selector,
    start,
    y,
    stagger,
    duration,
    once,
    prefersReducedMotion,
  ])
}
