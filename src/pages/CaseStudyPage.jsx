import { Link, useParams } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container, Section, Text } from '@/components/ui'
import { getCaseStudyBySlug } from '@/content/caseStudies'
import { NotFoundPage } from '@/pages/NotFoundPage'
import styles from './CaseStudyPage.module.css'

export function CaseStudyPage() {
  const { slug } = useParams()
  const study = getCaseStudyBySlug(slug)

  if (!study) {
    return <NotFoundPage />
  }

  const isPublished = study.status === 'published'

  if (!isPublished) {
    return (
      <>
        <PageMeta
          title="Case study pending publication"
          description="This case study is not publicly available yet."
          canonicalPath={`/case-studies/${study.slug}`}
          noIndex
        />
        <PageHero
          eyebrow="Case study"
          title="This story is not published yet"
          support="We only publish client-approved case studies with verified outcomes. Request a conversation if you want to discuss a similar product."
          actions={
            <Button as={Link} to="/contact">
              Discuss a similar project
            </Button>
          }
        />
        <Section tone="light" className={styles.section}>
          <Container className={styles.layout}>
            <Text muted>
              Planned focus area: <strong>{study.title}</strong> ({study.industry}). Public
              challenge, solution, screens, and results will appear here after approval.
            </Text>
            <div className={styles.emptyActions}>
              <Button as={Link} to="/case-studies" variant="secondary">
                Back to case studies
              </Button>
              <Button as={Link} to="/services">
                Explore services
              </Button>
            </div>
          </Container>
        </Section>
      </>
    )
  }

  return (
    <>
      <PageMeta
        title={study.title}
        description={`Case study: ${study.industry}. ${study.outcome || study.challenge || ''}`}
        canonicalPath={`/case-studies/${study.slug}`}
      />
      <PageHero eyebrow="Case study" title={study.title} support={study.industry} />
      <Section tone="light" className={styles.section}>
        <Container className={styles.layout}>
          <div className={styles.meta}>
            <div>
              <p className={styles.metaLabel}>Services</p>
              <ul role="list">
                {study.services.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.metaLabel}>Technology</p>
              <ul role="list">
                {study.technology.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <article className={styles.block}>
            <h2>Challenge</h2>
            <Text>{study.challenge}</Text>
          </article>
          <article className={styles.block}>
            <h2>Solution</h2>
            <Text>{study.solution}</Text>
          </article>
          <article className={styles.block}>
            <h2>Outcome</h2>
            <Text>{study.outcome}</Text>
          </article>

          {study.related?.length ? (
            <div className={styles.related}>
              <h2>Related case studies</h2>
              <ul role="list">
                {study.related.map((relatedSlug) => (
                  <li key={relatedSlug}>
                    <Link to={`/case-studies/${relatedSlug}`}>
                      {relatedSlug.replace(/-/g, ' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Button as={Link} to="/contact">
            Discuss a similar project
          </Button>
        </Container>
      </Section>
    </>
  )
}
