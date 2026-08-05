import { useLayoutEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ArrowUpRight, Clock3, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageMeta } from '@/components/seo/PageMeta'
import { ContactForm } from '@/components/forms/ContactForm'
import { BookCallCta } from '@/components/cta/BookCallCta'
import { Container } from '@/components/ui'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { contactContent } from '@/content/pages'
import { SITE } from '@/constants/site'
import { resolveCalendlyUrl } from '@/lib/env'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ContactPage.module.css'

gsap.registerPlugin(ScrollTrigger)

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

export function ContactPage() {
  const [params] = useSearchParams()
  const intent = params.get('intent') || ''
  const service = params.get('service') || ''
  const hasCalendly = Boolean(resolveCalendlyUrl())
  const rootRef = useRef(null)
  const mediaRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    y: 28,
  })

  useLayoutEffect(() => {
    const media = mediaRef.current
    if (!media || prefersReducedMotion) return undefined

    const light = isLightMotion()
    const frame = media.querySelector('[data-contact-frame]')
    const floats = media.querySelectorAll('[data-contact-float]')

    const ctx = gsap.context(() => {
      if (frame) {
        gsap.fromTo(
          frame,
          { autoAlpha: 0, y: light ? 24 : 40, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: light ? 0.7 : 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: media, start: 'top 80%', once: true },
          },
        )

        if (!light) {
          gsap.to(frame, {
            y: -14,
            ease: 'none',
            scrollTrigger: {
              trigger: media,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          })
        }
      }

      floats.forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            delay: 0.2 + i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: media, start: 'top 78%', once: true },
          },
        )
        if (!light) {
          gsap.to(el, {
            y: i % 2 === 0 ? -7 : 8,
            duration: 3 + i * 0.35,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.5 + i * 0.15,
          })
        }
      })
    }, media)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <>
      <PageMeta
        title="Contact"
        description={contactContent.support}
        canonicalPath="/contact"
      />

      <section
        ref={rootRef}
        className={styles.page}
        data-header-theme="dark"
        aria-labelledby="contact-page-title"
      >
        <div className={styles.atmosphere} aria-hidden="true">
          <span className={styles.orbOne} />
          <span className={styles.orbTwo} />
          <span className={styles.mesh} />
        </div>

        <Container width="wide" className={styles.shell}>
          <div className={styles.layout}>
            <header className={styles.hero} data-fade-up>
              <p className={styles.eyebrow}>{contactContent.eyebrow}</p>
              <h1 id="contact-page-title" className={styles.title}>
                {contactContent.title}
              </h1>
              <p className={styles.support}>{contactContent.support}</p>
            </header>

            <div className={styles.formColumn} data-fade-up data-delay="80">
              <div className={styles.formCard}>
                <div className={styles.formHead}>
                  <h2 className={styles.formTitle}>Send a message</h2>
                  <p className={styles.formLead}>
                    Share goals, constraints, and timeline. We reply with clarifying questions or a
                    suggested next step.
                  </p>
                </div>
                <ContactForm defaultIntent={intent} defaultService={service} />
              </div>
              <p className={styles.privacyNote}>
                By submitting, you agree to our <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </div>

            <div className={styles.aside}>
              <div ref={mediaRef} className={styles.media} data-fade-up>
                <div className={styles.mediaStage}>
                  <span className={styles.mediaGlow} aria-hidden="true" />
                  <span className={styles.mediaAccent} aria-hidden="true" />
                  <div className={styles.mediaFrame} data-contact-frame>
                    <ClipReveal
                      src={contactContent.media.src}
                      alt={contactContent.media.alt}
                      className={styles.clip}
                      width={1024}
                      height={1536}
                    />
                    <span className={styles.mediaSheen} aria-hidden="true" />
                  </div>
                  <div className={styles.floatChip} data-contact-float>
                    <span className={styles.floatDot} aria-hidden="true" />
                    Partnership-ready
                  </div>
                  <div className={styles.floatPanel} data-contact-float>
                    <p className={styles.floatLabel}>{SITE.responseSla}</p>
                    <p className={styles.floatMeta}>Clear next steps — no hard sell</p>
                  </div>
                </div>
              </div>

              <ul className={styles.trust} role="list" data-fade-up data-delay="80">
                {contactContent.trust.map((item) => {
                  const Icon =
                    item.icon === 'clock'
                      ? Clock3
                      : item.icon === 'shield'
                        ? ShieldCheck
                        : Sparkles
                  return (
                    <li key={item.title} className={styles.trustItem}>
                      <span className={styles.trustIcon} aria-hidden="true">
                        <Icon size={18} strokeWidth={2.1} />
                      </span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className={styles.process} data-fade-up data-delay="120">
                <h2 className={styles.processTitle}>What happens next</h2>
                <ol className={styles.processList}>
                  {contactContent.nextSteps.map((step, index) => (
                    <li key={step}>
                      <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.contactCard} data-fade-up data-delay="160">
                <a className={styles.emailLink} href={`mailto:${SITE.email}`}>
                  <Mail size={18} strokeWidth={2} aria-hidden="true" />
                  {SITE.email}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <p className={styles.remote}>Remote-first · Global collaboration</p>
                <div className={styles.bookBlock}>
                  <BookCallCta size="md" label="Book a discovery call" />
                  <p className={styles.bookHint}>
                    {hasCalendly
                      ? 'Self-schedule a 20-minute intro — no form required.'
                      : 'Prefer a call? Mention discovery in your message and we will send times.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
