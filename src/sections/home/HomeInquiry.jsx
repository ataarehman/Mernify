import { useRef } from 'react'
import { Container } from '@/components/ui'
import { ContactForm } from '@/components/forms/ContactForm'
import { homeInquiry } from '@/content/home'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './HomeInquiry.module.css'

export function HomeInquiry() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)

  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 88%' })
  useScrubTitle(titleRef)

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      id="inquire"
      aria-labelledby="home-inquiry-title"
    >
      <Container width="wide" className={styles.layout}>
        <div className={styles.copy} data-fade-up>
          <p className={styles.eyebrow}>{homeInquiry.eyebrow}</p>
          <h2 id="home-inquiry-title" ref={titleRef} className={styles.title}>
            {splitScrubChars(homeInquiry.title).map(({ key, char }) => (
              <span key={key} data-scrub-char>
                {char}
              </span>
            ))}
          </h2>
          <p className={styles.support}>{homeInquiry.support}</p>
          <a className={styles.email} href={`mailto:${homeInquiry.email}`}>
            {homeInquiry.email}
          </a>
        </div>

        <div className={styles.formCard} data-fade-up data-delay="150">
          <ContactForm />
        </div>
      </Container>
    </section>
  )
}
