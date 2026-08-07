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
 * Official Mernify mark (same geometry as /favicon.svg) with scoped gradient ids
 * so the loader never collides with other instances on the page.
 */
function LoaderLogoMark({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="92 92 840 840"
      width="72"
      height="72"
      role="img"
      aria-label="Mernify"
    >
      <defs>
        <linearGradient id="mfLoaderViolet" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#7c5cf5" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="mfLoaderCyan" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#15c6e2" />
        </linearGradient>
        <linearGradient id="mfLoaderIndigo" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#6a50ed" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="mfLoaderBlue" x1="0.1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#15c6e2" />
          <stop offset="1" stopColor="#1f72ea" />
        </linearGradient>
      </defs>
      <g strokeLinejoin="round" strokeWidth="24">
        <path
          className={styles.facet}
          style={{ animationDelay: '0s' }}
          d="M176 119 512 314 512 657 176 461Z"
          fill="url(#mfLoaderViolet)"
          stroke="url(#mfLoaderViolet)"
        />
        <path
          className={styles.facet}
          style={{ animationDelay: '0.08s' }}
          d="M848 119 512 314 512 657 848 461Z"
          fill="url(#mfLoaderCyan)"
          stroke="url(#mfLoaderCyan)"
        />
        <path
          className={styles.facet}
          style={{ animationDelay: '0.16s' }}
          d="M176 509 412 646 412 904 176 767Z"
          fill="url(#mfLoaderIndigo)"
          stroke="url(#mfLoaderIndigo)"
        />
        <path
          className={styles.facet}
          style={{ animationDelay: '0.24s' }}
          d="M612 599 848 461 848 768 612 905Z"
          fill="url(#mfLoaderBlue)"
          stroke="url(#mfLoaderBlue)"
        />
      </g>
    </svg>
  )
}

/**
 * Static-site style black SVG curtain that morphs, then slides upward.
 * One-shot on mount; removed from the tree when finished so it never
 * impacts scroll performance.
 */
export function PageEntranceCurtain({
  hold = 0.4,
  onComplete,
}) {
  const rootRef = useRef(null)
  const pathRef = useRef(null)
  const markRef = useRef(null)
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
    const mark = markRef.current
    if (!root || !path) return undefined

    const lenisInstance = lenis?.current
    lenisInstance?.stop()

    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: finish,
    })

    if (mark) {
      tl.to(mark, {
        y: -72,
        opacity: 0,
        duration: 0.4,
        delay: hold,
        ease: 'power2.in',
      })
    } else {
      tl.to({}, { duration: hold })
    }

    tl.to(path, { attr: { d: CURVE }, duration: 0.5 }, mark ? '-=0.05' : undefined)
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
      <div ref={markRef} className={styles.heading}>
        <LoaderLogoMark className={styles.logoMark} />
      </div>
    </div>
  )
}
