import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './MediaStrip.module.css'

gsap.registerPlugin(ScrollTrigger)

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

export function MediaStrip({
  src = '/assets/images/thumbs/thumbnail-bg.jpg',
  height = 'default',
  className = '',
  /** ScrollSmoother-like data-speed; 0.1 ≈ subtle (index-2 thumbnail band). */
  speed = 0.25,
}) {
  const rootRef = useRef(null)
  const imageRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    const image = imageRef.current
    if (!root || !image || prefersReducedMotion) return undefined

    let ctx
    // Map template data-speed (0.1–1) into a gentle yPercent travel.
    const travel = Math.max(2, Math.min(14, (1 - speed) * 10))

    const build = () => {
      ctx?.revert()
      if (isLightMotion()) return

      ctx = gsap.context(() => {
        gsap.fromTo(
          image,
          { yPercent: -travel },
          {
            yPercent: travel,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      }, root)
    }

    build()

    const coarse = window.matchMedia('(pointer: coarse)')
    const narrow = window.matchMedia('(max-width: 900px)')
    const onChange = () => {
      build()
      ScrollTrigger.refresh()
    }
    coarse.addEventListener('change', onChange)
    narrow.addEventListener('change', onChange)

    return () => {
      coarse.removeEventListener('change', onChange)
      narrow.removeEventListener('change', onChange)
      ctx?.revert()
    }
  }, [prefersReducedMotion, speed])

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
