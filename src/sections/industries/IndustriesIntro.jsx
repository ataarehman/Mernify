import { Layers3, Rocket, ScanSearch, ShieldCheck } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { homeIndustries, industriesPage } from '@/content/industries'
import styles from './IndustriesIntro.module.css'

const PILLAR_ICONS = {
  workflow: ScanSearch,
  slice: Rocket,
  longrun: Layers3,
}

export function IndustriesIntro() {
  const { eyebrow, title, support, pillars } = industriesPage.intro

  return (
    <section className={styles.section} data-header-theme="light" aria-labelledby="industries-intro-title">
      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-fade-up>
          <Eyebrow rule className={styles.eyebrow}>
            {eyebrow}
          </Eyebrow>
          <h2 id="industries-intro-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.support}>{support}</p>
        </header>

        <ul className={styles.grid} role="list">
          {pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[pillar.icon] || ScanSearch
            return (
              <li
                key={pillar.id}
                className={styles.card}
                data-fade-up
                data-delay={String(120 + index * 90)}
              >
                <span className={styles.step}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardText}>{pillar.text}</p>
              </li>
            )
          })}
        </ul>

        <p className={styles.disclaimer} data-fade-up data-delay="420">
          <ShieldCheck size={16} strokeWidth={2} aria-hidden="true" />
          <span>{homeIndustries.disclaimer}</span>
        </p>
      </Container>
    </section>
  )
}
