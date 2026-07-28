import { useMemo, useState } from 'react'
import { PageHero } from '@/components/layout/PageHero'
import { PageCta } from '@/components/layout/PageCta'
import { PageMeta } from '@/components/seo/PageMeta'
import { Container } from '@/components/ui'
import { CaseStudyCard } from '@/components/case-study/CaseStudyCard'
import {
  caseStudyCategories,
  homeWork,
  publishedCaseStudies,
} from '@/content/caseStudies'
import styles from './CaseStudiesPage.module.css'

export function CaseStudiesPage() {
  const [category, setCategory] = useState('All')

  const items = useMemo(() => {
    if (category === 'All') return publishedCaseStudies
    return publishedCaseStudies.filter((item) => item.category === category)
  }, [category])

  const featured = items[0]
  const rest = items.slice(1)

  return (
    <>
      <PageMeta
        title="Case Studies"
        description={homeWork.support}
        canonicalPath="/case-studies"
        image={featured?.featuredImage}
      />
      <PageHero
        title="Portfolio"
        support={
          <>
            Selected product work across analytics, healthcare, field services, workspace products,
            and commerce — grounded in{' '}
            <span className={styles.accent}>public evidence</span>
          </>
        }
      />
      <section className={styles.section} data-header-theme="light">
        <Container width="wide">
          <div className={styles.toolbar} role="toolbar" aria-label="Filter case studies by category">
            {caseStudyCategories.map((item) => {
              const selected = item === category
              return (
                <button
                  key={item}
                  type="button"
                  className={[styles.filter, selected ? styles.filterActive : ''].filter(Boolean).join(' ')}
                  aria-pressed={selected}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              )
            })}
          </div>

          {items.length ? (
            <div className={styles.layout}>
              {featured ? (
                <div className={styles.featured}>
                  <CaseStudyCard study={featured} featured />
                </div>
              ) : null}
              <ul className={styles.grid} role="list">
                {rest.map((item) => (
                  <li key={item.slug}>
                    <CaseStudyCard study={item} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={styles.empty} role="status">
              <h2>No projects in this category yet</h2>
              <p>Try another filter or view the full portfolio.</p>
              <button type="button" className={styles.filterActive} onClick={() => setCategory('All')}>
                Show all
              </button>
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
