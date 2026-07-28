import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { PageCta } from '@/components/layout/PageCta'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container } from '@/components/ui'
import { homeWork, publishedCaseStudies } from '@/content/caseStudies'
import styles from './CaseStudiesPage.module.css'

const PLACEHOLDER_THUMBS = [
  '/assets/images/thumbs/portfolio-thumb1.jpg',
  '/assets/images/thumbs/portfolio-thumb2.jpg',
  '/assets/images/thumbs/portfolio-thumb3.jpg',
  '/assets/images/thumbs/portfolio-thumb4.jpg',
  '/assets/images/thumbs/portfolio-thumb5.jpg',
  '/assets/images/thumbs/portfolio-thumb6.jpg',
]

export function CaseStudiesPage() {
  const items = publishedCaseStudies

  return (
    <>
      <PageMeta
        title="Case Studies"
        description="Outcome-led product stories published when clients approve detail. Mernify does not invent customers or metrics."
        canonicalPath="/case-studies"
      />
      <PageHero
        title="Portfolio"
        support={
          <>
            Selected product work — published when clients approve{' '}
            <span className={styles.accent}>detail</span>
          </>
        }
      />
      <section className={styles.section} data-header-theme="light">
        <Container width="wide">
          {items.length ? (
            <ul className={styles.grid} role="list">
              {items.map((item, index) => (
                <li key={item.slug} className={index % 3 === 0 ? styles.wide : styles.narrow}>
                  <Link to={`/case-studies/${item.slug}`} className={styles.card}>
                    <div className={styles.cardHead}>
                      <h2>{item.title}</h2>
                      <span className={styles.industry}>{item.industry}</span>
                    </div>
                    <div className={styles.media}>
                      <img
                        src={PLACEHOLDER_THUMBS[index % PLACEHOLDER_THUMBS.length]}
                        alt=""
                      />
                    </div>
                    <div className={styles.cardFoot}>
                      <p className={styles.excerpt}>{item.challenge}</p>
                      <span className={styles.cta}>
                        Read case study <ArrowUpRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty} role="status">
              <div className={styles.emptyMedia}>
                <img src="/assets/images/thumbs/coming-soon-img.png" alt="" />
              </div>
              <div className={styles.emptyCopy}>
                <h2>{homeWork.empty.title}</h2>
                <p>{homeWork.empty.body}</p>
                <div className={styles.emptyActions}>
                  <Button as={Link} to={homeWork.empty.cta.to} size="lg">
                    {homeWork.empty.cta.label}
                  </Button>
                  <Button as={Link} to={homeWork.empty.secondary.to} variant="secondary" size="lg">
                    {homeWork.empty.secondary.label}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
      <PageCta
        title="Ready to build your next digital product? Drop us a message, and let’s start engineering something reliable and scalable."
        accentWords={['message', 'scalable']}
      />
    </>
  )
}
