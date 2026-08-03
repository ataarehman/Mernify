import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotion } from '@/app/providers/useMotion'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { refreshScrollTriggers } from '@/lib/scrollManager'
import styles from './PageEntranceCurtain.module.css'

gsap.registerPlugin(ScrollTrigger)

const INITIAL = 'M0,1005S175,995,500,995s500,5,500,5V0H0Z'
const CURVE = 'M0 502S175 272 500 272s500 230 500 230V0H0Z'
const FLAT = 'M0 2S175 1 500 1s500 1 500 1V0H0Z'

/**
 * Static-site style black SVG curtain that morphs, then slides upward.
 * One-shot on mount; removed from the tree when finished so it never
 * impacts scroll performance.
 */
export function PageEntranceCurtain({
  label = 'Mernify',
  hold = 0.4,
  onComplete,
}) {
  const rootRef = useRef(null)
  const pathRef = useRef(null)
  const textRef = useRef(null)
  const [done, setDone] = useState(false)
  const completedRef = useRef(false)
  const { prefersReducedMotion } = useReducedMotion()
  const { lenis } = useMotion()

  useLayoutEffect(() => {
    if (done) return undefined

    const finish = () => {
      if (completedRef.current) return
      completedRef.current = true
      document.documentElement.style.overflow = ''
      lenis?.current?.start()
      setDone(true)
      onComplete?.()
      refreshScrollTriggers(ScrollTrigger, { afterMs: 180 })
    }

    if (prefersReducedMotion) {
      finish()
      return undefined
    }

    const root = rootRef.current
    const path = pathRef.current
    const text = textRef.current
    if (!root || !path) return undefined

    const lenisInstance = lenis?.current
    lenisInstance?.stop()

    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: finish,
    })

    if (text) {
      tl.to(text, {
        y: -72,
        opacity: 0,
        duration: 0.4,
        delay: hold,
        ease: 'power2.in',
      })
    } else {
      tl.to({}, { duration: hold })
    }

    tl.to(path, { attr: { d: CURVE }, duration: 0.5 }, text ? '-=0.05' : undefined)
      .to(path, { attr: { d: FLAT }, duration: 0.45 })
      .to(root, {
        yPercent: -130,
        duration: 0.7,
        ease: 'power4.inOut',
      })

    return () => {
      tl.kill()
      document.documentElement.style.overflow = prevOverflow
      lenisInstance?.start()
    }
  }, [done, hold, prefersReducedMotion, lenis, onComplete])

  if (done) return null

  const letters = Array.from(label)

  return (
    <div
      ref={rootRef}
      className={styles.root}
      aria-hidden="true"
      data-lenis-prevent
    >
      <svg
        className={styles.svg}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path ref={pathRef} d={INITIAL} />
      </svg>
      <div ref={textRef} className={styles.heading}>
        <p className={styles.loadText}>
          {letters.map((char, index) => (
            <span
              key={`${char}-${index}`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
