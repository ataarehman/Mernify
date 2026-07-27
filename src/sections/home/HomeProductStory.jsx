import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HomeProductStory.module.css'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    id: 'define',
    num: '01',
    title: 'Define',
    subtitle: 'Idea becomes direction',
    body: 'We clarify product goals, map user journeys, and establish the feature foundation before a single line of code is written.',
    zones: [
      { label: 'User Research', color: 'indigo' },
      { label: 'Product Goals', color: 'cyan' },
      { label: 'Feature Map', color: 'indigo' },
      { label: 'User Flows', color: 'cyan' },
    ],
  },
  {
    id: 'design',
    num: '02',
    title: 'Design',
    subtitle: 'Direction becomes interface',
    body: 'Requirements transform into a design system, component library, and interactive prototypes your team can validate before engineering begins.',
    zones: [
      { label: 'Design System', color: 'indigo' },
      { label: 'Components', color: 'cyan' },
      { label: 'Prototype', color: 'indigo' },
      { label: 'Handoff', color: 'cyan' },
    ],
  },
  {
    id: 'engineer',
    num: '03',
    title: 'Engineer',
    subtitle: 'Interface becomes product',
    body: 'Frontend, backend, APIs, database, cloud infrastructure, and AI services connect into one production-ready system.',
    zones: [
      { label: 'Frontend', color: 'indigo' },
      { label: 'Backend', color: 'cyan' },
      { label: 'API Layer', color: 'indigo' },
      { label: 'Cloud', color: 'cyan' },
    ],
  },
  {
    id: 'scale',
    num: '04',
    title: 'Scale',
    subtitle: 'Product reaches the world',
    body: 'The completed product expands across platforms, monitors real usage, and evolves through continuous delivery and automation.',
    zones: [
      { label: 'Web & Mobile', color: 'indigo' },
      { label: 'Analytics', color: 'cyan' },
      { label: 'Automation', color: 'indigo' },
      { label: 'Infrastructure', color: 'cyan' },
    ],
  },
]

export function HomeProductStory() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const [activeStage, setActiveStage] = useState(0)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas || prefersReducedMotion) return undefined

    const isDesktop = window.innerWidth >= 768

    if (isDesktop) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${window.innerHeight * 3.5}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        STAGES.forEach((_, i) => {
          if (i === 0) return
          tl.to({}, {
            duration: 1,
            onUpdate() {
              const prog = this.progress()
              if (prog > 0.5) setActiveStage(i)
              else setActiveStage(i - 1)
            },
          })
        })
      }, section)

      return () => ctx.revert()
    }

    // Mobile: IntersectionObserver per stage panel
    const stageEls = section.querySelectorAll('[data-stage]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStage(Number(entry.target.getAttribute('data-stage')))
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' },
    )
    stageEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  const stage = STAGES[activeStage]

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="From first thought to production"
    >
      <div className={styles.sectionInner}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>The process</p>
          <h2 className={styles.title}>From First Thought<br />to Production</h2>
        </div>

        {/* ── Desktop: two columns ── */}
        <div className={styles.layout}>
          {/* Stage navigator */}
          <div className={styles.stageNav} role="tablist" aria-label="Product stages">
            {STAGES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={activeStage === i}
                className={[styles.stageTab, activeStage === i ? styles.stageTabActive : ''].join(' ')}
                onClick={() => setActiveStage(i)}
              >
                <span className={styles.stageNum}>{s.num}</span>
                <span className={styles.stageInfo}>
                  <strong>{s.title}</strong>
                  <span>{s.subtitle}</span>
                </span>
                <span className={styles.stageBar} aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* Visual canvas */}
          <div
            ref={canvasRef}
            role="tabpanel"
            aria-label={`Stage: ${stage.title}`}
            className={styles.canvas}
          >
            <StageCanvas stage={stage} reduced={prefersReducedMotion} />
          </div>
        </div>

        {/* ── Mobile: vertical narrative ── */}
        <div className={styles.mobilePanels} aria-hidden="true">
          {STAGES.map((s, i) => (
            <div key={s.id} className={styles.mobilePanel} data-stage={i}>
              <div className={styles.mobilePanelHead}>
                <span className={styles.stageNum}>{s.num}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.subtitle}</p>
                </div>
              </div>
              <p className={styles.mobileBody}>{s.body}</p>
              <MiniCanvas zones={s.zones} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StageCanvas({ stage, reduced }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return undefined
    gsap.fromTo(
      el.querySelectorAll('[data-zone]'),
      { opacity: 0, y: 16, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
    )
  }, [stage.id, reduced])

  return (
    <div ref={ref} className={styles.canvasInner}>
      <div className={styles.canvasBg} aria-hidden="true" />
      <div className={styles.canvasGrid} aria-hidden="true" />

      <div className={styles.stageContent}>
        <div className={styles.stageTitle}>
          <span className={styles.stageTitleNum}>{stage.num}</span>
          <h3>{stage.title}</h3>
        </div>
        <p className={styles.stageBody}>{stage.body}</p>

        <div className={styles.zones}>
          {stage.zones.map((z) => (
            <div
              key={z.label}
              data-zone
              className={[styles.zone, styles[`zone-${z.color}`]].join(' ')}
            >
              <span className={styles.zoneDot} />
              {z.label}
            </div>
          ))}
        </div>
      </div>

      <ConnectorLines stageId={stage.id} />
    </div>
  )
}

function MiniCanvas({ zones }) {
  return (
    <div className={styles.miniCanvas}>
      {zones.map((z) => (
        <div
          key={z.label}
          className={[styles.zone, styles[`zone-${z.color}`]].join(' ')}
        >
          <span className={styles.zoneDot} />
          {z.label}
        </div>
      ))}
    </div>
  )
}

function ConnectorLines({ stageId }) {
  const colors = { define: '#4f46e5', design: '#6366f1', engineer: '#0891b2', scale: '#06b6d4' }
  const c = colors[stageId] || '#4f46e5'
  return (
    <svg className={styles.connectors} viewBox="0 0 480 300" aria-hidden="true">
      <g stroke={c} strokeWidth="1" fill="none" opacity="0.22">
        <line x1="240" y1="150" x2="80" y2="70" strokeDasharray="4 4" />
        <line x1="240" y1="150" x2="400" y2="70" strokeDasharray="4 4" />
        <line x1="240" y1="150" x2="80" y2="230" strokeDasharray="4 4" />
        <line x1="240" y1="150" x2="400" y2="230" strokeDasharray="4 4" />
      </g>
      <circle cx="240" cy="150" r="5" fill={c} opacity="0.6" />
    </svg>
  )
}
