import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import styles from './CaseStudyNext.module.css'

export function CaseStudyNext({ study }) {
  if (!study) return null

  return (
    <section className={styles.section} aria-labelledby="next-case-title">
      <Container width="wide">
        <Link to={`/case-studies/${study.slug}`} className={styles.card} style={{ '--study-accent': study.accent }}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Next project</p>
            <h2 id="next-case-title">{study.title}</h2>
            <p>{study.tagline}</p>
            <span className={styles.cta}>
              View case study <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </div>
          <div className={styles.media}>
            <img src={study.featuredImage} alt="" loading="lazy" decoding="async" />
          </div>
        </Link>
      </Container>
    </section>
  )
}
