import { useMemo, useRef, useState } from 'react'
import { PageCta } from '@/components/layout/PageCta'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { filterCaseStudies, homeWork } from '@/content/caseStudies'
import { useCharEntrance, splitChars } from '@/hooks/useCharEntrance'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { CaseStudiesBrowse } from '@/sections/case-studies/CaseStudiesBrowse'
import { CaseStudiesFeatured } from '@/sections/case-studies/CaseStudiesFeatured'
import { CaseStudiesProof } from '@/sections/case-studies/CaseStudiesProof'
import styles from './CaseStudiesPage.module.css'

function CaseStudiesPageHero() {
  const titleRef = useRef(null)
  useCharEntrance(titleRef, {
    start: 'top 90%',
    duration: 1,
    delay: 0.5,
    stagger: 0.05,
  })

  return (
    <PageHero
      className={styles.portfolioHero}
      title={
        <span ref={titleRef} className={styles.heroTitle}>
          {splitChars('Portfolio').map(({ key, char }) => (
            <span key={key} data-char className={styles.heroChar}>
              {char}
            </span>
          ))}
        </span>
      }
      support={
        <>
          Selected product work across analytics, healthcare, field services, workspace products,
          and commerce — grounded in <span className={styles.accent}>public evidence</span>
        </>
      }
    />
  )
}

export function CaseStudiesPage() {
  const rootRef = useRef(null)
  const [category, setCategory] = useState('All')
  const [industry, setIndustry] = useState('All')

  const items = useMemo(
    () => filterCaseStudies({ category, industry }),
    [category, industry],
  )

  const featured = items[0] || null
  const gridItems = items.slice(1)

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    duration: 0.85,
    once: true,
    ease: 'power3.out',
    deps: [category, industry, items.length],
  })

  const resetFilters = () => {
    setCategory('All')
    setIndustry('All')
  }

  return (
    <div ref={rootRef} className={styles.page}>
      <PageMeta
        title="Case Studies"
        description={homeWork.support}
        canonicalPath="/case-studies"
        image={featured?.featuredImage}
      />
      <CaseStudiesPageHero />
      {featured ? <CaseStudiesFeatured study={featured} /> : null}
      <CaseStudiesBrowse
        items={gridItems}
        category={category}
        industry={industry}
        resultCount={items.length}
        onCategoryChange={setCategory}
        onIndustryChange={setIndustry}
        onReset={resetFilters}
        empty={items.length === 0}
      />
      <CaseStudiesProof />
      <PageCta
        animated
        title="Ready to build the next case study together? Share your product challenge and we’ll help engineer something reliable and scalable."
        accentWords={['case', 'study', 'scalable']}
      />
    </div>
  )
}
