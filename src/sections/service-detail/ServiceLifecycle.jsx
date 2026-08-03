import { useRef } from 'react'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './ServiceLifecycle.module.css'

export function ServiceLifecycle({ content }) {
  const rootRef = useRef(null)
  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 88%', y: 28 })

  if (!content?.stages?.length) return null

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="service-lifecycle-title"
    >
      <Container width="wide">
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="service-lifecycle-title" className={styles.title}>
            {content.title}
          </h2>
          {content.support ? <p className={styles.support}>{content.support}</p> : null}
        </header>

        <ol className={styles.track}>
          {content.stages.map((stage, index) => (
            <li
              key={stage.title}
              className={styles.stage}
              data-fade-up
              data-delay={String(70 + index * 80)}
            >
              <span className={styles.node} aria-hidden="true">
                <span className={styles.nodeCore}>{String(index + 1).padStart(2, '0')}</span>
              </span>
              <div className={styles.body}>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
