import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { PageCta } from '@/components/layout/PageCta'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { BookCallCta } from '@/components/cta/BookCallCta'
import { Button } from '@/components/ui'
import { processPage, processSteps } from '@/content/process'
import { SITE } from '@/constants/site'
import { useMotion } from '@/app/providers/useMotion'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { splitChars, useCharEntrance } from '@/hooks/useCharEntrance'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { ProcessCollab } from '@/sections/process/ProcessCollab'
import { ProcessDifference } from '@/sections/process/ProcessDifference'
import { ProcessFaq } from '@/sections/process/ProcessFaq'
import { ProcessMethods } from '@/sections/process/ProcessMethods'
import { ProcessPhilosophy } from '@/sections/process/ProcessPhilosophy'
import { ProcessJourney } from '@/sections/process/ProcessJourney'
import { ProcessQuality } from '@/sections/process/ProcessQuality'
import styles from './ProcessPage.module.css'

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Mernify product delivery process',
  description:
    'A seven-stage path from discovery to continuous improvement with tangible outputs at every stage.',
  step: processSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.title,
    text: step.summary,
    url: `${SITE.url}/process#stage-${step.id}`,
  })),
}

function ProcessHero() {
  const titleRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const { scrollTo } = useMotion()
  useCharEntrance(titleRef, { start: 'top 90%', duration: 1, delay: 0.5, stagger: 0.05 })

  const { title, supportLead, supportAccent } = processPage.hero

  const jumpToStages = (event) => {
    event.preventDefault()
    const target = document.getElementById('journey')
    if (!target) return
    if (prefersReducedMotion) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
      return
    }
    scrollTo(target, { offset: -12, duration: 1.2 })
  }

  return (
    <PageHero
      className={styles.hero}
      title={
        <span ref={titleRef} className={styles.heroTitle}>
          {splitChars(title).map(({ key, char }) => (
            <span key={key} data-char className={styles.heroChar}>
              {char}
            </span>
          ))}
        </span>
      }
      support={
        <>
          {supportLead} <span className={styles.accent}>{supportAccent}</span>
        </>
      }
      actions={
        <>
          <BookCallCta size="md" label="Schedule Meeting" />
          <Button as="a" href="#journey" variant="secondary" size="md" onClick={jumpToStages}>
            See how we work
          </Button>
        </>
      }
    />
  )
}

export function ProcessPage() {
  const rootRef = useRef(null)

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    duration: 0.85,
    once: true,
    ease: 'power3.out',
  })

  return (
    <div ref={rootRef} className={styles.page}>
      <PageMeta
        title="Process"
        description="Discover, plan, design, develop, test, launch, and improve—with tangible outputs at every stage of delivery."
        canonicalPath="/process"
      />
      <JsonLd id="process-howto" data={howToSchema} />

      <ProcessHero />
      <ProcessPhilosophy />
      <ProcessJourney />
      <ProcessDifference />
      <ProcessQuality />
      <ProcessCollab />
      <ProcessMethods />
      <ProcessFaq />

      <PageCta
        animated
        eyebrow="Next step"
        title={processPage.cta.title}
        accentWords={processPage.cta.accentWords}
        support={processPage.cta.support}
        actions={
          <>
            <BookCallCta size="md" label="Schedule Meeting" />
            <Button as={Link} to="/contact?intent=discovery" variant="ghost" size="md">
              Send a message
            </Button>
          </>
        }
      />
    </div>
  )
}
