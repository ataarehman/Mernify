import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageCta } from '@/components/layout/PageCta'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container, Text } from '@/components/ui'
import { CaseStudyHero } from '@/components/case-study/CaseStudyHero'
import { CaseStudyNext } from '@/components/case-study/CaseStudyNext'
import { SITE } from '@/constants/site'
import {
  getCaseStudyBySlug,
  getNextCaseStudy,
  getRelatedCaseStudies,
} from '@/content/caseStudies'
import { NotFoundPage } from '@/pages/NotFoundPage'
import styles from './CaseStudyPage.module.css'

export function CaseStudyPage() {
  const { slug } = useParams()
  const study = getCaseStudyBySlug(slug)

  useEffect(() => {
    if (!study || study.status !== 'published') return undefined
    const id = 'case-study-jsonld'
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = id
      document.head.appendChild(el)
    }
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: study.title,
      description: study.seo?.description || study.tagline,
      image: `${SITE.url}${study.featuredImage}`,
      author: { '@type': 'Organization', name: SITE.name },
      mainEntityOfPage: `${SITE.url}/case-studies/${study.slug}`,
      about: study.liveUrl || undefined,
    })
    return () => {
      el?.remove()
    }
  }, [study])

  if (!study) {
    return <NotFoundPage />
  }

  if (study.status !== 'published') {
    return (
      <>
        <PageMeta
          title="Case study pending publication"
          description="This case study is not publicly available yet."
          canonicalPath={`/case-studies/${study.slug}`}
          noIndex
        />
        <section className={styles.pending}>
          <Container className={styles.pendingInner}>
            <h1>This story is not published yet</h1>
            <Text muted>
              We only publish client-approved case studies with verified outcomes.
            </Text>
            <div className={styles.actions}>
              <Button as={Link} to="/contact">
                Discuss a similar project
              </Button>
              <Button as={Link} to="/case-studies" variant="secondary">
                Back to case studies
              </Button>
            </div>
          </Container>
        </section>
      </>
    )
  }

  const related = getRelatedCaseStudies(study)
  const next = getNextCaseStudy(study.slug)

  return (
    <>
      <PageMeta
        title={study.seo?.title || study.title}
        description={study.seo?.description || study.tagline}
        canonicalPath={`/case-studies/${study.slug}`}
        image={study.featuredImage}
      />
      <CaseStudyHero study={study} />

      <section className={styles.section} data-header-theme="light">
        <Container className={styles.layout}>
          {study.limitations ? (
            <aside className={styles.notice} role="note">
              <strong>Research note.</strong> {study.limitations}
            </aside>
          ) : null}

          <article className={styles.block}>
            <h2>Project overview</h2>
            <Text>{study.overview}</Text>
          </article>

          <article className={styles.block}>
            <h2>The challenge</h2>
            <Text>{study.challenge}</Text>
          </article>

          <article className={styles.block}>
            <h2>The solution</h2>
            <Text>{study.solution}</Text>
          </article>

          <article className={styles.block}>
            <h2>Key capabilities</h2>
            <ul className={styles.capabilities} role="list">
              {study.capabilities.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className={styles.block}>
            <h2>Design and UX approach</h2>
            <Text>{study.designApproach}</Text>
          </article>

          <article className={styles.block}>
            <h2>Technology and implementation</h2>
            <Text>{study.developmentApproach}</Text>
            {study.technology?.length ? (
              <ul className={styles.chipList} role="list">
                {study.technology.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.muted}>
                No private application stack is claimed beyond what is visible on the public site.
              </p>
            )}
          </article>

          <article className={styles.block}>
            <h2>Outcomes</h2>
            <ul className={styles.outcomes} role="list">
              {study.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {study.publicSiteClaims?.length ? (
              <div className={styles.claims}>
                <h3>Public site messaging</h3>
                <p className={styles.muted}>
                  The following statements appear on the live website. They are company claims, not
                  independently audited Mernify delivery metrics.
                </p>
                <ul role="list">
                  {study.publicSiteClaims.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>

          {study.gallery?.length ? (
            <article className={styles.block}>
              <h2>Visual gallery</h2>
              <ul className={styles.gallery} role="list">
                {study.gallery.map((item) => (
                  <li key={item.src}>
                    <figure>
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        width={960}
                        height={640}
                      />
                      {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                    </figure>
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          {related.length ? (
            <div className={styles.related}>
              <h2>Related case studies</h2>
              <ul role="list">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/case-studies/${item.slug}`}>{item.title}</Link>
                    <span>{item.category}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className={styles.actions}>
            <Button as={Link} to="/contact">
              Discuss a similar project
            </Button>
            <Button as={Link} to="/case-studies" variant="secondary">
              All case studies
            </Button>
          </div>
        </Container>
      </section>

      <CaseStudyNext study={next} />
      <PageCta
        title="Have a product story worth engineering carefully?"
        accentWords={['engineering']}
      />
    </>
  )
}
