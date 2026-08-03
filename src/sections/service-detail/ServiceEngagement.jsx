import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './ServiceEngagement.module.css'

export function ServiceEngagement({ content }) {
  const rootRef = useRef(null)
  const models = content.models || []
  const [activeId, setActiveId] = useState(
    models.find((m) => m.featured)?.id || models[0]?.id,
  )

  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 88%', y: 28 })

  if (!models.length) return null

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="service-engage-title"
    >
      <Container width="wide">
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="service-engage-title" className={styles.title}>
            {content.title}
          </h2>
          {content.support ? <p className={styles.support}>{content.support}</p> : null}
        </header>

        <ul className={styles.grid} role="list">
          {models.map((model, index) => {
            const isActive = activeId === model.id
            return (
              <li
                key={model.id}
                className={[
                  styles.card,
                  isActive ? styles.cardActive : '',
                  model.featured ? styles.cardFeatured : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                data-fade-up
                data-delay={String(80 + index * 80)}
                onMouseEnter={() => setActiveId(model.id)}
                onFocus={() => setActiveId(model.id)}
              >
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{model.title}</h3>
                <p>{model.text}</p>
                <ul className={styles.points} role="list">
                  {model.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>

        <div className={styles.ctaRow} data-fade-up>
          <Link to="/contact" className={styles.cta}>
            Discuss the right model <ArrowUpRight size={18} />
          </Link>
        </div>
      </Container>
    </section>
  )
}
