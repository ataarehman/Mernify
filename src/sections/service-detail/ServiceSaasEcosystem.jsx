import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  Cloud,
  Database,
  KeyRound,
  LayoutDashboard,
  Link2,
  ShieldCheck,
  Users,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ServiceSaasEcosystem.module.css'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  users: Users,
  subscription: LayoutDashboard,
  cloud: Cloud,
  database: Database,
  analytics: Activity,
  security: ShieldCheck,
  integrations: Link2,
  auth: KeyRound,
}

const NODE_LAYOUT = [
  { id: 'users', x: 18, y: 18 },
  { id: 'subscription', x: 50, y: 8 },
  { id: 'cloud', x: 82, y: 18 },
  { id: 'auth', x: 10, y: 52 },
  { id: 'integrations', x: 90, y: 52 },
  { id: 'database', x: 22, y: 84 },
  { id: 'analytics', x: 50, y: 92 },
  { id: 'security', x: 78, y: 84 },
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

export function ServiceSaasEcosystem({ content }) {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const detailRef = useRef(null)
  const statsRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  const nodes = content?.nodes || []
  const hub = content?.hub
  const stats = content?.stats || []
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
    const lines = stage.querySelectorAll('[data-eco-line]')
    const nodeEls = stage.querySelectorAll('[data-eco-node]')
    const hubEl = stage.querySelector('[data-eco-hub]')

    const ctx = gsap.context(() => {
      if (hubEl) {
        gsap.fromTo(
          hubEl,
          { autoAlpha: 0, scale: 0.86 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: light ? 0.6 : 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: stage, start: 'top 75%', once: true },
          },
        )
      }

      gsap.fromTo(
        lines,
        { strokeDashoffset: (i, el) => Number(el.getAttribute('data-len') || 120) },
        {
          strokeDashoffset: 0,
          duration: light ? 0.7 : 1.1,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: stage, start: 'top 72%', once: true },
        },
      )

      gsap.fromTo(
        nodeEls,
        { autoAlpha: 0, scale: 0.8 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: light ? 0.5 : 0.75,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: stage, start: 'top 70%', once: true },
        },
      )

      if (!light) {
        const floats = stage.querySelectorAll('[data-eco-float]')
        floats.forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -6 : 6,
            duration: 2.8 + (i % 3) * 0.35,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.12,
          })
        })
      }
    }, stage)

    return () => ctx.revert()
  }, [prefersReducedMotion, nodes.length])

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

      panel.querySelectorAll('[data-progress]').forEach((bar) => {
        const target = Number(bar.getAttribute('data-progress') || 0)
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: Math.min(1, target / 100),
            duration: 0.7,
            ease: 'power2.out',
            transformOrigin: 'left center',
          },
        )
      })
    }, panel)

    return () => ctx.revert()
  }, [activeId, prefersReducedMotion])

  useLayoutEffect(() => {
    const root = statsRef.current
    if (!root || prefersReducedMotion || !stats.length) return undefined

    const counters = root.querySelectorAll('[data-stat-value]')
    const ctx = gsap.context(() => {
      counters.forEach((el) => {
        const staticDisplay = el.getAttribute('data-static')
        if (staticDisplay) {
          el.textContent = staticDisplay
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            },
          )
          return
        }

        const end = Number(el.getAttribute('data-end') || 0)
        const decimals = Number(el.getAttribute('data-decimals') || 0)
        const suffix = el.getAttribute('data-suffix') || ''
        const obj = { val: 0 }

        gsap.to(obj, {
          val: end,
          duration: 1.35,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${formatStatValue(obj.val, decimals)}${suffix}`
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion, stats.length])

  if (!nodes.length || !hub) return null

  const ActiveIcon = ICONS[active?.icon] || LayoutDashboard
  const HubIcon = ICONS[hub.icon] || LayoutDashboard

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="saas-ecosystem-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.mesh} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="saas-ecosystem-title" className={styles.title}>
            {content.title}
          </h2>
          {content.support ? <p className={styles.support}>{content.support}</p> : null}
        </header>

        <div className={styles.layout}>
          <div ref={stageRef} className={styles.stage} aria-label="SaaS product ecosystem">
            <div className={styles.stageGrid} aria-hidden="true" />
            <svg className={styles.lines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {nodes.map((node) => {
                const pos = layoutMap[node.id] || { x: 50, y: 50 }
                const len = Math.hypot(pos.x - 50, pos.y - 50)
                const isActive = node.id === active?.id
                return (
                  <line
                    key={node.id}
                    data-eco-line
                    data-len={String(Math.round(len * 1.6))}
                    x1={50}
                    y1={50}
                    x2={pos.x}
                    y2={pos.y}
                    className={isActive ? styles.lineActive : styles.line}
                    style={{
                      strokeDasharray: Math.round(len * 1.6),
                      strokeDashoffset: Math.round(len * 1.6),
                    }}
                  />
                )
              })}
            </svg>

            <div className={styles.hub} data-eco-hub>
              <span className={styles.hubGlow} aria-hidden="true" />
              <span className={styles.hubRing} aria-hidden="true" />
              <span className={styles.hubCore}>
                <HubIcon size={28} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <p className={styles.hubLabel}>{hub.label}</p>
              <p className={styles.hubHint}>{hub.hint}</p>
              {hub.metric ? <p className={styles.hubMetric}>{hub.metric}</p> : null}
            </div>

            {nodes.map((node) => {
              const pos = layoutMap[node.id] || { x: 50, y: 50 }
              const Icon = ICONS[node.icon] || LayoutDashboard
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
                  data-eco-node
                  aria-pressed={isActive}
                  onMouseEnter={() => {
                    if (!window.matchMedia('(pointer: coarse)').matches) setActiveId(node.id)
                  }}
                  onFocus={() => setActiveId(node.id)}
                  onClick={() => setActiveId(node.id)}
                >
                  <span className={styles.nodeFloat} data-eco-float>
                    <span className={styles.nodeIcon} aria-hidden="true">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <span className={styles.nodeLabel}>{node.label}</span>
                  </span>
                </button>
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
              {active?.chip ? <span className={styles.detailChip}>{active.chip}</span> : null}
            </div>
            <p className={styles.detailEyebrow} data-detail-anim>
              {active?.tag || 'Ecosystem layer'}
            </p>
            <h3 className={styles.detailTitle} data-detail-anim>
              {active?.title}
            </h3>
            <p className={styles.detailText} data-detail-anim>
              {active?.text}
            </p>
            {active?.benefit ? (
              <p className={styles.detailBenefit} data-detail-anim>
                <strong>Why it matters:</strong> {active.benefit}
              </p>
            ) : null}

            {active?.metrics?.length ? (
              <div className={styles.meterBlock} data-detail-anim>
                {active.metrics.map((metric) => (
                  <div key={metric.label} className={styles.meter}>
                    <div className={styles.meterHead}>
                      <span>{metric.label}</span>
                      <span>
                        {metric.value}
                        {metric.unit}
                      </span>
                    </div>
                    <div className={styles.meterTrack}>
                      <span
                        className={styles.meterFill}
                        data-progress={String(metric.value)}
                        style={{ '--fill': `${Math.min(100, metric.value)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {active?.points?.length ? (
              <ul className={styles.detailPoints} role="list" data-detail-anim>
                {active.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}

            <div className={styles.miniDash} aria-hidden="true" data-detail-anim>
              <span className={styles.miniBar} style={{ '--h': '58%' }} />
              <span className={styles.miniBar} style={{ '--h': '78%' }} />
              <span className={styles.miniBar} style={{ '--h': '46%' }} />
              <span className={styles.miniBar} style={{ '--h': '88%' }} />
              <span className={styles.miniBar} style={{ '--h': '66%' }} />
            </div>
          </aside>
        </div>

        <ul className={styles.mobileRail} role="list" aria-label="Ecosystem layers">
          {nodes.map((node) => {
            const Icon = ICONS[node.icon] || LayoutDashboard
            const isActive = node.id === active?.id
            return (
              <li key={node.id}>
                <button
                  type="button"
                  className={[styles.railBtn, isActive ? styles.railBtnActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  style={{ '--node-accent': node.accent || '#15c6e2' }}
                  aria-pressed={isActive}
                  onClick={() => setActiveId(node.id)}
                >
                  <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  {node.label}
                </button>
              </li>
            )
          })}
        </ul>

        {stats.length ? (
          <div ref={statsRef} className={styles.stats} data-fade-up data-delay="120">
            {stats.map((stat) => (
              <article key={stat.label} className={styles.statCard}>
                <p
                  className={styles.statValue}
                  data-stat-value
                  data-end={String(stat.value)}
                  data-decimals={String(stat.decimals ?? 0)}
                  data-suffix={stat.suffix || ''}
                  data-static={stat.staticDisplay || undefined}
                >
                  {prefersReducedMotion
                    ? stat.staticDisplay ||
                      `${formatStatValue(stat.value, stat.decimals ?? 0)}${stat.suffix || ''}`
                    : stat.staticDisplay || `0${stat.suffix || ''}`}
                </p>
                <p className={styles.statLabel}>{stat.label}</p>
                {stat.hint ? <p className={styles.statHint}>{stat.hint}</p> : null}
              </article>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
