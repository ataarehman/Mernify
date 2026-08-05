import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageCta } from '@/components/layout/PageCta'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { BookCallCta } from '@/components/cta/BookCallCta'
import { Button } from '@/components/ui'
import { industries, industriesPage } from '@/content/industries'
import { SITE } from '@/constants/site'
import { splitChars, useCharEntrance } from '@/hooks/useCharEntrance'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useMotion } from '@/app/providers/useMotion'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { IndustriesBenefits } from '@/sections/industries/IndustriesBenefits'
import { IndustriesIntro } from '@/sections/industries/IndustriesIntro'
import { IndustriesProcess } from '@/sections/industries/IndustriesProcess'
import { IndustriesProof } from '@/sections/industries/IndustriesProof'
import { IndustriesSolutions } from '@/sections/industries/IndustriesSolutions'
import { IndustriesStack } from '@/sections/industries/IndustriesStack'
import styles from './IndustriesPage.module.css'

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Industries served by Mernify',
  itemListElement: industries.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.title,
    description: item.summary,
    url: `${SITE.url}/industries#${item.slug}`,
  })),
}

function IndustriesHero() {
  const titleRef = useRef(null)
  useCharEntrance(titleRef, { start: 'top 90%', duration: 1, delay: 0.5, stagger: 0.05 })

  return (
    <PageHero
      className={styles.hero}
      title={
        <span ref={titleRef} className={styles.heroTitle}>
          {splitChars(industriesPage.hero.title).map(({ key, char }) => (
            <span key={key} data-char className={styles.heroChar}>
              {char}
            </span>
          ))}
        </span>
      }
      support={
        <>
          Software shaped around how your <span className={styles.accent}>sector</span> actually
          works
        </>
      }
      actions={
        <>
          <BookCallCta size="md" label="Schedule Meeting" />
          <Button as={Link} to="/case-studies" variant="secondary" size="md">
            See published work
          </Button>
        </>
      }
    />
  )
}

export function IndustriesPage() {
  const rootRef = useRef(null)
  const [activeSlug, setActiveSlug] = useState(industries[0].slug)
  const { prefersReducedMotion } = useReducedMotion()
  const { scrollTo } = useMotion()

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    duration: 0.85,
    once: true,
    ease: 'power3.out',
  })

  const selectIndustry = useCallback(
    (slug) => {
      setActiveSlug(slug)
      const panel = document.getElementById('industry-solutions')
      if (!panel) return

      if (prefersReducedMotion) {
        panel.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }

      // Route through Lenis so the jump shares easing with the rest of the page
      // instead of two scrollers fighting each other.
      scrollTo(panel, { offset: -12, duration: 1.2 })
    },
    [prefersReducedMotion, scrollTo],
  )

  return (
    <div ref={rootRef} className={styles.page}>
      <PageMeta
        title="Industries"
        description="Product patterns for healthcare, financial services, logistics, construction, retail, manufacturing, field service, and more — with the published work behind them."
        canonicalPath="/industries"
      />
      <JsonLd id="industries-list" data={itemListSchema} />

      <IndustriesHero />
      <IndustriesIntro />
      <IndustriesStack onSelect={selectIndustry} />
      <IndustriesSolutions activeSlug={activeSlug} onSelect={setActiveSlug} />
      <IndustriesBenefits />
      <IndustriesProcess />
      <IndustriesProof />

      <PageCta
        animated
        eyebrow="Next step"
        title={industriesPage.cta.title}
        accentWords={industriesPage.cta.accentWords}
        support={industriesPage.cta.support}
        actions={
          <>
            <BookCallCta size="md" label="Schedule Meeting" />
            <Button as={Link} to="/contact" variant="ghost" size="md">
              Send a message
            </Button>
          </>
        }
      />
    </div>
  )
}
