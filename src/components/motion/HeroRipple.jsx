import { useEffect, useRef, useState } from 'react'
import { canUseWebGLRipples, createWebGLRipples } from '@/lib/webglRipples'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HeroRipple.module.css'

const IMAGE_URL = '/assets/images/shapes/banner-shape.png'

/**
 * Hero background with the same mouse-following WebGL liquid ripples
 * used by mernify-web (`ripple-2.js` + `.ripple-image`).
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

    let engine = null
    let cancelled = false
    try {
      engine = createWebGLRipples(layer, {
        imageUrl: IMAGE_URL,
        resolution: 400,
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

    return () => {
      cancelled = true
      engine.destroy()
      engineRef.current = null
      setWebglReady(false)
    }
  }, [interactiveRef, prefersReducedMotion])

  return (
    <div ref={layerRef} className={styles.ripple} aria-hidden="true">
      {/* Static fallback — hidden once WebGL canvas paints successfully */}
      <img
        src={IMAGE_URL}
        alt=""
        className={webglReady ? styles.fallbackHidden : styles.fallback}
        decoding="async"
      />
    </div>
  )
}
