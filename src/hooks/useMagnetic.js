import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/app/providers/useReducedMotion'

/**
 * Soft magnetic pull toward pointer. Disabled for reduced motion / coarse pointers.
 */
export function useMagnetic(strength = 0.35, radius = 80) {
  const ref = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion) return undefined

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!finePointer) return undefined

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = event.clientX - cx
      const dy = event.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist > radius) {
        xTo(0)
        yTo(0)
        return
      }
      xTo(dx * strength)
      yTo(dy * strength)
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    window.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [prefersReducedMotion, radius, strength])

  return ref
}
