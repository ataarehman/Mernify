import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import styles from './CaseStudyCard.module.css'

const isRaster = (src) =>
  Boolean(src) && !src.endsWith('.svg') && !src.endsWith('cover.svg')

function resolveCover(study) {
  if (isRaster(study.featuredImage)) return study.featuredImage
  const fromGallery = (study.gallery || []).find((item) => isRaster(item.src))
  return fromGallery?.src || null
}

export function CaseStudyCard({ study }) {
  const cover = resolveCover(study)
  const metrics = (study.metrics || []).slice(0, 2)
  const badges = (study.services || []).slice(0, 3)

  return (
    <article
      className={styles.card}
      style={{ '--study-accent': study.accent || '#4f46e5' }}
    >
      <Link
        to={`/case-studies/${study.slug}`}
        className={cover ? styles.media : styles.brandMedia}
        data-cursor="View"
      >
        {cover ? (
          <img
            src={cover}
            alt={`${study.title} preview`}
            loading="lazy"
            decoding="async"
            width={640}
            height={400}
          />
        ) : (
          <>
            <span className={styles.brandGlow} aria-hidden="true" />
            <span className={styles.brandMark}>{study.title.charAt(0)}</span>
            <span className={styles.brandName}>{study.title}</span>
          </>
        )}
        <span className={styles.overlay} aria-hidden="true">
          <span className={styles.overlayLabel}>
            View study <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </span>
      </Link>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{study.category}</span>
          <span className={styles.industry}>{study.industry.split('/')[0].trim()}</span>
        </div>

        <h2 className={styles.title}>
          <Link to={`/case-studies/${study.slug}`}>{study.title}</Link>
        </h2>
        <p className={styles.tagline}>{study.tagline}</p>

        {metrics.length ? (
          <ul className={styles.metrics} role="list">
            {metrics.map((metric) => (
              <li key={`${metric.label}-${metric.value}`}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {badges.length ? (
          <ul className={styles.badges} role="list">
            {badges.map((badge) => (
              <li key={badge}>{badge}</li>
            ))}
          </ul>
        ) : null}

        <div className={styles.actions}>
          <Link to={`/case-studies/${study.slug}`} className={styles.cta}>
            View case study <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          {study.liveUrl ? (
            <a
              className={styles.live}
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Live site <ExternalLink size={13} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
