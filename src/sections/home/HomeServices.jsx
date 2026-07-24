import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  LayoutDashboard,
  PenTool,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import { Container, Eyebrow, Heading, Section, TextLink } from '@/components/ui'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { homeServices } from '@/content/services'
import styles from './HomeServices.module.css'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  layoutDashboard: LayoutDashboard,
  smartphone: Smartphone,
  sparkles: Sparkles,
  penTool: PenTool,
  shieldCheck: ShieldCheck,
}

/**
 * Editorial services showcase — interactive index + cinematic media stage.
 * Original Mernify composition (not a TKXEL card-grid clone).
 */
export function HomeServices() {
  const rootRef = useRef(null)
  const mediaRef = useRef(null)
  const detailRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const items = homeServices.items
  const [activeId, setActiveId] = useState(items[0]?.id)
  const activeIndex = items.findIndex((item) => item.id === activeId)
  const active = useMemo(
    () => items.find((item) => item.id === activeId) || items[0],
    [activeId, items],
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('[data-services-enter]', { clearProps: 'all', autoAlpha: 1, y: 0 })
        return
      }

      gsap.fromTo(
        '[data-services-enter]',
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            id: 'mf:home:services',
            trigger: root,
            start: 'top 78%',
            once: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return undefined
    const media = mediaRef.current
    const detail = detailRef.current
    if (!media || !detail) return undefined

    const ctx = gsap.context(() => {
      const img = media.querySelector('img')
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        media,
        { clipPath: 'inset(12% 10% 12% 10% round 18px)', scale: 1.04, autoAlpha: 0.4 },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1, autoAlpha: 1, duration: 0.75 },
        0,
      )
        .fromTo(
          img,
          { scale: 1.12, yPercent: 4 },
          { scale: 1.04, yPercent: 0, duration: 0.9, ease: 'power2.out' },
          0,
        )
        .fromTo(
          detail.querySelectorAll('[data-service-detail]'),
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.48, stagger: 0.055 },
          0.18,
        )
    })

    return () => ctx.revert()
  }, [activeId, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return undefined
    const media = mediaRef.current
    if (!media) return undefined

    const onMove = (event) => {
      const rect = media.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14
      gsap.to(media.querySelector('img'), {
        x: x * -0.4,
        y: y * -0.4,
        duration: 0.75,
        ease: 'power3.out',
        overwrite: true,
      })
    }

    const onLeave = () => {
      gsap.to(media.querySelector('img'), {
        x: 0,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
      })
    }

    media.addEventListener('pointermove', onMove)
    media.addEventListener('pointerleave', onLeave)
    return () => {
      media.removeEventListener('pointermove', onMove)
      media.removeEventListener('pointerleave', onLeave)
    }
  }, [prefersReducedMotion, activeId])

  const activate = (id) => setActiveId(id)

  const onRowKeyDown = (event, index) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      const next = items[(index + 1) % items.length]
      activate(next.id)
      rootRef.current
        ?.querySelector(`[data-service-id="${next.id}"]`)
        ?.focus()
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      const prev = items[(index - 1 + items.length) % items.length]
      activate(prev.id)
      rootRef.current
        ?.querySelector(`[data-service-id="${prev.id}"]`)
        ?.focus()
    }
  }

  const exploreLabel = active.title
    .replace(' Development', '')
    .replace(' & Strategy', '')

  return (
    <Section
      ref={rootRef}
      tone="light"
      headerTheme="light"
      className={styles.services}
      aria-labelledby="home-services-title"
      style={{ '--mf-services-glow': active.glow }}
    >
      <Container>
        <div className={styles.intro} data-services-enter>
          <div className={styles.introCopy}>
            <Eyebrow>{homeServices.eyebrow}</Eyebrow>
            <Heading id="home-services-title" level={2} className={styles.title}>
              {homeServices.title}
            </Heading>
            <p className={styles.support}>{homeServices.support}</p>
          </div>
          <TextLink to={homeServices.viewAll.to} className={styles.viewAll}>
            {homeServices.viewAll.label}
            <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </TextLink>
        </div>

        <div className={styles.stage} data-services-enter>
          <ul className={styles.list} role="list">
            {items.map((item, index) => {
              const Icon = ICONS[item.icon] || LayoutDashboard
              const isActive = item.id === active.id
              return (
                <li key={item.id} className={styles.listItem}>
                  <button
                    type="button"
                    id={`service-trigger-${item.id}`}
                    data-service-id={item.id}
                    className={[styles.row, isActive ? styles.rowActive : ''].join(' ')}
                    aria-pressed={isActive}
                    aria-controls="service-panel"
                    data-cursor="interactive"
                    onMouseEnter={() => {
                      if (window.matchMedia('(hover: hover)').matches) activate(item.id)
                    }}
                    onFocus={() => activate(item.id)}
                    onClick={() => activate(item.id)}
                    onKeyDown={(event) => onRowKeyDown(event, index)}
                  >
                    <span className={styles.rowMeta} aria-hidden="true">
                      <span className={styles.rowRail} />
                    </span>
                    <span className={styles.index}>{item.index}</span>
                    <span className={styles.rowMain}>
                      <span className={styles.iconWrap} aria-hidden="true">
                        <Icon className={styles.icon} size={18} strokeWidth={1.55} />
                      </span>
                      <span className={styles.rowText}>
                        <span className={styles.rowTitle}>{item.title}</span>
                        <span
                          className={[
                            styles.rowSummary,
                            isActive ? styles.rowSummaryOpen : '',
                          ].join(' ')}
                        >
                          {item.summary}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div
            id="service-panel"
            className={styles.panel}
            role="region"
            aria-labelledby={`service-trigger-${active.id}`}
            aria-live="polite"
          >
            <div className={styles.media} ref={mediaRef} data-cursor="media">
              <img
                key={active.id}
                src={active.image}
                alt={active.imageAlt}
                width={1600}
                height={1066}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.mediaVeil} aria-hidden="true" />
              <p className={styles.mediaIndex} aria-hidden="true">
                {active.index}
                <span> / 0{items.length}</span>
              </p>
            </div>

            <div className={styles.detail} ref={detailRef}>
              <div className={styles.detailHead} data-service-detail>
                <p className={styles.detailEyebrow}>Service 0{activeIndex + 1}</p>
                <h3 className={styles.detailTitle}>{active.title}</h3>
              </div>
              <p className={styles.detailBody} data-service-detail>
                {active.description}
              </p>
              <ul className={styles.caps} data-service-detail>
                {active.capabilities.map((cap) => (
                  <li key={cap}>{cap}</li>
                ))}
              </ul>
              <Link
                to={`/services/${active.slug}`}
                className={styles.detailLink}
                data-service-detail
                data-cursor="interactive"
              >
                Explore {exploreLabel}
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
