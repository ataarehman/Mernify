import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { useInView } from '@/hooks/useInView'
import styles from './ServicesMarquee.module.css'

const PHRASE = 'Our Recent Works - Our Recent'

/**
 * index-2.html jQuery marquee parity:
 * speed 50, gap 0, duplicated, pauseOnHover, startVisible, loop infinite, direction left.
 * speed:50 ≈ continuous CSS/GSAP scroll ~ linear px/sec — tuned via duration from measured width.
 */
export function ServicesMarquee() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const groupRef = useRef(null)
  const tweenRef = useRef(null)
  const inViewRef = useRef(true)
  const { prefersReducedMotion } = useReducedMotion()
  const inView = useInView(wrapRef, { rootMargin: '10% 0px' })
  inViewRef.current = inView

  useLayoutEffect(() => {
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group || prefersReducedMotion) return undefined

    const apply = () => {
      const distance = group.offsetWidth
      if (!distance) return

      tweenRef.current?.kill()
      // jquery.marquee speed: 50 ≈ pixels per second
      const duration = distance / 50

      gsap.set(track, { x: 0, force3D: true })
      tweenRef.current = gsap.to(track, {
        x: -distance,
        duration,
        ease: 'none',
        repeat: -1,
        force3D: true,
      })

      if (!inViewRef.current) tweenRef.current.pause()
    }

    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(group)
    window.addEventListener('resize', apply)

    return () => {
      tweenRef.current?.kill()
      tweenRef.current = null
      ro.disconnect()
      window.removeEventListener('resize', apply)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const tween = tweenRef.current
    if (!tween) return
    if (inView) tween.resume()
    else tween.pause()
  }, [inView])

  const items = Array.from({ length: 6 }, (_, i) => `${PHRASE}-${i}`)

  return (
    <div
      ref={wrapRef}
      className={styles.section}
      data-header-theme="light"
      aria-hidden="true"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => {
        if (inViewRef.current && !prefersReducedMotion) tweenRef.current?.resume()
      }}
    >
      <div className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          <div ref={groupRef} className={styles.group}>
            {items.map((key) => (
              <span key={key} className={styles.title}>
                {PHRASE}
              </span>
            ))}
          </div>
          <div className={styles.group} aria-hidden="true">
            {items.map((key) => (
              <span key={`dup-${key}`} className={styles.title}>
                {PHRASE}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
