import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container } from '@/components/ui'
import { servicesPage } from '@/content/services'
import { SERVICE_ICONS } from '@/lib/serviceIcons'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './ServicesEngagement.module.css'

export function ServicesEngagement() {
  const rootRef = useRef(null)
  const { engagement } = servicesPage
  const [activeId, setActiveId] = useState(
    engagement.models.find((m) => m.featured)?.id || engagement.models[0]?.id,
  )

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top bottom',
    duration: 1,
    once: false,
    ease: 'power1.out',
    y: 40,
  })

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="services-engagement-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <img
          className={styles.bg}
          src="/assets/images/services/engagement-bg.webp"
          alt=""
          width={1920}
          height={1282}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.veil} />
        <span className={styles.orb} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up data-delay="200" data-duration="1000">
          <p className={styles.eyebrow}>{engagement.eyebrow}</p>
          <h2 id="services-engagement-title" className={styles.title}>
            {engagement.title}
          </h2>
          <p className={styles.support}>{engagement.support}</p>
        </header>

        <ul className={styles.grid} role="list">
          {engagement.models.map((model, index) => {
            const Icon = SERVICE_ICONS[model.icon] || SERVICE_ICONS.users
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
                data-delay={String(200 + index * 100)}
                data-duration="1000"
                onMouseEnter={() => setActiveId(model.id)}
                onFocus={() => setActiveId(model.id)}
              >
                <div className={styles.cardTop}>
                  <span className={styles.index}>{model.index}</span>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={20} strokeWidth={2.1} />
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{model.title}</h3>
                <p className={styles.cardText}>{model.text}</p>

                <ul className={styles.points} role="list">
                  {model.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <Button as={Link} to={model.cta.to} variant="ghost" size="sm">
                  {model.cta.label}
                </Button>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
