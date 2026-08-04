import { CaseStudyCard } from '@/components/case-study/CaseStudyCard'
import { Container, Eyebrow } from '@/components/ui'
import { CaseStudiesSidebar } from '@/sections/case-studies/CaseStudiesSidebar'
import styles from './CaseStudiesBrowse.module.css'

export function CaseStudiesBrowse({
  items,
  category,
  industry,
  resultCount,
  onCategoryChange,
  onIndustryChange,
  onReset,
  empty = false,
}) {
  return (
    <section
      id="portfolio"
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="portfolio-grid-title"
    >
      <Container width="wide" className={styles.shell}>
        <CaseStudiesSidebar
          category={category}
          industry={industry}
          resultCount={resultCount}
          onCategoryChange={onCategoryChange}
          onIndustryChange={onIndustryChange}
          onReset={onReset}
        />

        <div className={styles.main}>
          <div className={styles.head} data-fade-up>
            <Eyebrow rule>Archive</Eyebrow>
            <h2 id="portfolio-grid-title" className={styles.title}>
              Selected product work
            </h2>
            <p className={styles.support}>
              Filter by category or industry, then open a study for the full brief, process, and
              outcomes.
            </p>
          </div>

          {empty ? (
            <div className={styles.empty} role="status" data-fade-up>
              <h3>No projects match these filters</h3>
              <p>Try another combination, or reset to view the full portfolio.</p>
              <button type="button" className={styles.emptyCta} onClick={onReset}>
                Show all projects
              </button>
            </div>
          ) : items.length ? (
            <ul className={styles.grid} role="list">
              {items.map((item, index) => (
                <li key={item.slug} data-fade-up data-delay={String(Math.min(index * 50, 200))}>
                  <CaseStudyCard study={item} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.onlyFeatured} data-fade-up>
              This filter matches a single project — see the featured study above.
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
