import { useEffect, useMemo, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'
import { MotionContext } from './motionContext'

gsap.registerPlugin(ScrollTrigger)

export function MotionProvider({ children }) {
  const { prefersReducedMotion } = useReducedMotion()
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      ScrollTrigger.refresh()
      return undefined
    }

    // Skip smooth scroll on touch / coarse pointers (audit PF-005 / A11Y-006)
    const coarse =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches
    if (coarse) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      ScrollTrigger.refresh()
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.2,
      // Slightly softer sync keeps wheel + ST updates feeling less sticky.
      syncTouch: false,
    })

    lenisRef.current = lenis
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    // Allow GSAP to recover after long frames instead of compounding jank.
    gsap.ticker.lagSmoothing(500)

    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [prefersReducedMotion])

  const value = useMemo(
    () => ({
      lenis: lenisRef,
      scrollTo: (target, options = {}) => {
        const lenis = lenisRef.current
        if (!lenis || prefersReducedMotion) {
          if (typeof target === 'string') {
            document.querySelector(target)?.scrollIntoView()
          }
          return
        }

        lenis.scrollTo(target, {
          offset: options.offset ?? -84,
          duration: options.duration ?? 1.1,
          ...options,
        })
      },
    }),
    [prefersReducedMotion],
  )

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}
