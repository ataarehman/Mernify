import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { homePartners } from '@/content/partners'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './TechBrandGrid.module.css'

export function TechBrandGrid({
  eyebrow = homePartners.eyebrow,
  title = homePartners.title,
  support = homePartners.support,
  cta = homePartners.cta,
  className = '',
  animated = true,
}) {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const clients = homePartners.clients

  useRevealOnScroll(rootRef, {
    selector: animated ? '[data-fade-up]' : '[data-fade-up-disabled]',
    start: 'top 86%',
    y: 28,
    deps: [animated, title],
  })
  useScrubTitle(titleRef)

  return (
    <section
      ref={rootRef}
      className={[styles.section, className].filter(Boolean).join(' ')}
      data-header-theme="light"
      aria-labelledby="tech-brand-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerCopy} data-fade-up>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            <h2 id="tech-brand-title" ref={titleRef} className={styles.title}>
              {animated
                ? splitScrubChars(title).map(({ key, char }) => (
                    <span key={key} data-scrub-char>
                      {char}
                    </span>
                  ))
                : title}
            </h2>
            {support ? <p className={styles.support}>{support}</p> : null}
          </div>

          {cta ? (
            <Link to={cta.to} className={styles.cta} data-fade-up data-delay="80">
              {cta.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ) : null}
        </header>

        <ul className={styles.grid} role="list">
          {clients.map((client, index) => (
            <li
              key={client.id}
              className={styles.item}
              data-fade-up
              data-delay={String((index % 4) * 70 + 60)}
            >
              <Link
                to={client.to}
                className={styles.card}
                aria-label={`${client.name} case study`}
              >
                <span className={styles.idle} data-label={client.name}>
                  <img
                    src={client.logo}
                    alt=""
                    className={styles.logo}
                    loading="lazy"
                    decoding="async"
                  />
                </span>

                <span className={styles.hover} aria-hidden="true">
                  <span className={styles.preview}>
                    <img src={client.image} alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className={styles.hoverMeta}>
                    <span className={styles.hoverName}>{client.name}</span>
                    <span className={styles.hoverCategory}>{client.category}</span>
                  </span>
                  <span className={styles.hoverArrow}>
                    <ArrowUpRight size={15} strokeWidth={2.25} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
