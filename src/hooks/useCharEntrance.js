import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { splitScrubChars } from '@/hooks/useScrubTitle'

gsap.registerPlugin(ScrollTrigger)

/**
 * Template `.tw-char-animation`: chars slide in from the right on enter.
 */
export function useCharEntrance(titleRef, {
  start = 'top 90%',
  x = 100,
  duration = 1,
  stagger = 0.05,
  delay = 0.35,
  minWidth = 577,
  deps = [],
} = {}) {
  const { prefersReducedMotion } = useReducedMotion()

  useLayoutEffect(() => {
    const title = titleRef.current
    if (!title) return undefined

    const chars = title.querySelectorAll('[data-char]')
    if (!chars.length) return undefined

    if (prefersReducedMotion || window.innerWidth < minWidth) {
      gsap.set(chars, { autoAlpha: 1, x: 0 })
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.set(title, { perspective: 300 })
      gsap.fromTo(
        chars,
        { x, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: title,
            start,
            once: true,
          },
        },
      )
    }, title)

    return () => ctx.revert()
  }, [
    titleRef,
    start,
    x,
    duration,
    stagger,
    delay,
    minWidth,
    prefersReducedMotion,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ])
}

export function splitChars(text) {
  return splitScrubChars(text)
}
