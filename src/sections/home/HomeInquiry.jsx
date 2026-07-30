import { useRef } from 'react'
import { Mail, MessageSquareText, ShieldCheck, Timer } from 'lucide-react'
import { Container } from '@/components/ui'
import { InquiryStepperForm } from '@/components/forms/InquiryStepperForm'
import { homeInquiry } from '@/content/home'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './HomeInquiry.module.css'

export function HomeInquiry() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)

  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 86%', y: 28 })
  useScrubTitle(titleRef)

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      id="inquire"
      aria-labelledby="home-inquiry-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.ring} />
        <span className={styles.gridFade} />
      </div>

      <Container width="wide" className={styles.shell}>
        <div className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{homeInquiry.eyebrow}</p>
          <h2 id="home-inquiry-title" ref={titleRef} className={styles.title}>
            {splitScrubChars(homeInquiry.title).map(({ key, char }) => (
              <span key={key} data-scrub-char>
                {char}
              </span>
            ))}
          </h2>
          <p className={styles.support}>{homeInquiry.support}</p>
        </div>

        <div className={styles.layout}>
          <aside className={styles.copy}>
            <a className={styles.emailCard} href={`mailto:${homeInquiry.email}`} data-fade-up>
              <span className={styles.emailIcon} aria-hidden="true">
                <Mail size={17} />
              </span>
              <span>
                <span className={styles.emailLabel}>Email us</span>
                <span className={styles.emailValue}>{homeInquiry.email}</span>
              </span>
              <span className={styles.emailShine} aria-hidden="true" />
            </a>

            <ul className={styles.points} role="list">
              <li data-fade-up data-delay="60">
                <span className={styles.pointIcon} aria-hidden="true">
                  <Timer size={16} />
                </span>
                <span>{homeInquiry.response}</span>
              </li>
              {homeInquiry.points.map((point, index) => (
                <li key={point} data-fade-up data-delay={String(120 + index * 60)}>
                  <span className={styles.pointIcon} aria-hidden="true">
                    <ShieldCheck size={16} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className={styles.note} data-fade-up data-delay="280">
              <MessageSquareText size={16} aria-hidden="true" />
              <p>
                Prefer a live conversation? Mention that in your message and we’ll suggest a
                discovery call when it fits.
              </p>
            </div>
          </aside>

          <div className={styles.formColumn} data-fade-up data-delay="100">
            <div className={styles.formCard}>
              <div className={styles.formGlow} aria-hidden="true" />
              <div className={styles.formEdge} aria-hidden="true" />
              <InquiryStepperForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
