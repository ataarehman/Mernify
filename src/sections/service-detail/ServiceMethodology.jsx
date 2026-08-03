import { useRef } from 'react'
import { Container } from '@/components/ui'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { PROCESS_ICONS } from '@/lib/templateMedia'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './ServiceMethodology.module.css'

function ScrubTitle({ id, className, children }) {
  const ref = useRef(null)
  useScrubTitle(ref)
  const words = String(children).match(/\S+/g) || []
  return (
    <h2 id={id} ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${i}-${word}`} className={styles.word}>
          {splitScrubChars(word).map(({ key, char }) => (
            <span key={key} data-scrub-char className={styles.char}>
              {char}
            </span>
          ))}
          {'\u00A0'}
        </span>
      ))}
    </h2>
  )
}

export function ServiceMethodology({ content, serviceTitle }) {
  const rootRef = useRef(null)
  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 88%', y: 32 })

  const title = content.title || `How we deliver ${serviceTitle}`
  const steps = content.steps || []

  return (
    <section
      ref={rootRef}
      id="process"
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="service-method-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orb} />
        <span className={styles.grid} />
      </div>

      <Container width="wide" className={styles.shell}>
        <div className={styles.top}>
          <header className={styles.header} data-fade-up>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <ScrubTitle id="service-method-title" className={styles.title}>
              {title}
            </ScrubTitle>
            {content.support ? <p className={styles.support}>{content.support}</p> : null}
          </header>

          {content.media ? (
            <div className={styles.media} data-fade-up data-delay="100">
              <ClipReveal
                src={content.media.src}
                alt={content.media.alt || ''}
                className={styles.clip}
              />
            </div>
          ) : null}
        </div>

        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={styles.step}
              data-fade-up
              data-delay={String(100 + index * 90)}
            >
              <div className={styles.stepTop}>
                <span className={styles.badge}>Step {String(index + 1).padStart(2, '0')}</span>
                <span className={styles.stepIcon} aria-hidden="true">
                  <img src={PROCESS_ICONS[index % PROCESS_ICONS.length]} alt="" />
                </span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {index < steps.length - 1 ? (
                <span className={styles.connector} aria-hidden="true" />
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
