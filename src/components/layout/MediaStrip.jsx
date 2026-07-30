import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './MediaStrip.module.css'

gsap.registerPlugin(ScrollTrigger)

export function MediaStrip({
  src = '/assets/images/thumbs/thumbnail-bg.jpg',
  height = 'default',
  className = '',
}) {
  const rootRef = useRef(null)
  const imageRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    const image = imageRef.current
    if (!root || !image || prefersReducedMotion) return undefined

    // Skip parallax on touch / narrow viewports — scrub jank source on mobile.
    const light =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(max-width: 900px)').matches
    if (light) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.65,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={rootRef}
      className={[styles.strip, height === 'tall' ? styles.tall : '', className]
        .filter(Boolean)
        .join(' ')}
      data-header-theme="dark"
      aria-hidden="true"
    >
      <div
        ref={imageRef}
        className={styles.image}
        style={{ backgroundImage: `url('${src}')` }}
      />
    </section>
  )
}
