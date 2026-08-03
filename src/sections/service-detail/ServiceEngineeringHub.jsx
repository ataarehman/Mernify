import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  Boxes,
  Cloud,
  Gauge,
  LayoutTemplate,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ServiceEngineeringHub.module.css'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  strategy: Target,
  ux: LayoutTemplate,
  architecture: Boxes,
  frontend: Sparkles,
  backend: Server,
  cloud: Cloud,
  quality: ShieldCheck,
  optimize: RefreshCw,
  hub: Gauge,
}

/** Equal-spaced octagon around the product core (percent coords). */
const NODE_LAYOUT = [
  { id: 'strategy', x: 50, y: 8 },
  { id: 'ux', x: 82, y: 22 },
  { id: 'architecture', x: 92, y: 50 },
  { id: 'frontend', x: 82, y: 78 },
  { id: 'backend', x: 50, y: 92 },
  { id: 'cloud', x: 18, y: 78 },
  { id: 'quality', x: 8, y: 50 },
  { id: 'optimize', x: 18, y: 22 },
]

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

function formatStatValue(value, decimals = 0) {
  if (decimals > 0) return Number(value).toFixed(decimals)
  return String(Math.round(value))
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1'
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

export function ServiceEngineeringHub({ content }) {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const detailRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  const nodes = content?.nodes || []
  const hub = content?.hub
  const metrics = content?.metrics || []
  const [activeId, setActiveId] = useState(nodes[0]?.id || null)

  const active = useMemo(
    () => nodes.find((n) => n.id === activeId) || nodes[0],
    [nodes, activeId],
  )

  const layoutMap = useMemo(() => {
    const map = {}
    NODE_LAYOUT.forEach((item) => {
      map[item.id] = item
    })
    return map
  }, [])

  const activeIndex = Math.max(
    0,
    nodes.findIndex((n) => n.id === active?.id),
  )

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    y: 28,
    deps: [content?.title],
  })

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage || prefersReducedMotion || !nodes.length) return undefined

    const light = isLightMotion()
    const nodesEls = stage.querySelectorAll('[data-hub-node]')
    const hubEl = stage.querySelector('[data-hub-core]')
    const rings = stage.querySelectorAll('[data-orbit]')
    const beams = stage.querySelectorAll('[data-beam]')

    const ctx = gsap.context(() => {
      if (hubEl) {
        gsap.fromTo(
          hubEl,
          { autoAlpha: 0, scale: 0.82 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: light ? 0.55 : 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: stage, start: 'top 75%', once: true },
          },
        )
      }

      gsap.fromTo(
        rings,
        { autoAlpha: 0, scale: 0.88 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: light ? 0.6 : 0.9,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: stage, start: 'top 74%', once: true },
        },
      )

      gsap.fromTo(
        beams,
        { strokeDashoffset: (i, el) => Number(el.getAttribute('data-len') || 80) },
        {
          strokeDashoffset: 0,
          duration: light ? 0.65 : 1,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: stage, start: 'top 72%', once: true },
        },
      )

      gsap.fromTo(
        nodesEls,
        { autoAlpha: 0, scale: 0.7 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: light ? 0.45 : 0.65,
          stagger: 0.06,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: stage, start: 'top 70%', once: true },
        },
      )

      if (!light) {
        nodesEls.forEach((el, i) => {
          const float = el.querySelector('[data-hub-float]')
          if (!float) return
          gsap.to(float, {
            y: i % 2 === 0 ? -5 : 5,
            duration: 2.4 + (i % 3) * 0.25,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: i * 0.12,
          })
        })

        const sweep = stage.querySelector('[data-radar-sweep]')
        if (sweep) {
          gsap.to(sweep, {
            rotate: 360,
            duration: 14,
            repeat: -1,
            ease: 'none',
            transformOrigin: '50% 50%',
          })
        }
      }
    }, stage)

    return () => ctx.revert()
  }, [prefersReducedMotion, nodes.length])

  useLayoutEffect(() => {
    const panel = detailRef.current
    if (!panel || prefersReducedMotion) return undefined

    const parts = panel.querySelectorAll('[data-detail-anim]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        parts,
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

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !metrics.length) return undefined

    const els = root.querySelectorAll('[data-metric-count]')
    const rings = root.querySelectorAll('[data-metric-ring]')

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        if (prefersReducedMotion) {
          const end = Number(el.getAttribute('data-end') || 0)
          const decimals = Number(el.getAttribute('data-decimals') || 0)
          const suffix = el.getAttribute('data-suffix') || ''
          const prefix = el.getAttribute('data-prefix') || ''
          el.textContent = `${prefix}${formatStatValue(end, decimals)}${suffix}`
          return
        }

        const end = Number(el.getAttribute('data-end') || 0)
        const decimals = Number(el.getAttribute('data-decimals') || 0)
        const suffix = el.getAttribute('data-suffix') || ''
        const prefix = el.getAttribute('data-prefix') || ''
        const obj = { val: 0 }

        gsap.to(obj, {
          val: end,
          duration: 1.35,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${formatStatValue(obj.val, decimals)}${suffix}`
          },
        })
      })

      rings.forEach((el) => {
        const target = Number(el.getAttribute('data-progress') || 0)
        if (prefersReducedMotion) {
          el.style.strokeDashoffset = String(100 - target)
          return
        }
        gsap.fromTo(
          el,
          { strokeDashoffset: 100 },
          {
            strokeDashoffset: 100 - target,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion, metrics.length])

  if (!nodes.length || !hub) return null

  const ActiveIcon = ICONS[active?.icon] || Target
  const HubIcon = ICONS[hub.icon] || Gauge

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="engineering-hub-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.grid} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="engineering-hub-title" className={styles.title}>
            {content.title}
          </h2>
          {content.support ? <p className={styles.support}>{content.support}</p> : null}
        </header>

        <div className={styles.layout}>
          <div
            ref={stageRef}
            className={styles.stage}
            aria-label="Engineering Intelligence Hub"
          >
            <div className={styles.stageSheen} aria-hidden="true" />
            <div className={styles.radar} aria-hidden="true">
              <span className={styles.radarRing} data-orbit />
              <span className={styles.radarRingOuter} data-orbit />
              <span className={styles.radarSweep} data-radar-sweep />
            </div>

            <svg className={styles.beams} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {nodes.map((node) => {
                const pos = layoutMap[node.id] || { x: 50, y: 50 }
                const len = Math.hypot(pos.x - 50, pos.y - 50)
                const isActive = node.id === active?.id
                return (
                  <line
                    key={node.id}
                    data-beam
                    data-len={String(Math.round(len * 1.5))}
                    x1={50}
                    y1={50}
                    x2={pos.x}
                    y2={pos.y}
                    className={isActive ? styles.beamActive : styles.beam}
                    style={{
                      strokeDasharray: Math.round(len * 1.5),
                      strokeDashoffset: Math.round(len * 1.5),
                    }}
                  />
                )
              })}
              <path
                className={styles.ringPath}
                d={describeArc(50, 50, 34, 0, 359.9)}
                data-orbit
              />
            </svg>

            <div className={styles.hub} data-hub-core>
              <span className={styles.hubGlow} aria-hidden="true" />
              <span className={styles.hubGlass}>
                <HubIcon size={26} strokeWidth={1.7} aria-hidden="true" />
                <p className={styles.hubLabel}>{hub.label}</p>
                <p className={styles.hubHint}>{hub.hint}</p>
              </span>
            </div>

            {nodes.map((node) => {
              const pos = layoutMap[node.id] || { x: 50, y: 50 }
              const Icon = ICONS[node.icon] || Target
              const isActive = node.id === active?.id
              return (
                <button
                  key={node.id}
                  type="button"
                  className={[styles.node, isActive ? styles.nodeActive : ''].filter(Boolean).join(' ')}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    '--node-accent': node.accent || '#15c6e2',
                  }}
                  data-hub-node
                  aria-pressed={isActive}
                  onMouseEnter={() => {
                    if (!window.matchMedia('(pointer: coarse)').matches) setActiveId(node.id)
                  }}
                  onFocus={() => setActiveId(node.id)}
                  onClick={() => setActiveId(node.id)}
                >
                  <span className={styles.nodeFloat} data-hub-float>
                    <span className={styles.nodeIcon} aria-hidden="true">
                      <Icon size={17} strokeWidth={2} />
                    </span>
                    <span className={styles.nodeLabel}>{node.label}</span>
                  </span>
                </button>
              )
            })}

            <div className={styles.stageHud} aria-hidden="true">
              <span>{String(activeIndex + 1).padStart(2, '0')} / {String(nodes.length).padStart(2, '0')}</span>
              <span>LIVE SYSTEM</span>
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
                <ActiveIcon size={24} strokeWidth={1.8} />
              </div>
              {active?.chip ? <span className={styles.detailChip}>{active.chip}</span> : null}
            </div>
            <p className={styles.detailEyebrow} data-detail-anim>
              {active?.tag || 'Discipline'}
            </p>
            <h3 className={styles.detailTitle} data-detail-anim>
              {active?.title}
            </h3>
            <p className={styles.detailText} data-detail-anim>
              {active?.text}
            </p>
            {active?.points?.length ? (
              <ul className={styles.detailPoints} data-detail-anim>
                {active.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
            {active?.benefit ? (
              <p className={styles.detailBenefit} data-detail-anim>
                <strong>In the product:</strong> {active.benefit}
              </p>
            ) : null}
          </aside>
        </div>

        {metrics.length ? (
          <div className={styles.metrics} data-fade-up>
            {metrics.map((metric) => (
              <article key={metric.label} className={styles.metricCard}>
                <div className={styles.metricRingWrap} aria-hidden="true">
                  <svg viewBox="0 0 36 36" className={styles.metricSvg}>
                    <circle className={styles.metricTrack} cx="18" cy="18" r="15.5" />
                    <circle
                      className={styles.metricProgress}
                      cx="18"
                      cy="18"
                      r="15.5"
                      data-metric-ring
                      data-progress={String(metric.progress ?? 78)}
                      style={{ stroke: metric.accent || '#15c6e2' }}
                    />
                  </svg>
                  <span className={styles.metricValue}>
                    {metric.kind === 'text' ? (
                      metric.display
                    ) : (
                      <span
                        data-metric-count
                        data-end={String(metric.end ?? 0)}
                        data-decimals={String(metric.decimals ?? 0)}
                        data-suffix={metric.suffix || ''}
                        data-prefix={metric.prefix || ''}
                      >
                        0
                      </span>
                    )}
                  </span>
                </div>
                <div className={styles.metricCopy}>
                  <h3>{metric.label}</h3>
                  <p>{metric.text}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
