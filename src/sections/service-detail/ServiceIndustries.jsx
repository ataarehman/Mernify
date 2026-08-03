import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Globe,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Truck,
  Wrench,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { industries } from '@/content/industries'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ServiceIndustries.module.css'

gsap.registerPlugin(ScrollTrigger)

const INDUSTRY_VISUALS = {
  healthcare: { Icon: HeartPulse, accent: '#22d3ee', label: 'Care systems' },
  'financial-services': { Icon: Landmark, accent: '#818cf8', label: 'Money flows' },
  logistics: { Icon: Truck, accent: '#34d399', label: 'Movement' },
  retail: { Icon: ShoppingBag, accent: '#f472b6', label: 'Commerce' },
  education: { Icon: GraduationCap, accent: '#a78bfa', label: 'Learning' },
  'field-service': { Icon: Wrench, accent: '#38bdf8', label: 'Field ops' },
  construction: { Icon: Wrench, accent: '#fbbf24', label: 'Build' },
  'real-estate': { Icon: Landmark, accent: '#fb7185', label: 'Property' },
  manufacturing: { Icon: Truck, accent: '#2dd4bf', label: 'Production' },
  travel: { Icon: Globe, accent: '#67e8f9', label: 'Journeys' },
}

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

export function ServiceIndustries({ content }) {
  const rootRef = useRef(null)
  const constellationRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  const items = (content.slugs || [])
    .map((slug) => {
      const base = industries.find((item) => item.slug === slug)
      if (!base) return null
      const visual = INDUSTRY_VISUALS[slug] || INDUSTRY_VISUALS.logistics
      return { ...base, ...visual }
    })
    .filter(Boolean)

  const [activeSlug, setActiveSlug] = useState(items[0]?.slug || null)
  const active = items.find((item) => item.slug === activeSlug) || items[0]

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    y: 28,
    deps: [content?.title],
  })

  useLayoutEffect(() => {
    const root = constellationRef.current
    if (!root || prefersReducedMotion || !items.length) return undefined

    const nodes = root.querySelectorAll('[data-industry-node]')
    const spine = root.querySelector('[data-industry-spine]')
    if (!nodes.length) return undefined

    const light = isLightMotion()
    const ctx = gsap.context(() => {
      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: root,
              start: 'top 75%',
              end: 'bottom 55%',
              scrub: light ? false : 0.7,
              once: light,
            },
            duration: light ? 0.9 : undefined,
          },
        )
      }

      gsap.fromTo(
        nodes,
        { autoAlpha: 0, x: (i) => (i % 2 === 0 ? -36 : 36), scale: 0.9 },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: light ? 0.7 : 0.95,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 72%',
            once: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion, items.length])

  if (!items.length) return null

  const ActiveIcon = active?.Icon || Truck

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="service-industries-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.mesh} />
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

        <div className={styles.stage}>
          <div ref={constellationRef} className={styles.constellation}>
            <span className={styles.spine} data-industry-spine aria-hidden="true" />

            <ol className={styles.nodes} role="list">
              {items.map((item, index) => {
                const isActive = item.slug === active?.slug
                const Icon = item.Icon
                const side = index % 2 === 0 ? 'left' : 'right'

                return (
                  <li
                    key={item.slug}
                    className={[
                      styles.nodeRow,
                      side === 'left' ? styles.sideLeft : styles.sideRight,
                      isActive ? styles.nodeRowActive : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    data-industry-node
                    style={{ '--accent': item.accent }}
                  >
                    <button
                      type="button"
                      className={styles.nodeHit}
                      aria-pressed={isActive}
                      onMouseEnter={() => setActiveSlug(item.slug)}
                      onFocus={() => setActiveSlug(item.slug)}
                      onClick={() => setActiveSlug(item.slug)}
                    >
                      <span className={styles.nodeOrb} aria-hidden="true">
                        <span className={styles.nodeRing} />
                        <span className={styles.nodeCore}>
                          <Icon size={18} strokeWidth={2.1} />
                        </span>
                      </span>

                      <span className={styles.nodeCopy}>
                        <span className={styles.nodeMeta}>
                          <span className={styles.nodeIndex}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className={styles.nodeLabel}>{item.label}</span>
                        </span>
                        <span className={styles.nodeTitle}>{item.title}</span>
                        <span className={styles.nodeSummary}>{item.summary}</span>
                      </span>
                    </button>

                    <span className={styles.branch} aria-hidden="true" />
                  </li>
                )
              })}
            </ol>
          </div>

          <aside
            className={styles.focus}
            data-fade-up
            data-delay="120"
            aria-live="polite"
            style={active ? { '--accent': active.accent } : undefined}
          >
            <div className={styles.focusGlow} aria-hidden="true" />
            <div className={styles.focusIcon} aria-hidden="true">
              <ActiveIcon size={28} strokeWidth={1.8} />
            </div>
            <p className={styles.focusEyebrow}>In focus</p>
            <h3 className={styles.focusTitle}>{active?.title}</h3>
            <p className={styles.focusText}>{active?.summary}</p>
            {active?.focus?.length ? (
              <ul className={styles.focusList} role="list">
                {active.focus.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
            <Link to="/industries" className={styles.focusCta}>
              View industry patterns <ArrowUpRight size={16} />
            </Link>
          </aside>
        </div>
      </Container>
    </section>
  )
}
