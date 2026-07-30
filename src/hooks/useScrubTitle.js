import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/app/providers/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Template `.tw-itm-title.tw-itm-anim` scrub: chars rise from dimmed → full.
 * Expects [data-scrub-char] children inside the title element.
 * On coarse pointers / narrow screens uses a one-shot fade instead of scrub
 * to avoid ScrollTrigger jank while scrolling.
 */
export function useScrubTitle(titleRef, {
  start = 'top 92%',
  end = 'top 60%',
  scrub = 0.55,
} = {}) {
  const { prefersReducedMotion } = useReducedMotion()

  useLayoutEffect(() => {
    const title = titleRef.current
    if (!title) return undefined

    const chars = title.querySelectorAll('[data-scrub-char]')
    if (!chars.length) return undefined

    if (prefersReducedMotion) {
      gsap.set(chars, { opacity: 1, x: 0 })
      return undefined
    }

    const light =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(max-width: 900px)').matches

    const ctx = gsap.context(() => {
      if (light) {
        gsap.fromTo(
          chars,
          { opacity: 0.35, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.55,
            stagger: 0.012,
            scrollTrigger: {
              trigger: title,
              start: 'top 90%',
              once: true,
            },
          },
        )
        return
      }

      gsap.fromTo(
        chars,
        { opacity: 0.3, x: -7 },
        {
          opacity: 1,
          x: 0,
          ease: 'none',
          stagger: 0.02,
          scrollTrigger: {
            trigger: title,
            start,
            end,
            scrub,
          },
        },
      )
    }, title)

    return () => ctx.revert()
  }, [titleRef, start, end, scrub, prefersReducedMotion])
}

/** Split a string into scrub-char spans for useScrubTitle. */
export function splitScrubChars(text) {
  return String(text).split('').map((char, index) => ({
    key: `${index}-${char}`,
    char: char === ' ' ? '\u00A0' : char,
  }))
}
