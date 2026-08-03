import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { services } from '@/content/services'
import { getServiceImage } from '@/lib/templateMedia'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './ServicesTwo.module.css'

/** Featured set matches index-2.html service-two titles / order. */
const FEATURED_SLUGS = [
  'product-engineering',
  'saas-development',
  'web-development',
  'mobile-app-development',
  'ai-integration',
]

const PANEL_COPY =
  'A curated selection of projects where strategy, creativity, and digital craftsmanship come together. Each work reflects our commitment to design and meaningful experiences.'

function resolveFeatured() {
  return FEATURED_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean)
}

/**
 * index-2.html `.service-two-area`: giant title list + hover-synced detail panel.
 * JS parity: mouseenter swaps `.active` and reveals matching thumb (0.3s ease-in).
 * AOS parity: fade-up 1000ms, delays 200 / 300, replay on scroll.
 */
export function ServicesTwo() {
  const rootRef = useRef(null)
  const featured = resolveFeatured()
  const [activeIndex, setActiveIndex] = useState(0)

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top bottom',
    duration: 1,
    once: false,
    ease: 'power1.out',
    y: 40,
  })

  if (!featured.length) return null

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="services-two-heading"
    >
      <h2 id="services-two-heading" className={styles.srOnly}>
        Services
      </h2>

      <img
        className={styles.bg}
        src="/assets/images/shapes/service-two-bg.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />

      <Container width="wide" className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.listWrap} data-fade-up data-delay="200" data-duration="1000">
            <ul className={styles.list} role="list">
              {featured.map((item, index) => {
                const isActive = activeIndex === index
                return (
                  <li key={item.slug}>
                    <button
                      type="button"
                      className={[styles.listItem, isActive ? styles.listItemActive : '']
                        .filter(Boolean)
                        .join(' ')}
                      aria-current={isActive ? 'true' : undefined}
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                    >
                      <span className={styles.border} aria-hidden="true" />
                      <span className={styles.title}>
                        {item.slug === 'mobile-app-development'
                          ? 'Mobile Apps'
                          : item.slug === 'saas-development'
                            ? 'SaaS Development'
                            : item.slug === 'web-development'
                              ? 'Web Development'
                              : item.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={styles.thumbWrap} data-fade-up data-delay="300" data-duration="1000">
            <div className={styles.thumbStage}>
              {featured.map((item, index) => {
                const isActive = activeIndex === index
                const thumbSrc =
                  index % 2 === 0
                    ? '/assets/images/thumbs/service-two-thumb1.jpg'
                    : '/assets/images/thumbs/service-two-thumb2.jpg'

                return (
                  <article
                    key={item.slug}
                    className={[styles.panel, isActive ? styles.panelActive : ''].filter(Boolean).join(' ')}
                    aria-hidden={!isActive}
                  >
                    <div className={styles.panelInner}>
                      <Link to={`/services/${item.slug}`} className={styles.panelMedia}>
                        <img
                          src={getServiceImage(item.slug) || thumbSrc}
                          alt=""
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                      </Link>
                      <div className={styles.panelFooter}>
                        <p className={styles.panelText}>{item.description || PANEL_COPY}</p>
                        <Link
                          to={`/services/${item.slug}`}
                          className={styles.panelArrow}
                          aria-label={`View ${item.title}`}
                        >
                          <ArrowUpRight size={28} strokeWidth={2.25} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
