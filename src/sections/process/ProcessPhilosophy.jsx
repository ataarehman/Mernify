import { BookMarked, GitPullRequest, Microscope } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { processPage } from '@/content/process'
import styles from './ProcessPhilosophy.module.css'

const ICONS = {
  evidence: Microscope,
  increments: GitPullRequest,
  artifacts: BookMarked,
}

export function ProcessPhilosophy() {
  const { eyebrow, title, support, principles } = processPage.philosophy

  return (
    <section
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="process-philosophy-title"
    >
      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-fade-up>
          <Eyebrow rule className={styles.eyebrow}>
            {eyebrow}
          </Eyebrow>
          <h2 id="process-philosophy-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.support}>{support}</p>
        </header>

        <ul className={styles.grid} role="list">
          {principles.map((item, index) => {
            const Icon = ICONS[item.id] || Microscope
            return (
              <li
                key={item.id}
                className={styles.card}
                data-fade-up
                data-delay={String(100 + index * 90)}
              >
                <span className={styles.iconRow}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <span className={styles.step} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.text}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
