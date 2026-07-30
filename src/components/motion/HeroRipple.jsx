import { useEffect, useRef, useState } from 'react'
import { canUseWebGLRipples, createWebGLRipples } from '@/lib/webglRipples'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HeroRipple.module.css'

const IMAGE_URL = '/assets/images/shapes/banner-shape.png'

/**
 * Hero background with the same mouse-following WebGL liquid ripples
 * used by mernify-web (`ripple-2.js` + `.ripple-image`).
 * Pauses the RAF loop when the hero leaves the viewport.
 */
export function HeroRipple({ interactiveRef }) {
  const layerRef = useRef(null)
  const engineRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const [webglReady, setWebglReady] = useState(false)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer || prefersReducedMotion) return undefined

    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer || !canUseWebGLRipples()) return undefined

    // Slightly lower resolution on mid/high DPR to keep scroll smooth.
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resolution = dpr > 1.5 ? 320 : 400

    let engine = null
    let cancelled = false
    try {
      engine = createWebGLRipples(layer, {
        imageUrl: IMAGE_URL,
        resolution,
        perturbance: 0.03,
        interactiveEl: interactiveRef?.current || layer.parentElement || layer,
        onReady: () => {
          if (!cancelled) setWebglReady(true)
        },
        onError: () => {
          if (!cancelled) setWebglReady(false)
        },
      })
    } catch {
      engine = null
    }

    if (!engine) return undefined

    engineRef.current = engine

    const io = new IntersectionObserver(
      ([entry]) => {
        engine.setRunning(Boolean(entry?.isIntersecting))
      },
      { rootMargin: '12% 0px', threshold: 0 },
    )
    io.observe(layer)

    return () => {
      cancelled = true
      io.disconnect()
      engine.destroy()
      engineRef.current = null
      setWebglReady(false)
    }
  }, [interactiveRef, prefersReducedMotion])

  return (
    <div ref={layerRef} className={styles.ripple} aria-hidden="true">
      <img
        src={IMAGE_URL}
        alt=""
        className={webglReady ? styles.fallbackHidden : styles.fallback}
        decoding="async"
      />
    </div>
  )
}
