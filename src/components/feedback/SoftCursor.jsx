import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './SoftCursor.module.css'

/**
 * Desktop-only soft cursor accent. Never required for usability.
 */
export function SoftCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return undefined
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return undefined

    document.documentElement.classList.add('mf-soft-cursor')

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.16, ease: 'power3.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.16, ease: 'power3.out' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (event) => {
      xDot(event.clientX)
      yDot(event.clientY)
      xRing(event.clientX)
      yRing(event.clientY)
    }

    const onOver = (event) => {
      const interactive = event.target.closest('a, button, [data-cursor="interactive"]')
      document.documentElement.classList.toggle('mf-cursor-active', Boolean(interactive))
    }

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onOver)

    return () => {
      document.documentElement.classList.remove('mf-soft-cursor', 'mf-cursor-active')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div className={styles.root} aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </div>
  )
}
