import { Accessibility, ScanSearch, ShieldCheck, Workflow } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { processPage } from '@/content/process'
import styles from './ProcessQuality.module.css'

const ICONS = {
  automated: Workflow,
  exploratory: ScanSearch,
  a11y: Accessibility,
  security: ShieldCheck,
}

export function ProcessQuality() {
  const { eyebrow, title, support, pillars } = processPage.quality

  return (
    <section
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="process-quality-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orb} />
      </div>

      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-fade-up>
          <div className={styles.headCopy}>
            <Eyebrow rule className={styles.eyebrow}>
              {eyebrow}
            </Eyebrow>
            <h2 id="process-quality-title" className={styles.title}>
              {title}
            </h2>
          </div>
          <p className={styles.support}>{support}</p>
        </header>

        <ul className={styles.grid} role="list">
          {pillars.map((pillar, index) => {
            const Icon = ICONS[pillar.id] || Workflow
            return (
              <li
                key={pillar.id}
                className={styles.card}
                data-fade-up
                data-delay={String(90 + index * 80)}
              >
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardText}>{pillar.text}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
