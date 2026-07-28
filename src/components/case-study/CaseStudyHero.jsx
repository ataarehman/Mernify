import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import styles from './CaseStudyHero.module.css'

export function CaseStudyHero({ study }) {
  return (
    <header className={styles.hero} data-header-theme="light">
      <Container width="wide" className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Case study</p>
          <p className={styles.category}>{study.category}</p>
          <h1 className={styles.title}>{study.title}</h1>
          <p className={styles.tagline}>{study.tagline}</p>
          <dl className={styles.facts}>
            <div>
              <dt>Industry</dt>
              <dd>{study.industry}</dd>
            </div>
            <div>
              <dt>Services</dt>
              <dd>{study.services.join(' · ')}</dd>
            </div>
          </dl>
          <div className={styles.actions}>
            {study.liveUrl ? (
              <Button as="a" href={study.liveUrl} target="_blank" rel="noreferrer noopener" size="lg">
                Visit live site <ExternalLink size={16} aria-hidden="true" />
              </Button>
            ) : null}
            <Button as={Link} to="/contact" variant="secondary" size="lg">
              Discuss a similar project
            </Button>
          </div>
        </div>
        <figure className={styles.figure}>
          <img
            src={study.featuredImage}
            alt={`${study.title} featured visual`}
            width={960}
            height={720}
            decoding="async"
          />
        </figure>
      </Container>
    </header>
  )
}
