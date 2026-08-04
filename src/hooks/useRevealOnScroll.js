import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { whenPageEntranceReady } from '@/components/motion/pageEntrance'
import { useReducedMotion } from '@/app/providers/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function getRevealOffsets(el, { y, isLight }) {
  const lightX = 52
  const fullX = 100

  if (el.hasAttribute('data-fade-right')) {
    return { autoAlpha: 0, x: isLight ? -lightX : -fullX, y: 0 }
  }
  if (el.hasAttribute('data-fade-left')) {
    return { autoAlpha: 0, x: isLight ? lightX : fullX, y: 0 }
  }

  return { autoAlpha: 0, x: 0, y: isLight ? Math.min(y, 22) : y }
}

/**
 * AOS-style per-element fade/slide reveals.
 * Supports:
 * - `data-fade-up` (default vertical)
 * - `data-fade-left` / `data-fade-right` (horizontal slide, matching template AOS)
 * - `data-delay` in milliseconds (e.g. data-delay="200")
 * - `data-duration` in milliseconds (optional per-element override)
 *
 * Uses lighter motion on coarse / narrow viewports for smoother scroll.
 * Binds after page entrance so ScrollTrigger measures a stable layout.
 */
export function useRevealOnScroll(
  scopeRef,
  {
    selector = '[data-fade-up]',
    start = 'top 88%',
    y = 40,
    duration = 0.9,
    once = true,
    ease = 'power3.out',
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
      gsap.set(targets, { clearProps: 'opacity,visibility,transform', autoAlpha: 1, x: 0, y: 0 })
      return undefined
    }

    let ctx

    const cleanupReady = whenPageEntranceReady(() => {
      const isLight =
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(max-width: 900px)').matches

      const motionDuration = isLight ? Math.min(duration, 0.85) : duration
      const triggerStart = isLight ? 'top 92%' : start

      ctx = gsap.context(() => {
        targets.forEach((el) => {
          const delayMs = Number(el.getAttribute('data-delay') || 0)
          const durationMs = Number(el.getAttribute('data-duration') || 0)
          const from = getRevealOffsets(el, { y, isLight })
          const itemDuration =
            Number.isFinite(durationMs) && durationMs > 0
              ? (isLight ? Math.min(durationMs, 1200) : durationMs) / 1000
              : motionDuration
          const enterDelay = Number.isFinite(delayMs) ? delayMs / 1000 : 0

          gsap.set(el, from)

          const tween = gsap.fromTo(el, from, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: itemDuration,
            ease,
            force3D: true,
            paused: true,
            immediateRender: false,
            overwrite: 'auto',
          })

          const st = ScrollTrigger.create({
            trigger: el,
            start: triggerStart,
            once,
            invalidateOnRefresh: true,
            onEnter: () => {
              tween.delay(enterDelay).restart(true)
            },
            onEnterBack: () => {
              if (once) return
              tween.delay(enterDelay).restart(true)
            },
            onLeave: () => {
              if (once) return
              tween.delay(0).reverse()
            },
            onLeaveBack: () => {
              if (once) return
              tween.delay(0).reverse()
            },
          })

          // If already past start (e.g. after filter remount), play immediately.
          if (st.isActive || st.progress > 0 || el.getBoundingClientRect().top < window.innerHeight * 0.92) {
            tween.delay(enterDelay).restart(true)
          }
        })

        ScrollTrigger.refresh()
      }, scope)
    })

    return () => {
      cleanupReady()
      ctx?.revert()
    }
  }, [
    scopeRef,
    selector,
    start,
    y,
    duration,
    once,
    ease,
    prefersReducedMotion,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ])
}
