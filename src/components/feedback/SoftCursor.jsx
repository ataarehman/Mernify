import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './SoftCursor.module.css'

/**
 * Desktop soft cursor — expands with optional label (e.g. data-cursor="View").
 */
export function SoftCursor() {
  const rootRef = useRef(null)
  const ringRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (prefersReducedMotion) return undefined
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return undefined

    const root = rootRef.current
    const ring = ringRef.current
    if (!root || !ring) return undefined

    document.documentElement.classList.add('mf-soft-cursor')

    const xTo = gsap.quickTo(root, 'x', { duration: 0.28, ease: 'power3.out' })
    const yTo = gsap.quickTo(root, 'y', { duration: 0.28, ease: 'power3.out' })

    const onMove = (event) => {
      xTo(event.clientX)
      yTo(event.clientY)
    }

    const onOver = (event) => {
      const target = event.target.closest('[data-cursor], a, button')
      const cursorValue = target?.getAttribute?.('data-cursor')
      const isView = cursorValue && cursorValue !== 'interactive'
      const interactive = Boolean(target)

      setLabel(isView ? cursorValue : '')
      document.documentElement.classList.toggle('mf-cursor-active', interactive)
      document.documentElement.classList.toggle('mf-cursor-view', Boolean(isView))
    }

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onOver)

    return () => {
      document.documentElement.classList.remove(
        'mf-soft-cursor',
        'mf-cursor-active',
        'mf-cursor-view',
      )
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <div ref={ringRef} className={styles.ring}>
        {label ? (
          <span className={styles.label}>
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
            {label}
          </span>
        ) : null}
      </div>
    </div>
  )
}
