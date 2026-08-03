import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  Download,
  HeartHandshake,
  Search,
  Sparkles,
  UserPlus,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ServiceMobileJourney.module.css'

gsap.registerPlugin(ScrollTrigger)

const STEP_ICONS = [Search, Download, UserPlus, Sparkles, HeartHandshake]

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

export function ServiceMobileJourney({ content }) {
  const rootRef = useRef(null)
  const pathRef = useRef(null)
  const detailRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  const steps = content?.steps || []
  const [activeId, setActiveId] = useState(steps[0]?.id || null)

  const active = useMemo(
    () => steps.find((s) => s.id === activeId) || steps[0],
    [steps, activeId],
  )

  const activeIndex = Math.max(
    0,
    steps.findIndex((s) => s.id === active?.id),
  )

  const progress = steps.length > 1 ? activeIndex / (steps.length - 1) : 1

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    y: 28,
    deps: [content?.title],
  })

  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path || prefersReducedMotion || !steps.length) return undefined

    const light = isLightMotion()
    const nodes = path.querySelectorAll('[data-step]')
    const trail = path.querySelector('[data-trail]')

    const ctx = gsap.context(() => {
      if (trail) {
        gsap.fromTo(
          trail,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: light ? 0.7 : 1.1,
            ease: 'power2.out',
            transformOrigin: 'left center',
            scrollTrigger: { trigger: path, start: 'top 72%', once: true },
          },
        )
      }

      gsap.fromTo(
        nodes,
        { autoAlpha: 0, y: 22, scale: 0.88 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: light ? 0.5 : 0.7,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: path, start: 'top 70%', once: true },
        },
      )
    }, path)

    return () => ctx.revert()
  }, [prefersReducedMotion, steps.length])

  useLayoutEffect(() => {
    const panel = detailRef.current
    if (!panel || prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.querySelectorAll('[data-detail-anim]'),
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
        },
      )
    }, panel)

    return () => ctx.revert()
  }, [activeId, prefersReducedMotion])

  if (!steps.length) return null

  const ActiveIcon = STEP_ICONS[activeIndex % STEP_ICONS.length] || Search

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="mobile-journey-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.mesh} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="mobile-journey-title" className={styles.title}>
            {content.title}
          </h2>
          {content.support ? <p className={styles.support}>{content.support}</p> : null}
        </header>

        <div className={styles.layout}>
          <div className={styles.stage}>
            <div className={styles.phone} aria-hidden="true">
              <div className={styles.phoneNotch} />
              <div className={styles.phoneScreen}>
                <div className={styles.phoneBar} />
                <div className={styles.phoneCards}>
                  <span />
                  <span />
                  <span />
                </div>
                <div
                  className={styles.phoneProgress}
                  style={{ '--progress': `${progress * 100}%` }}
                />
              </div>
            </div>

            <div ref={pathRef} className={styles.path} aria-label="User journey path">
              <div className={styles.trailTrack} aria-hidden="true">
                <span className={styles.trailFill} data-trail style={{ '--progress': `${progress * 100}%` }} />
              </div>

              <ol className={styles.steps} role="list">
                {steps.map((step, index) => {
                  const Icon = STEP_ICONS[index % STEP_ICONS.length] || Search
                  const isActive = step.id === active?.id
                  const isDone = index <= activeIndex
                  return (
                    <li key={step.id} className={styles.stepItem}>
                      <button
                        type="button"
                        className={[
                          styles.step,
                          isActive ? styles.stepActive : '',
                          isDone ? styles.stepDone : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        style={{ '--step-accent': step.accent || '#15c6e2' }}
                        data-step
                        aria-pressed={isActive}
                        onMouseEnter={() => {
                          if (!window.matchMedia('(pointer: coarse)').matches) {
                            setActiveId(step.id)
                          }
                        }}
                        onFocus={() => setActiveId(step.id)}
                        onClick={() => setActiveId(step.id)}
                      >
                        <span className={styles.stepNode} aria-hidden="true">
                          <Icon size={18} strokeWidth={2} />
                        </span>
                        <span className={styles.stepLabel}>{step.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>

          <aside
            ref={detailRef}
            className={styles.detail}
            aria-live="polite"
            style={active ? { '--accent': active.accent || '#15c6e2' } : undefined}
          >
            <div className={styles.detailGlow} aria-hidden="true" />
            <div className={styles.detailTop} data-detail-anim>
              <div className={styles.detailIcon} aria-hidden="true">
                <ActiveIcon size={26} strokeWidth={1.8} />
              </div>
              <span className={styles.detailStep}>
                Step {String(activeIndex + 1).padStart(2, '0')}
              </span>
            </div>
            <p className={styles.detailEyebrow} data-detail-anim>
              {active?.label}
            </p>
            <h3 className={styles.detailTitle} data-detail-anim>
              {active?.title}
            </h3>
            <p className={styles.detailText} data-detail-anim>
              {active?.text}
            </p>
            {active?.points?.length ? (
              <ul className={styles.detailPoints} role="list" data-detail-anim>
                {active.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
          </aside>
        </div>

        <ul className={styles.mobileRail} role="list" aria-label="Journey steps">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index % STEP_ICONS.length] || Search
            const isActive = step.id === active?.id
            return (
              <li key={step.id}>
                <button
                  type="button"
                  className={[styles.railBtn, isActive ? styles.railBtnActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  style={{ '--step-accent': step.accent || '#15c6e2' }}
                  aria-pressed={isActive}
                  onClick={() => setActiveId(step.id)}
                >
                  <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  {step.label}
                </button>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
