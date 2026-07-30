import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ClipReveal.module.css'

gsap.registerPlugin(ScrollTrigger)

const INITIAL_CLIPS = [
  'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)',
  'polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)',
  'polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)',
  'polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)',
  'polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)',
  'polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)',
  'polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)',
  'polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)',
  'polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)',
]

const FINAL_CLIPS = [
  'polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)',
  'polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)',
  'polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)',
  'polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)',
  'polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)',
  'polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)',
  'polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)',
  'polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)',
  'polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)',
]

const ORDER = [[0], [1, 3], [2, 4, 6], [5, 7], [8]]

function useSimpleReveal() {
  const [simple, setSimple] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(max-width: 900px)').matches
    )
  })

  useLayoutEffect(() => {
    const mq = window.matchMedia('(pointer: coarse), (max-width: 900px)')
    const sync = () => setSimple(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return simple
}

/**
 * Template-style 9-tile clip reveal on desktop.
 * Falls back to a single fade on touch / smaller viewports for scroll perf.
 */
export function ClipReveal({
  src,
  alt = '',
  className = '',
  rounded = true,
  start = 'top 75%',
}) {
  const rootRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const simple = useSimpleReveal()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !src) return undefined

    if (prefersReducedMotion || simple) {
      const source = root.querySelector('[data-clip-source]')
      if (source) {
        gsap.set(source, { opacity: 1 })
      }
      if (!prefersReducedMotion && simple && source) {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            source,
            { opacity: 0, scale: 1.04 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: { trigger: root, start, once: true },
            },
          )
        }, root)
        return () => ctx.revert()
      }
      return undefined
    }

    const masks = Array.from(root.querySelectorAll('[data-clip-mask]'))

    const ctx = gsap.context(() => {
      gsap.set(masks, { clipPath: (i) => INITIAL_CLIPS[i] })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start,
          once: true,
        },
      })

      ORDER.forEach((indices, step) => {
        const targets = indices.map((i) => masks[i]).filter(Boolean)
        if (!targets.length) return
        tl.to(
          targets,
          {
            clipPath: (j, el) => FINAL_CLIPS[masks.indexOf(el)],
            duration: 1,
            ease: 'power4.out',
            stagger: 0.1,
          },
          step * 0.125,
        )
      })
    }, root)

    return () => ctx.revert()
  }, [src, start, prefersReducedMotion, simple])

  return (
    <div
      ref={rootRef}
      className={[
        styles.root,
        rounded ? styles.rounded : '',
        simple ? styles.simple : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img
        data-clip-source
        className={styles.source}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      {!simple &&
        Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            data-clip-mask
            className={styles.mask}
            style={{ backgroundImage: `url(${src})` }}
            aria-hidden="true"
          />
        ))}
    </div>
  )
}
