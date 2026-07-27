import { lazy, Suspense, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import gsap from 'gsap'
import { Button, Container } from '@/components/ui'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { HeroModulesFallback } from '@/components/media/HeroModulesFallback'
import styles from './HomeHero.module.css'

const HeroScene = lazy(() =>
  import('@/components/media/HeroScene').then((m) => ({ default: m.HeroScene })),
)

function canUseWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function HomeHero() {
  const copyRef = useRef(null)
  const wrapRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const useThreeJS = canUseWebGL()

  useEffect(() => {
    const el = copyRef.current
    if (!el || prefersReducedMotion) return undefined

    const headingLines = el.querySelectorAll('[data-line]')
    const support = el.querySelector('[data-support]')
    const actions = el.querySelector('[data-actions]')
    const eyebrow = el.querySelector('[data-eyebrow]')

    const delay = useThreeJS ? 1.1 : 0.2

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(eyebrow, { opacity: 0, y: 20, duration: 0.65, delay })
        .from(headingLines, { opacity: 0, y: 24, duration: 0.75, stagger: 0.1 }, '-=0.3')
        .from(support, { opacity: 0, y: 18, duration: 0.6 }, '-=0.35')
        .from(actions, { opacity: 0, y: 14, duration: 0.55 }, '-=0.3')
    }, el)

    return () => ctx.revert()
  }, [prefersReducedMotion, useThreeJS])

  // Cursor depth on the visual half
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || prefersReducedMotion) return undefined

    const visual = wrap.querySelector('[data-visual]')
    if (!visual) return undefined

    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window
      const rx = ((e.clientY / H) - 0.5) * 6
      const ry = ((e.clientX / W) - 0.5) * -8
      gsap.to(visual, {
        rotateX: rx,
        rotateY: ry,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
    const onLeave = () => {
      gsap.to(visual, { rotateX: 0, rotateY: 0, duration: 1, ease: 'power2.out' })
    }

    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={wrapRef}
      className={styles.hero}
      data-header-theme="dark"
      aria-labelledby="hero-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.atmosphereGlow1} />
        <div className={styles.atmosphereGlow2} />
        <div className={styles.atmosphereGrid} />
      </div>

      <Container className={styles.inner}>
        <div ref={copyRef} className={styles.copy}>
          <p className={styles.eyebrow} data-eyebrow>
            Product Engineering for Ambitious Ideas
          </p>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.lineWrap}>
              <span className={styles.line} data-line>We Turn Ambitious</span>
            </span>
            <span className={styles.lineWrap}>
              <span className={styles.line} data-line>Ideas Into Intelligent</span>
            </span>
            <span className={styles.lineWrap}>
              <span className={`${styles.line} ${styles.lineGradient}`} data-line>Digital Products.</span>
            </span>
          </h1>
          <p className={styles.support} data-support>
            Mernify designs, engineers, and scales web, mobile, SaaS, and
            AI-powered products for startups, growing businesses, and enterprises.
          </p>
          <div className={styles.actions} data-actions>
            <Button as={NavLink} to="/contact" size="lg" magnetic className={styles.primary}>
              Start Your Product Journey
            </Button>
            <Button
              as={NavLink}
              to="/case-studies"
              size="lg"
              variant="ghost"
              className={styles.secondary}
            >
              Explore Our Work
            </Button>
          </div>
        </div>

        <div className={styles.visual} data-visual style={{ perspective: '1200px' }}>
          {useThreeJS ? (
            <Suspense fallback={<HeroModulesFallback />}>
              <HeroScene reduced={prefersReducedMotion} />
            </Suspense>
          ) : (
            <HeroModulesFallback />
          )}
        </div>
      </Container>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </div>
    </section>
  )
}
