/**
 * Hero V1 – Parked for Future Redesign
 *
 * Status: NOT APPROVED. Kept only as a temporary homepage placeholder
 * while subsequent sections are developed. Do not invest further polish
 * here until an explicit Hero redesign phase is opened.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button, Container, Eyebrow } from '@/components/ui'
import { SceneCanvas } from '@/three/canvas/SceneCanvas'
import { createHeroAtmosphere } from '@/three/scenes/HeroAtmosphereScene'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { homeHero } from '@/content/home'
import styles from './HomeHero.module.css'

gsap.registerPlugin(ScrollTrigger)

export function HomeHero() {
  const rootRef = useRef(null)
  const sceneApiRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const [sceneReady, setSceneReady] = useState(false)
  const [allowScene, setAllowScene] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return undefined
    let idleId
    let timeoutId
    const enable = () => setAllowScene(true)

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(enable, { timeout: 1200 })
    } else {
      timeoutId = window.setTimeout(enable, 600)
    }

    return () => {
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [prefersReducedMotion])

  const createScene = useCallback((api) => {
    const sceneApi = createHeroAtmosphere(api)
    sceneApiRef.current = sceneApi
    setSceneReady(true)
    return {
      onFrame: (time) => sceneApi.onFrame?.(time),
      onResize: (size) => sceneApi.onResize?.(size),
      destroy: () => {
        sceneApi.destroy?.()
        sceneApiRef.current = null
      },
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    let removeEarlyScroll = () => {}

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('[data-hero-animate]', { autoAlpha: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '[data-hero-brand]',
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55 },
        0.08,
      )
        .fromTo(
          '[data-hero-line]',
          { y: '100%' },
          { y: '0%', duration: 0.85, stagger: 0.11 },
          0.22,
        )
        .fromTo(
          '[data-hero-support]',
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55 },
          0.58,
        )
        .fromTo(
          '[data-hero-cta]',
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 },
          0.78,
        )
        .fromTo(
          '[data-hero-meta]',
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.45 },
          0.98,
        )
        .fromTo(
          '[data-hero-panel]',
          { y: 28, autoAlpha: 0, rotate: 2 },
          { y: 0, autoAlpha: 1, rotate: 0, duration: 0.85 },
          0.45,
        )

      ScrollTrigger.create({
        id: 'mf:home:hero-scroll',
        trigger: root,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          sceneApiRef.current?.setScrollProgress?.(self.progress)
        },
      })

      const onScrollEarly = () => {
        if (window.scrollY > root.offsetHeight * 0.08) {
          tl.progress(1)
          removeEarlyScroll()
        }
      }

      window.addEventListener('scroll', onScrollEarly, { passive: true })
      removeEarlyScroll = () => window.removeEventListener('scroll', onScrollEarly)
    }, root)

    return () => {
      removeEarlyScroll()
      ctx.revert()
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      data-header-theme="dark"
      data-hero-status="v1-parked"
      aria-label="Mernify introduction"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.poster} />
        <div className={[styles.canvasWrap, sceneReady ? styles.canvasReady : ''].join(' ')}>
          {!prefersReducedMotion && allowScene && (
            <SceneCanvas createScene={createScene} className={styles.canvas} />
          )}
        </div>
        <div className={styles.vignette} />
        <div className={styles.grid} />
      </div>

      <Container className={styles.content}>
        <div className={styles.copy}>
          <div data-hero-brand data-hero-animate>
            <Eyebrow className={styles.eyebrow}>{homeHero.eyebrow}</Eyebrow>
          </div>

          <h1 className={styles.title}>
            {homeHero.titleLines.map((line) => (
              <span key={line} className={styles.titleLine}>
                <span className={styles.titleInner} data-hero-line data-hero-animate>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className={styles.support} data-hero-support data-hero-animate>
            {homeHero.support}
          </p>

          <div className={styles.actions}>
            <div data-hero-cta data-hero-animate>
              <Button as={Link} to={homeHero.primaryCta.to} size="lg" magnetic>
                {homeHero.primaryCta.label}
              </Button>
            </div>
            <div data-hero-cta data-hero-animate>
              <Button as={Link} to={homeHero.secondaryCta.to} variant="ghost" size="lg" magnetic>
                {homeHero.secondaryCta.label}
              </Button>
            </div>
          </div>

          <ul className={styles.meta} data-hero-meta data-hero-animate>
            {homeHero.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className={styles.aside} aria-hidden="true">
          <div className={styles.productPanel} data-hero-panel data-hero-animate>
            <div className={styles.panelHeader}>
              <span className={styles.panelMark} />
              <span className={styles.panelTitle}>Product architecture</span>
            </div>
            <div className={styles.panelRows}>
              <div className={styles.panelRow}>
                <span>Web & SaaS platforms</span>
                <em />
              </div>
              <div className={styles.panelRow}>
                <span>Mobile applications</span>
                <em />
              </div>
              <div className={styles.panelRow}>
                <span>AI & automation</span>
                <em />
              </div>
            </div>
            <div className={styles.panelFooter}>
              <span>Designed to scale</span>
              <strong>Discovery → Launch</strong>
            </div>
          </div>
        </aside>
      </Container>

      <div className={styles.scrollHint} aria-hidden="true" data-hero-meta data-hero-animate>
        <i />
      </div>
    </section>
  )
}
