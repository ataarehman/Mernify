import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, TriangleAlert } from 'lucide-react'
import gsap from 'gsap'
import { Container, Eyebrow } from '@/components/ui'
import { industries, industriesPage } from '@/content/industries'
import { getCaseStudyBySlug } from '@/content/caseStudies'
import { getIndustryVisual } from '@/lib/industryVisuals'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './IndustriesSolutions.module.css'

export function IndustriesSolutions({ activeSlug, onSelect }) {
  const { eyebrow, title, support } = industriesPage.solutions
  const panelRef = useRef(null)
  const railRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  const active = industries.find((item) => item.slug === activeSlug) || industries[0]
  const { Icon, accent, label } = getIndustryVisual(active.slug)
  const proof = active.proof ? getCaseStudyBySlug(active.proof) : null

  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel || prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.querySelectorAll('[data-panel-anim]'),
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' },
      )
    }, panel)

    return () => ctx.revert()
  }, [active.slug, prefersReducedMotion])

  const onRailKeyDown = (event) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()

    const index = industries.findIndex((item) => item.slug === active.slug)
    const last = industries.length - 1
    let next = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = last

    const slug = industries[next].slug
    onSelect?.(slug)
    // Focus after React commits the new roving tabindex.
    requestAnimationFrame(() => {
      railRef.current?.querySelector(`#industry-tab-${slug}`)?.focus()
    })
  }

  useLayoutEffect(() => {
    const rail = railRef.current
    const current = rail?.querySelector('[aria-selected="true"]')
    if (!rail || !current || typeof current.scrollIntoView !== 'function') return
    if (!window.matchMedia('(max-width: 991px)').matches) return
    current.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [active.slug, prefersReducedMotion])

  return (
    <section
      id="industry-solutions"
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="industries-solutions-title"
      style={{ '--industry-accent': accent }}
    >
      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-fade-up>
          <Eyebrow rule className={styles.eyebrow}>
            {eyebrow}
          </Eyebrow>
          <h2 id="industries-solutions-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.support}>{support}</p>
        </header>

        <div className={styles.explorer} data-fade-up data-delay="120">
          <div
            ref={railRef}
            className={styles.rail}
            role="tablist"
            aria-label="Select an industry"
            onKeyDown={onRailKeyDown}
          >
            {industries.map((item) => {
              const isActive = item.slug === active.slug
              const visual = getIndustryVisual(item.slug)
              const TabIcon = visual.Icon
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  id={`industry-tab-${item.slug}`}
                  aria-selected={isActive}
                  aria-controls="industry-solution-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={[styles.tab, isActive ? styles.tabActive : ''].filter(Boolean).join(' ')}
                  style={{ '--tab-accent': visual.accent }}
                  onClick={() => onSelect?.(item.slug)}
                >
                  <span className={styles.tabIcon} aria-hidden="true">
                    <TabIcon size={17} strokeWidth={1.9} />
                  </span>
                  <span className={styles.tabTitle}>{item.title}</span>
                </button>
              )
            })}
          </div>

          <article
            ref={panelRef}
            id="industry-solution-panel"
            role="tabpanel"
            aria-labelledby={`industry-tab-${active.slug}`}
            className={styles.panel}
          >
            <header className={styles.panelHead} data-panel-anim>
              <span className={styles.panelIcon} aria-hidden="true">
                <Icon size={26} strokeWidth={1.7} />
              </span>
              <div>
                <p className={styles.panelLabel}>{label}</p>
                <h3 className={styles.panelTitle}>{active.title}</h3>
              </div>
            </header>

            <div className={styles.block} data-panel-anim>
              <p className={styles.blockLabel}>
                <TriangleAlert size={14} strokeWidth={2.2} aria-hidden="true" />
                The challenge
              </p>
              <p className={styles.challenge}>{active.challenge}</p>
            </div>

            <div className={styles.block} data-panel-anim>
              <p className={styles.blockLabel}>
                <Check size={14} strokeWidth={2.6} aria-hidden="true" />
                What we build
              </p>
              <ul className={styles.solutions} role="list">
                {active.solutions.map((solution) => (
                  <li key={solution}>{solution}</li>
                ))}
              </ul>
            </div>

            <footer className={styles.panelFoot} data-panel-anim>
              <p className={styles.outcome}>
                <span className={styles.outcomeLabel}>Result you should expect</span>
                {active.outcome}
              </p>
              {proof ? (
                <Link to={`/case-studies/${proof.slug}`} className={styles.proof}>
                  <span>
                    Published work: <strong>{proof.title}</strong>
                  </span>
                  <ArrowUpRight size={16} strokeWidth={2.1} aria-hidden="true" />
                </Link>
              ) : (
                <p className={styles.noProof}>
                  No published case study in this sector yet — the patterns above come from
                  comparable product work.
                </p>
              )}
            </footer>
          </article>
        </div>
      </Container>
    </section>
  )
}
