import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { SERVICE_ICONS } from '@/lib/serviceIcons'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './ServiceSolutions.module.css'

export function ServiceSolutions({ content }) {
  const rootRef = useRef(null)
  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 88%', y: 28 })

  const items = content?.items || []
  if (!items.length) return null

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="service-solutions-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orb} />
      </div>
      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="service-solutions-title" className={styles.title}>
            {content.title}
          </h2>
          {content.support ? <p className={styles.support}>{content.support}</p> : null}
        </header>

        <ul className={styles.grid} role="list">
          {items.map((item, index) => {
            const Icon = SERVICE_ICONS[item.icon] || SERVICE_ICONS.layoutDashboard
            return (
              <li
                key={item.title}
                className={styles.card}
                data-fade-up
                data-delay={String(70 + index * 60)}
                style={{ '--accent': item.accent || '#4f46e5' }}
              >
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.9} />
                </span>
                <div className={styles.body}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <Link to="/contact" className={styles.link} aria-label={`Discuss ${item.title}`}>
                  Explore <ArrowUpRight size={16} />
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
