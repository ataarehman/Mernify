import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  Component,
  GitBranch,
  PenTool,
  ScanSearch,
  Send,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ServiceDesignFlow.module.css'

gsap.registerPlugin(ScrollTrigger)

const PHASE_ICONS = [ScanSearch, GitBranch, Component, PenTool, Send]

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

export function ServiceDesignFlow({ content }) {
  const rootRef = useRef(null)
  const flowRef = useRef(null)
  const detailRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  const phases = content?.phases || []
  const [activeId, setActiveId] = useState(phases[0]?.id || null)

  const active = useMemo(
    () => phases.find((p) => p.id === activeId) || phases[0],
    [phases, activeId],
  )

  const activeIndex = Math.max(
    0,
    phases.findIndex((p) => p.id === active?.id),
  )

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    y: 28,
    deps: [content?.title],
  })

  useLayoutEffect(() => {
    const flow = flowRef.current
    if (!flow || prefersReducedMotion || !phases.length) return undefined

    const light = isLightMotion()
    const nodes = flow.querySelectorAll('[data-phase]')
    const links = flow.querySelectorAll('[data-link]')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        nodes,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: light ? 0.5 : 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: flow, start: 'top 72%', once: true },
        },
      )

      gsap.fromTo(
        links,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: light ? 0.4 : 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: flow, start: 'top 70%', once: true },
        },
      )
    }, flow)

    return () => ctx.revert()
  }, [prefersReducedMotion, phases.length])

  useLayoutEffect(() => {
    const panel = detailRef.current
    if (!panel || prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.querySelectorAll('[data-detail-anim]'),
        { autoAlpha: 0, y: 12 },
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

  if (!phases.length) return null

  const ActiveIcon = PHASE_ICONS[activeIndex % PHASE_ICONS.length] || ScanSearch

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="design-flow-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.wash} />
        <span className={styles.grid} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="design-flow-title" className={styles.title}>
            {content.title}
          </h2>
          {content.support ? <p className={styles.support}>{content.support}</p> : null}
        </header>

        <div className={styles.layout}>
          <div ref={flowRef} className={styles.flow} aria-label="Design process flow">
            {phases.map((phase, index) => {
              const Icon = PHASE_ICONS[index % PHASE_ICONS.length] || ScanSearch
              const isActive = phase.id === active?.id
              return (
                <div key={phase.id} className={styles.phaseItem}>
                  {index > 0 ? (
                    <span className={styles.link} data-link aria-hidden="true" />
                  ) : null}
                  <button
                    type="button"
                    className={[styles.phase, isActive ? styles.phaseActive : '']
                      .filter(Boolean)
                      .join(' ')}
                    style={{ '--phase-accent': phase.accent || '#4F46E5' }}
                    data-phase
                    aria-pressed={isActive}
                    onMouseEnter={() => {
                      if (!window.matchMedia('(pointer: coarse)').matches) {
                        setActiveId(phase.id)
                      }
                    }}
                    onFocus={() => setActiveId(phase.id)}
                    onClick={() => setActiveId(phase.id)}
                  >
                    <span className={styles.phaseIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.phaseIcon} aria-hidden="true">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className={styles.phaseLabel}>{phase.label}</span>
                  </button>
                </div>
              )
            })}
          </div>

          <aside
            ref={detailRef}
            className={styles.detail}
            aria-live="polite"
            style={active ? { '--accent': active.accent || '#4F46E5' } : undefined}
          >
            <div className={styles.detailTop} data-detail-anim>
              <div className={styles.detailIcon} aria-hidden="true">
                <ActiveIcon size={26} strokeWidth={1.8} />
              </div>
              <span className={styles.detailStep}>
                Phase {String(activeIndex + 1).padStart(2, '0')}
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

        <ul className={styles.mobileRail} role="list" aria-label="Design phases">
          {phases.map((phase, index) => {
            const Icon = PHASE_ICONS[index % PHASE_ICONS.length] || ScanSearch
            const isActive = phase.id === active?.id
            return (
              <li key={phase.id}>
                <button
                  type="button"
                  className={[styles.railBtn, isActive ? styles.railBtnActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  style={{ '--phase-accent': phase.accent || '#4F46E5' }}
                  aria-pressed={isActive}
                  onClick={() => setActiveId(phase.id)}
                >
                  <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  {phase.label}
                </button>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
