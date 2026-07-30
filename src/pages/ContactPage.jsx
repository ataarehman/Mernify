import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { ContactForm } from '@/components/forms/ContactForm'
import { BookCallCta } from '@/components/cta/BookCallCta'
import { Container } from '@/components/ui'
import { contactContent } from '@/content/pages'
import { SITE } from '@/constants/site'
import { hasAnalyticsConsent, readConsent, writeConsent } from '@/lib/consent'
import { resolveCalendlyUrl } from '@/lib/env'
import styles from './ContactPage.module.css'

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d18594861.431429405!2d25.097591251485795!3d54.811518433582705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssea!5e0!3m2!1sen!2sbd!4v1752124108423!5m2!1sen!2sbd'

export function ContactPage() {
  const [params] = useSearchParams()
  const intent = params.get('intent') || ''
  const service = params.get('service') || ''
  const [mapAllowed, setMapAllowed] = useState(false)
  const hasCalendly = Boolean(resolveCalendlyUrl())

  useEffect(() => {
    const sync = () => setMapAllowed(hasAnalyticsConsent())
    sync()
    window.addEventListener('mf:consent', sync)
    return () => window.removeEventListener('mf:consent', sync)
  }, [])

  return (
    <>
      <PageMeta
        title="Contact"
        description={contactContent.support}
        canonicalPath="/contact"
      />
      <PageHero
        title="Contact"
        support={
          <>
            Tell us about the product you want to <span className={styles.accent}>build</span>
          </>
        }
      />

      <section className={styles.section} data-header-theme="light">
        <Container width="wide" className={styles.layout}>
          <div className={styles.left}>
            <div className={styles.intro}>
              <h2 className={styles.heading}>Get in Touch</h2>
              <p className={styles.lead}>{contactContent.support}</p>
            </div>

            <div className={styles.nextSteps} aria-labelledby="what-next-title">
              <h3 id="what-next-title" className={styles.nextTitle}>
                What happens next
              </h3>
              <ol className={styles.nextList}>
                {contactContent.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className={styles.sla}>{SITE.responseSla}</p>
              <div className={styles.bookRow}>
                <BookCallCta size="md" label="Book a Demo Call" />
                <p className={styles.bookHint}>
                  {hasCalendly
                    ? 'Self-schedule a 20-minute intro — no form required.'
                    : 'Opens the inquiry form with discovery intent — or email us for a booking link.'}
                </p>
              </div>
            </div>

            <div className={styles.formCard}>
              <ContactForm defaultIntent={intent} defaultService={service} />
            </div>

            <ul className={styles.meta} role="list">
              <li>
                <a href={`mailto:${contactContent.email}`}>{contactContent.email}</a>
              </li>
              <li aria-hidden="true">·</li>
              <li>Remote-first</li>
            </ul>
          </div>

          <div className={styles.mapWrap}>
            {mapAllowed ? (
              <iframe
                title="Mernify remote delivery map"
                className={styles.map}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={MAP_SRC}
              />
            ) : (
              <div className={styles.mapGate}>
                <p>
                  The map loads Google content and may set third-party cookies. Enable analytics
                  cookies to view it, or continue without the map.
                </p>
                <button
                  type="button"
                  className={styles.mapBtn}
                  onClick={() => {
                    const current = readConsent() || { analytics: false, marketing: false }
                    if (!current.analytics) {
                      writeConsent({ analytics: true, marketing: Boolean(current.marketing) })
                    }
                    setMapAllowed(true)
                  }}
                >
                  Load map
                </button>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
