import { useRef } from 'react'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './ServiceStack.module.css'

export function ServiceStack({ content }) {
  const rootRef = useRef(null)
  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 88%', y: 28 })

  const groups = content?.groups || []
  if (!groups.length) return null

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="service-stack-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.mesh} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="service-stack-title" className={styles.title}>
            {content.title}
          </h2>
          {content.support ? <p className={styles.support}>{content.support}</p> : null}
        </header>

        <div className={styles.grid}>
          {groups.map((group, index) => (
            <article
              key={group.title}
              className={styles.group}
              data-fade-up
              data-delay={String(80 + index * 70)}
            >
              <p className={styles.groupLabel}>{group.title}</p>
              <ul className={styles.tags} role="list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
