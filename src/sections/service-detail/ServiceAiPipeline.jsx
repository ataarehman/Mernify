import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  Boxes,
  BrainCircuit,
  DatabaseZap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ServiceAiPipeline.module.css'

gsap.registerPlugin(ScrollTrigger)

const STAGE_ICONS = [DatabaseZap, Boxes, BrainCircuit, ShieldCheck, Sparkles]

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

export function ServiceAiPipeline({ content }) {
  const rootRef = useRef(null)
  const pipeRef = useRef(null)
  const detailRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  const stages = content?.stages || []
  const [activeId, setActiveId] = useState(stages[0]?.id || null)

  const active = useMemo(
    () => stages.find((s) => s.id === activeId) || stages[0],
    [stages, activeId],
  )

  const activeIndex = Math.max(
    0,
    stages.findIndex((s) => s.id === active?.id),
  )

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    y: 28,
    deps: [content?.title],
  })

  useLayoutEffect(() => {
    const pipe = pipeRef.current
    if (!pipe || prefersReducedMotion || !stages.length) return undefined

    const light = isLightMotion()
    const nodes = pipe.querySelectorAll('[data-stage]')
    const flows = pipe.querySelectorAll('[data-flow]')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        nodes,
        { autoAlpha: 0, y: 20, scale: 0.9 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: light ? 0.5 : 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: pipe, start: 'top 72%', once: true },
        },
      )

      gsap.fromTo(
        flows,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: light ? 0.45 : 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: pipe, start: 'top 70%', once: true },
        },
      )

      if (!light) {
        flows.forEach((el, i) => {
          const dots = el.querySelectorAll('[data-dot]')
          dots.forEach((dot, di) => {
            gsap.to(dot, {
              x: '120%',
              duration: 1.8,
              repeat: -1,
              ease: 'none',
              delay: i * 0.15 + di * 0.35,
            })
          })
        })
      }
    }, pipe)

    return () => ctx.revert()
  }, [prefersReducedMotion, stages.length])

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

  if (!stages.length) return null

  const ActiveIcon = STAGE_ICONS[activeIndex % STAGE_ICONS.length] || BrainCircuit

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="ai-pipeline-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.glow} />
        <span className={styles.mesh} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="ai-pipeline-title" className={styles.title}>
            {content.title}
          </h2>
          {content.support ? <p className={styles.support}>{content.support}</p> : null}
        </header>

        <div className={styles.layout}>
          <div ref={pipeRef} className={styles.pipeline} aria-label="AI integration pipeline">
            {stages.map((stage, index) => {
              const Icon = STAGE_ICONS[index % STAGE_ICONS.length] || BrainCircuit
              const isActive = stage.id === active?.id
              return (
                <div key={stage.id} className={styles.pipeItem}>
                  {index > 0 ? (
                    <div className={styles.flow} data-flow aria-hidden="true">
                      <span className={styles.flowLine} />
                      <span className={styles.flowDot} data-dot />
                      <span className={styles.flowDot} data-dot />
                    </div>
                  ) : null}
                  <button
                    type="button"
                    className={[styles.stage, isActive ? styles.stageActive : '']
                      .filter(Boolean)
                      .join(' ')}
                    style={{ '--stage-accent': stage.accent || '#15c6e2' }}
                    data-stage
                    aria-pressed={isActive}
                    onMouseEnter={() => {
                      if (!window.matchMedia('(pointer: coarse)').matches) {
                        setActiveId(stage.id)
                      }
                    }}
                    onFocus={() => setActiveId(stage.id)}
                    onClick={() => setActiveId(stage.id)}
                  >
                    <span className={styles.stageGlow} aria-hidden="true" />
                    <span className={styles.stageIcon} aria-hidden="true">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <span className={styles.stageLabel}>{stage.label}</span>
                    <span className={styles.stageIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </button>
                </div>
              )
            })}
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
                Stage {String(activeIndex + 1).padStart(2, '0')}
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

        <ul className={styles.mobileRail} role="list" aria-label="Pipeline stages">
          {stages.map((stage, index) => {
            const Icon = STAGE_ICONS[index % STAGE_ICONS.length] || BrainCircuit
            const isActive = stage.id === active?.id
            return (
              <li key={stage.id}>
                <button
                  type="button"
                  className={[styles.railBtn, isActive ? styles.railBtnActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  style={{ '--stage-accent': stage.accent || '#15c6e2' }}
                  aria-pressed={isActive}
                  onClick={() => setActiveId(stage.id)}
                >
                  <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  {stage.label}
                </button>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
