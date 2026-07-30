import { Link } from 'react-router-dom'
import { getPublishedTestimonials, testimonialsContent } from '@/content/testimonials'
import styles from './Testimonials.module.css'

/**
 * Renders only client-approved testimonials. Returns null when none are published.
 */
export function Testimonials({ className = '' }) {
  const items = getPublishedTestimonials()
  if (!items.length) return null

  return (
    <section
      className={[styles.section, className].filter(Boolean).join(' ')}
      aria-labelledby="testimonials-title"
      data-header-theme="light"
    >
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{testimonialsContent.eyebrow}</p>
        <h2 id="testimonials-title" className={styles.title}>
          {testimonialsContent.title}
        </h2>
        <p className={styles.support}>{testimonialsContent.support}</p>
      </div>
      <ul className={styles.grid} role="list">
        {items.map((item) => (
          <li key={item.id} className={styles.card}>
            <blockquote className={styles.quote}>
              <p>“{item.quote}”</p>
            </blockquote>
            <div className={styles.person}>
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <div>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.role}>
                  {[item.role, item.company].filter(Boolean).join(' · ')}
                </p>
                {item.caseStudySlug ? (
                  <Link to={`/case-studies/${item.caseStudySlug}`} className={styles.caseLink}>
                    View related work
                  </Link>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
