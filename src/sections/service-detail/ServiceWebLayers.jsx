import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  AppWindow,
  Cloud,
  Database,
  Globe,
  Server,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ServiceWebLayers.module.css'

gsap.registerPlugin(ScrollTrigger)

const LAYER_ICONS = [Globe, Cloud, AppWindow, Server, Database]

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

export function ServiceWebLayers({ content }) {
  const rootRef = useRef(null)
  const stackRef = useRef(null)
  const detailRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  const layers = content?.layers || []
  const [activeId, setActiveId] = useState(layers[0]?.id || null)

  const active = useMemo(
    () => layers.find((l) => l.id === activeId) || layers[0],
    [layers, activeId],
  )

  const activeIndex = Math.max(
    0,
    layers.findIndex((l) => l.id === active?.id),
  )

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    y: 28,
    deps: [content?.title],
  })

  useLayoutEffect(() => {
    const stack = stackRef.current
    if (!stack || prefersReducedMotion || !layers.length) return undefined

    const light = isLightMotion()
    const layerEls = stack.querySelectorAll('[data-layer]')
    const connectors = stack.querySelectorAll('[data-connector]')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layerEls,
        { autoAlpha: 0, x: light ? 0 : -28, y: light ? 18 : 0 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: light ? 0.5 : 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: stack, start: 'top 72%', once: true },
        },
      )

      gsap.fromTo(
        connectors,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: light ? 0.45 : 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: stack, start: 'top 70%', once: true },
        },
      )

      if (!light) {
        connectors.forEach((el, i) => {
          const pulse = el.querySelector('[data-pulse]')
          if (!pulse) return
          gsap.to(pulse, {
            y: '100%',
            duration: 1.6 + i * 0.15,
            repeat: -1,
            ease: 'none',
            delay: i * 0.2,
          })
        })
      }
    }, stack)

    return () => ctx.revert()
  }, [prefersReducedMotion, layers.length])

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

  if (!layers.length) return null

  const ActiveIcon = LAYER_ICONS[activeIndex % LAYER_ICONS.length] || Globe

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="web-layers-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.mesh} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="web-layers-title" className={styles.title}>
            {content.title}
          </h2>
          {content.support ? <p className={styles.support}>{content.support}</p> : null}
        </header>

        <div className={styles.layout}>
          <div ref={stackRef} className={styles.stack} aria-label="Web request layers">
            {layers.map((layer, index) => {
              const Icon = LAYER_ICONS[index % LAYER_ICONS.length] || Globe
              const isActive = layer.id === active?.id
              return (
                <div key={layer.id} className={styles.stackItem}>
                  {index > 0 ? (
                    <div className={styles.connector} data-connector aria-hidden="true">
                      <span className={styles.connectorLine} />
                      <span className={styles.connectorPulse} data-pulse />
                    </div>
                  ) : null}
                  <button
                    type="button"
                    className={[styles.layer, isActive ? styles.layerActive : '']
                      .filter(Boolean)
                      .join(' ')}
                    style={{ '--layer-accent': layer.accent || '#15c6e2' }}
                    data-layer
                    aria-pressed={isActive}
                    onMouseEnter={() => {
                      if (!window.matchMedia('(pointer: coarse)').matches) {
                        setActiveId(layer.id)
                      }
                    }}
                    onFocus={() => setActiveId(layer.id)}
                    onClick={() => setActiveId(layer.id)}
                  >
                    <span className={styles.layerIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.layerIcon} aria-hidden="true">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className={styles.layerLabel}>{layer.label}</span>
                    <span className={styles.layerChevron} aria-hidden="true" />
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
                Layer {String(activeIndex + 1).padStart(2, '0')}
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

        <ul className={styles.mobileRail} role="list" aria-label="Web layers">
          {layers.map((layer, index) => {
            const Icon = LAYER_ICONS[index % LAYER_ICONS.length] || Globe
            const isActive = layer.id === active?.id
            return (
              <li key={layer.id}>
                <button
                  type="button"
                  className={[styles.railBtn, isActive ? styles.railBtnActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  style={{ '--layer-accent': layer.accent || '#15c6e2' }}
                  aria-pressed={isActive}
                  onClick={() => setActiveId(layer.id)}
                >
                  <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  {layer.label}
                </button>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
