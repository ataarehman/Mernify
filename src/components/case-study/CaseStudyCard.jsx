import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import styles from './CaseStudyCard.module.css'

const isSvgOnly = (src) => src?.endsWith('cover.svg') || src?.endsWith('.svg')

export function CaseStudyCard({ study, featured = false }) {
  const noPhoto = isSvgOnly(study.featuredImage) || !study.featuredImage
  return (
    <article className={[styles.card, featured ? styles.featured : '', noPhoto ? styles.noPhoto : ''].filter(Boolean).join(' ')}>
      {!noPhoto && (
        <Link to={`/case-studies/${study.slug}`} className={styles.media} data-cursor="View">
          <img
            src={study.featuredImage}
            alt=""
            loading="lazy"
            decoding="async"
            width={featured ? 960 : 640}
            height={featured ? 640 : 420}
          />
          <span className={styles.accent} style={{ '--study-accent': study.accent }} aria-hidden="true" />
        </Link>
      )}
      {noPhoto && (
        <Link to={`/case-studies/${study.slug}`} className={styles.mediaPlaceholder} data-cursor="View">
          <span className={styles.placeholderInitial} style={{ '--study-accent': study.accent || '#4f46e5' }}>
            {study.title.charAt(0)}
          </span>
          <span className={styles.accent} style={{ '--study-accent': study.accent }} aria-hidden="true" />
        </Link>
      )}
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{study.category}</span>
          <span className={styles.industry}>{study.industry}</span>
        </div>
        <h2 className={styles.title}>
          <Link to={`/case-studies/${study.slug}`}>{study.title}</Link>
        </h2>
        <p className={styles.tagline}>{study.tagline}</p>
        <ul className={styles.tags} role="list">
          {study.tags.slice(0, 4).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link to={`/case-studies/${study.slug}`} className={styles.cta}>
            View case study <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          {study.liveUrl ? (
            <a
              className={styles.live}
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Live site <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
