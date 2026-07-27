import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container, Section, Text } from '@/components/ui'
import { homeWork, publishedCaseStudies } from '@/content/caseStudies'
import styles from './CaseStudiesPage.module.css'

export function CaseStudiesPage() {
  const items = publishedCaseStudies

  return (
    <>
      <PageMeta
        title="Case Studies"
        description="Outcome-led product stories published when clients approve detail. Mernify does not invent customers or metrics."
        canonicalPath="/case-studies"
      />
      <PageHero eyebrow={homeWork.eyebrow} title={homeWork.title} support={homeWork.support} />
      <Section tone="light" className={styles.section}>
        <Container>
          {items.length ? (
            <ul className={styles.grid} role="list">
              {items.map((item) => (
                <li key={item.slug}>
                  <Link to={`/case-studies/${item.slug}`} className={styles.card} data-case-link>
                    <div className={styles.top}>
                      <span className={styles.industry}>{item.industry}</span>
                    </div>
                    <h2>{item.title}</h2>
                    <Text muted className={styles.excerpt}>
                      {item.challenge}
                    </Text>
                    <span className={styles.cta}>
                      Read case study <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty} role="status">
              <h2>{homeWork.empty.title}</h2>
              <Text muted>{homeWork.empty.body}</Text>
              <div className={styles.emptyActions}>
                <Button as={Link} to={homeWork.empty.cta.to} size="lg">
                  {homeWork.empty.cta.label}
                </Button>
                <Button as={Link} to={homeWork.empty.secondary.to} variant="secondary" size="lg">
                  {homeWork.empty.secondary.label}
                </Button>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
