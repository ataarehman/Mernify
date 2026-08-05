import { Building2, Eye, Gauge, KeyRound } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { processPage } from '@/content/process'
import styles from './ProcessDifference.module.css'

const ICONS = {
  visible: Eye,
  sector: Building2,
  quality: Gauge,
  ownership: KeyRound,
}

export function ProcessDifference() {
  const { eyebrow, title, support, points } = processPage.difference

  return (
    <section
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="process-difference-title"
    >
      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-fade-up>
          <Eyebrow rule className={styles.eyebrow}>
            {eyebrow}
          </Eyebrow>
          <h2 id="process-difference-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.support}>{support}</p>
        </header>

        <ul className={styles.grid} role="list">
          {points.map((point, index) => {
            const Icon = ICONS[point.id] || Eye
            return (
              <li
                key={point.id}
                className={styles.card}
                data-fade-up
                data-delay={String(80 + index * 80)}
              >
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className={styles.cardTitle}>{point.title}</h3>
                <p className={styles.cardText}>{point.text}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
