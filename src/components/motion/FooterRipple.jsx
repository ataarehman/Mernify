import { useEffect, useRef, useState } from 'react'
import { canUseWebGLRipples, createWebGLRipples } from '@/lib/webglRipples'
import { FOOTER_GALAXY_URL } from '@/components/motion/FooterGalaxyBg'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './FooterRipple.module.css'

/**
 * Footer water/ripple layer — same WebGL engine as the hero, using the galaxy
 * texture and paused when the footer is off-screen.
 */
export function FooterRipple({ interactiveRef }) {
  const layerRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const [webglReady, setWebglReady] = useState(false)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer || prefersReducedMotion) return undefined

    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer || !canUseWebGLRipples()) return undefined

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resolution = dpr > 1.5 ? 220 : 260

    let engine = null
    let cancelled = false

    try {
      engine = createWebGLRipples(layer, {
        imageUrl: FOOTER_GALAXY_URL,
        resolution,
        perturbance: 0.022,
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

    const kick = () => {
      if (cancelled || !engine) return
      try {
        engine.resize?.()
        engine.paintOnce?.()
      } catch {
        // ignore
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!engine || cancelled) return
        const visible = Boolean(entry?.isIntersecting)
        engine.setRunning(visible)
        if (visible) kick()
      },
      { rootMargin: '15% 0px', threshold: 0 },
    )
    io.observe(layer)

    const onResize = () => {
      if (engine) kick()
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      io.disconnect()
      engine.destroy()
      setWebglReady(false)
    }
  }, [interactiveRef, prefersReducedMotion])

  return (
    <div
      ref={layerRef}
      className={styles.ripple}
      aria-hidden="true"
      style={{ backgroundImage: `url(${FOOTER_GALAXY_URL})` }}
    >
      <img
        src={FOOTER_GALAXY_URL}
        alt=""
        className={webglReady ? styles.fallbackHidden : styles.fallback}
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
