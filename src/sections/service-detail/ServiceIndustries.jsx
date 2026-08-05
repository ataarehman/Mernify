import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Truck } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { industries } from '@/content/industries'
import { getIndustryVisual } from '@/lib/industryVisuals'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ServiceIndustries.module.css'

gsap.registerPlugin(ScrollTrigger)

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

export function ServiceIndustries({ content }) {
  const rootRef = useRef(null)
  const showcaseRef = useRef(null)
  const detailRef = useRef(null)
  const railRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  const items = (content.slugs || [])
    .map((slug) => {
      const base = industries.find((item) => item.slug === slug)
      if (!base) return null
      return { ...base, ...getIndustryVisual(slug) }
    })
    .filter(Boolean)

  const [activeSlug, setActiveSlug] = useState(items[0]?.slug || null)
  const active = items.find((item) => item.slug === activeSlug) || items[0]
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.slug === active?.slug),
  )

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    y: 28,
    deps: [content?.title],
  })

  useLayoutEffect(() => {
    const root = showcaseRef.current
    if (!root || prefersReducedMotion || !items.length) return undefined

    const light = isLightMotion()
    const ctx = gsap.context(() => {
      const tiles = root.querySelectorAll('[data-industry-tile]')
      const connector = root.querySelector('[data-industry-connector]')

      if (connector) {
        gsap.fromTo(
          connector,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'power2.out',
            transformOrigin: 'left center',
            duration: light ? 0.7 : 1.05,
            scrollTrigger: {
              trigger: root,
              start: 'top 78%',
              once: true,
            },
          },
        )
      }

      gsap.fromTo(
        tiles,
        { autoAlpha: 0, y: 28, scale: 0.92 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: light ? 0.55 : 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 76%',
            once: true,
          },
        },
      )

      if (!light) {
        const icons = root.querySelectorAll(`.${styles.tileIcon}`)
        icons.forEach((icon, i) => {
          gsap.to(icon, {
            y: i % 2 === 0 ? -5 : 5,
            duration: 2.6 + (i % 3) * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.15,
          })
        })
      }
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion, items.length])

  useLayoutEffect(() => {
    const panel = detailRef.current
    if (!panel || prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.querySelectorAll('[data-detail-anim]'),
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
        },
      )
    }, panel)

    return () => ctx.revert()
  }, [activeSlug, prefersReducedMotion])

  useLayoutEffect(() => {
    const rail = railRef.current
    const activeBtn = rail?.querySelector('[aria-pressed="true"]')
    if (!rail || !activeBtn || typeof activeBtn.scrollIntoView !== 'function') return
    if (!window.matchMedia('(max-width: 899px)').matches) return
    activeBtn.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest' })
  }, [activeSlug, prefersReducedMotion])

  if (!items.length) return null

  const ActiveIcon = active?.Icon || Truck

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="service-industries-title"
      style={active ? { '--accent': active.accent } : undefined}
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.orbThree} />
        <span className={styles.mesh} />
        <span className={styles.horizon} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <div className={styles.headerCopy}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h2 id="service-industries-title" className={styles.title}>
              {content.title}
            </h2>
            {content.support ? <p className={styles.support}>{content.support}</p> : null}
          </div>
          <Link to="/industries" className={styles.all}>
            Explore industries <ArrowUpRight size={17} />
          </Link>
        </header>

        <div ref={showcaseRef} className={styles.showcase}>
          <div className={styles.railWrap}>
            <span className={styles.connector} data-industry-connector aria-hidden="true" />
            <ul ref={railRef} className={styles.rail} role="list" aria-label="Industries">
              {items.map((item, index) => {
                const isActive = item.slug === active?.slug
                const Icon = item.Icon
                return (
                  <li key={item.slug} className={styles.railItem} data-industry-tile>
                    <button
                      type="button"
                      className={[styles.tile, isActive ? styles.tileActive : ''].filter(Boolean).join(' ')}
                      style={{ '--tile-accent': item.accent }}
                      aria-pressed={isActive}
                      onMouseEnter={() => {
                        if (!window.matchMedia('(pointer: coarse)').matches) {
                          setActiveSlug(item.slug)
                        }
                      }}
                      onFocus={() => setActiveSlug(item.slug)}
                      onClick={() => setActiveSlug(item.slug)}
                    >
                      <span className={styles.tileGlow} aria-hidden="true" />
                      <span className={styles.tileIcon} aria-hidden="true">
                        <Icon size={22} strokeWidth={1.9} />
                      </span>
                      <span className={styles.tileMeta}>
                        <span className={styles.tileIndex}>{String(index + 1).padStart(2, '0')}</span>
                        <span className={styles.tileTitle}>{item.title}</span>
                        <span className={styles.tileLabel}>{item.label}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <article
            ref={detailRef}
            className={styles.detail}
            aria-live="polite"
            data-motif={active?.motif || 'pulse'}
          >
            <div className={styles.detailVisual} aria-hidden="true" data-detail-anim>
              <div className={styles.visualFrame}>
                <span className={styles.visualHalo} />
                <span className={styles.visualRing} />
                <span className={styles.visualCore}>
                  <ActiveIcon size={42} strokeWidth={1.55} />
                </span>
                <span className={styles.visualOrbit} />
                <span className={styles.visualSpark} data-spark="a" />
                <span className={styles.visualSpark} data-spark="b" />
                <span className={styles.visualSpark} data-spark="c" />
              </div>
              <p className={styles.visualIndex}>
                <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                <span>/</span>
                <span>{String(items.length).padStart(2, '0')}</span>
              </p>
            </div>

            <div className={styles.detailCopy}>
              <p className={styles.detailEyebrow} data-detail-anim>
                {active?.label}
              </p>
              <h3 className={styles.detailTitle} data-detail-anim>
                {active?.title}
              </h3>
              <p className={styles.detailText} data-detail-anim>
                {active?.summary}
              </p>
              {active?.focus?.length ? (
                <ul className={styles.detailList} role="list" data-detail-anim>
                  {active.focus.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              <Link to="/industries" className={styles.detailCta} data-detail-anim>
                View industry patterns <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}
