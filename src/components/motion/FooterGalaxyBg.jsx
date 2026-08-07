import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './FooterGalaxyBg.module.css'

export const FOOTER_GALAXY_URL = '/assets/images/shapes/footer-galaxy.webp'

const FOOTER_GALAXY_SRCSET = [
  '/assets/images/shapes/footer-galaxy-1280.webp 1280w',
  '/assets/images/shapes/footer-galaxy.webp 1920w',
  '/assets/images/shapes/footer-galaxy-2400.webp 2400w',
].join(', ')

/**
 * Premium galaxy backdrop with lightweight cursor + scroll parallax.
 * Paused off-screen and under reduced motion / coarse pointers.
 */
export function FooterGalaxyBg({ hostRef }) {
  const layerRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const layer = layerRef.current
    const host = hostRef?.current
    if (!layer || !host || prefersReducedMotion) return undefined

    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer) return undefined

    let raf = 0
    let visible = false
    const target = { x: 0, y: 0, s: 0 }
    const current = { x: 0, y: 0, s: 0 }

    const tick = () => {
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08
      current.s += (target.s - current.s) * 0.08
      layer.style.transform = `translate3d(${current.x.toFixed(2)}px, ${(current.y + current.s).toFixed(2)}px, 0) scale(1.1)`
      raf = 0
    }

    const requestTick = () => {
      if (raf || !visible) return
      raf = requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      if (!visible) return
      const rect = host.getBoundingClientRect()
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      target.x = nx * 16
      target.y = ny * 11
      requestTick()
    }

    const onScroll = () => {
      if (!visible) return
      const rect = host.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // Soft vertical drift as the footer enters / leaves the viewport.
      const progress = 1 - Math.min(1, Math.max(0, rect.top / vh))
      target.s = (progress - 0.5) * 22
      requestTick()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting)
        if (!visible && raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { rootMargin: '10% 0px', threshold: 0 },
    )
    io.observe(host)

    host.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      io.disconnect()
      host.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
      layer.style.transform = ''
    }
  }, [hostRef, prefersReducedMotion])

  return (
    <div className={styles.root} aria-hidden="true">
      <div ref={layerRef} className={styles.parallax}>
        <img
          className={styles.image}
          src={FOOTER_GALAXY_URL}
          srcSet={FOOTER_GALAXY_SRCSET}
          sizes="100vw"
          alt=""
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.veil} />
      <div className={styles.vignette} />
    </div>
  )
}
