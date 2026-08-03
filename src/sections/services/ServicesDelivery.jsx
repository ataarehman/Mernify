import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { BookCallCta } from '@/components/cta/BookCallCta'
import { servicesPage } from '@/content/services'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './ServicesDelivery.module.css'

export function ServicesDelivery() {
  const rootRef = useRef(null)
  const { delivery } = servicesPage

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
      data-header-theme="light"
      aria-labelledby="services-delivery-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.grid} />
      </div>

      <Container width="wide" className={styles.shell}>
        <div className={styles.layout}>
          <figure className={styles.media} data-fade-up>
            <div className={styles.mediaStage}>
              <img
                src={delivery.media.src}
                alt={delivery.media.alt}
                width={2000}
                height={1333}
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className={styles.mediaGlow} />
          </figure>

          <div className={styles.copy}>
            <header className={styles.header} data-fade-up data-delay="200" data-duration="1000">
              <p className={styles.eyebrow}>{delivery.eyebrow}</p>
              <h2 id="services-delivery-title" className={styles.title}>
                {delivery.title}
              </h2>
              <p className={styles.support}>{delivery.support}</p>
            </header>

            <ul className={styles.principles} role="list">
              {delivery.principles.map((item, index) => (
                <li
                  key={item.id}
                  className={styles.principle}
                  data-fade-up
                  data-delay={String(200 + index * 100)}
                  data-duration="1000"
                >
                  <span className={styles.principleIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className={styles.principleTitle}>{item.title}</h3>
                    <p className={styles.principleText}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.actions} data-fade-up data-delay="120">
              <Link to={delivery.actions.primary.to} className={styles.primary}>
                {delivery.actions.primary.label}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link to={delivery.actions.secondary.to} className={styles.secondary}>
                {delivery.actions.secondary.label}
              </Link>
              <BookCallCta variant="secondary" size="md" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
