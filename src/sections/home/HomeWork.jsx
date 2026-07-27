import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Button, Container, Eyebrow, Heading, Section, Text, TextLink } from '@/components/ui'
import { homeWork, publishedCaseStudies } from '@/content/caseStudies'
import styles from './HomeWork.module.css'

export function HomeWork() {
  const items = publishedCaseStudies

  return (
    <Section tone="dark" className={styles.section} aria-labelledby="home-work-title">
      <Container>
        <div className={styles.header}>
          <Eyebrow className={styles.eyebrow}>{homeWork.eyebrow}</Eyebrow>
          <div className={styles.headerRow}>
            <Heading id="home-work-title" level={2}>
              {homeWork.title}
            </Heading>
            {items.length ? (
              <TextLink to={homeWork.viewAll.to} className={styles.viewAll}>
                {homeWork.viewAll.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </TextLink>
            ) : null}
          </div>
          <Text className={styles.support}>{homeWork.support}</Text>
        </div>

        {items.length ? (
          <ul className={styles.grid} role="list">
            {items.map((item) => (
              <li key={item.slug}>
                <Link to={`/case-studies/${item.slug}`} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.industry}>{item.industry}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.challenge}</p>
                  <span className={styles.cta}>
                    Read case study <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty} role="status">
            <h3>{homeWork.empty.title}</h3>
            <p>{homeWork.empty.body}</p>
            <div className={styles.emptyActions}>
              <Button as={Link} to={homeWork.empty.cta.to}>
                {homeWork.empty.cta.label}
              </Button>
              <Button as={Link} to={homeWork.empty.secondary.to} variant="ghost" className={styles.emptyGhost}>
                {homeWork.empty.secondary.label}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Section>
  )
}
