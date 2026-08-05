import { useEffect, useRef, useState } from 'react'
import { canUseWebGLRipples, createWebGLRipples } from '@/lib/webglRipples'
import { whenPageEntranceReady } from '@/components/motion/pageEntrance'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HeroRipple.module.css'

const IMAGE_URL = '/assets/images/shapes/banner-shape.webp'

/**
 * Hero background with the same mouse-following WebGL liquid ripples
 * used by mernify-web (`ripple-2.js` + `.ripple-image`).
 *
 * Important: the static image (and CSS background) stay visible until WebGL
 * has painted a real frame — otherwise first load can flash a plain black hero
 * when IntersectionObserver pauses the RAF loop before the first paint.
 */
export function HeroRipple({ interactiveRef }) {
  const layerRef = useRef(null)
  const engineRef = useRef(null)
  const ioArmedRef = useRef(false)
  const { prefersReducedMotion } = useReducedMotion()
  const [webglReady, setWebglReady] = useState(false)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer || prefersReducedMotion) return undefined

    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer || !canUseWebGLRipples()) return undefined

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resolution = dpr > 1.5 ? 320 : 400

    let engine = null
    let cancelled = false
    ioArmedRef.current = false

    try {
      engine = createWebGLRipples(layer, {
        imageUrl: IMAGE_URL,
        resolution,
        perturbance: 0.03,
        interactiveEl: interactiveRef?.current || layer.parentElement || layer,
        onReady: () => {
          if (cancelled) return
          // Hide the static img only after a real frame was painted.
          setWebglReady(true)
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

    const kick = () => {
      if (cancelled || !engine) return
      engine.setRunning(true)
      try {
        engine.resize?.()
        engine.paintOnce?.()
      } catch {
        // ignore
      }
    }

    // Keep running through the entrance curtain; IO must not pause yet.
    kick()

    const onEntrance = () => {
      kick()
      // Arm IO only after entrance so a false-negative observation during
      // overflow:hidden / curtain never blanks the hero on first paint.
      ioArmedRef.current = true
      requestAnimationFrame(() => {
        kick()
        window.setTimeout(kick, 120)
      })
    }

    const cleanupReady = whenPageEntranceReady(onEntrance)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!engine || cancelled) return
        // Until armed, always stay running so first load never goes black.
        if (!ioArmedRef.current) {
          engine.setRunning(true)
          return
        }
        engine.setRunning(Boolean(entry?.isIntersecting))
      },
      { rootMargin: '20% 0px', threshold: 0 },
    )
    io.observe(layer)

    const onResize = () => kick()
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelled = true
      ioArmedRef.current = false
      cleanupReady()
      window.removeEventListener('resize', onResize)
      io.disconnect()
      engine.destroy()
      engineRef.current = null
      setWebglReady(false)
    }
  }, [interactiveRef, prefersReducedMotion])

  return (
    <div
      ref={layerRef}
      className={styles.ripple}
      aria-hidden="true"
      style={{ backgroundImage: `url(${IMAGE_URL})` }}
    >
      <img
        src={IMAGE_URL}
        alt=""
        className={webglReady ? styles.fallbackHidden : styles.fallback}
        width={1920}
        height={934}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  )
}
