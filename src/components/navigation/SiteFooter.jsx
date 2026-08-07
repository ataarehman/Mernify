import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button, Container, LogoMark } from '@/components/ui'
import { FooterRipple } from '@/components/motion/FooterRipple'
import { FooterGlobe } from '@/components/motion/FooterGlobe'
import { FooterGalaxyBg } from '@/components/motion/FooterGalaxyBg'
import {
  footerCompany,
  footerLegal,
  footerResources,
  footerServices,
  footerSocial,
  footerSolutions,
  footerTrust,
  primaryCta,
} from '@/content/navigation'
import { SITE } from '@/constants/site'
import { useFadeUp } from '@/hooks/useFadeUp'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './SiteFooter.module.css'

gsap.registerPlugin(ScrollTrigger)

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.174 2.097 15.943 2 14.643 2 11.928 2 10 3.657 10 6.7V9.5H7.5v4H10V22h4z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.75V21h3.19V8.5zM5.34 3C4.22 3 3.3 3.93 3.3 5.06c0 1.12.9 2.05 2.06 2.05h.02c1.14 0 2.05-.93 2.05-2.05C7.41 3.93 6.5 3 5.34 3zM20.25 21h-3.18v-6.52c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43V21H9.24V8.5h3.05v1.71h.04c.42-.8 1.46-1.65 3-1.65 3.21 0 3.8 2.11 3.8 4.86V21z" />
    </svg>
  )
}

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
}

const NAV_COLUMNS = [
  { title: 'Services', items: footerServices },
  { title: 'Solutions', items: footerSolutions },
  { title: 'Company', items: footerCompany },
  { title: 'Resources', items: footerResources },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  const navigate = useNavigate()
  const footerRef = useRef(null)
  const markRef = useRef(null)
  const [email, setEmail] = useState('')
  const { prefersReducedMotion } = useReducedMotion()

  useFadeUp(footerRef, {
    selector: '[data-fade-up]',
    start: 'top 90%',
    stagger: 0.08,
    duration: 0.85,
  })

  useLayoutEffect(() => {
    const mark = markRef.current
    if (!mark || prefersReducedMotion) return undefined

    const chars = mark.querySelectorAll('[data-footer-char]')
    if (!chars.length) return undefined

    // Reachable start: original `bottom 100%-=50px` sat past max scroll on this tall mark.
    const start = 'top 95%'

    const ctx = gsap.context(() => {
      gsap.set(mark, { opacity: 0 })
      gsap.to(mark, {
        opacity: 1,
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: mark,
          start,
          once: true,
        },
      })

      const bounce = gsap.timeline({
        repeat: -1,
        delay: 0.5,
        scrollTrigger: {
          trigger: mark,
          start,
        },
      })

      bounce
        .to(chars, {
          duration: 0.5,
          scaleY: 0.6,
          ease: 'power1.out',
          stagger: 0.04,
          transformOrigin: 'center bottom',
        })
        .to(
          chars,
          {
            yPercent: -10,
            ease: 'elastic',
            stagger: 0.03,
            duration: 0.8,
          },
          0.5,
        )
        .to(
          chars,
          {
            scaleY: 1,
            ease: 'elastic.out',
            stagger: 0.03,
            duration: 1.5,
          },
          0.5,
        )
        .to(
          chars,
          {
            yPercent: 0,
            ease: 'back',
            stagger: 0.03,
            duration: 0.8,
          },
          0.7,
        )
        .to(
          chars,
          {
            color: '#ffffff',
            duration: 1.4,
            stagger: 0.05,
          },
        )
    }, mark)

    // Lenis / late footer layout — re-measure so the trigger can arm.
    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [prefersReducedMotion])

  function onNewsletter(event) {
    event.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      navigate('/contact')
      return
    }
    navigate(`/contact?email=${encodeURIComponent(trimmed)}`)
  }

  return (
    <footer ref={footerRef} className={styles.footer} data-header-theme="dark">
      <div className={styles.atmosphere} aria-hidden="true">
        <FooterGalaxyBg hostRef={footerRef} />
        <span className={styles.orbA} />
        <span className={styles.orbB} />
        <span className={styles.grid} />
        <FooterGlobe />
      </div>

      <FooterRipple interactiveRef={footerRef} />

      <div className={styles.readability} aria-hidden="true" />
      <Container width="wide" className={styles.inner}>
        <div className={styles.ctaBand} data-fade-up>
          <div className={styles.ctaCopy}>
            <p className={styles.ctaEyebrow}>
              <Sparkles size={14} aria-hidden="true" />
              Let&apos;s build
            </p>
            <h2 className={styles.ctaTitle}>Ready to discuss your next product?</h2>
            <p className={styles.ctaSupport}>
              Share the idea, operational challenge, or existing product. We&apos;ll help turn it
              into a scalable digital experience.
            </p>
          </div>

          <form className={styles.newsletter} onSubmit={onNewsletter} noValidate>
            <label className={styles.srOnly} htmlFor="footer-email">
              Work email
            </label>
            <div className={styles.newsletterField}>
              <Mail className={styles.newsletterIcon} size={18} aria-hidden="true" />
              <input
                id="footer-email"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="karen.d@example.net"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className={styles.newsletterActions}>
              <button type="submit" className={styles.newsletterBtn}>
                Get in touch
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
              <Button as={Link} to={primaryCta.to} size="md">
                {primaryCta.label}
              </Button>
            </div>
          </form>
        </div>

        <div className={styles.main}>
          <div className={styles.brand} data-fade-up>
            <div className={styles.logoWrap}>
              <LogoMark inverted />
            </div>
            <p className={styles.promise}>{SITE.promise}</p>
            <a className={styles.email} href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>

            <ul className={styles.social} role="list">
              {footerSocial.map((item) => {
                const Icon = SOCIAL_ICONS[item.id]
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                    >
                      <span className={styles.socialLabel}>
                        {item.label}
                        <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden="true" />
                      </span>
                      <span className={styles.socialIcon} aria-hidden="true">
                        {Icon ? <Icon /> : null}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <nav className={styles.columns} aria-label="Footer" data-fade-up>
            {NAV_COLUMNS.map((column) => (
              <div key={column.title} className={styles.column}>
                <h3 className={styles.columnTitle}>{column.title}</h3>
                <ul className={styles.columnLinks} role="list">
                  {column.items.map((item) => (
                    <li key={item.to + item.label}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <ul className={styles.trust} role="list" data-fade-up>
          {footerTrust.map((item, index) => (
            <li key={item} className={styles.trustItem}>
              {index === 0 ? (
                <Lock size={14} aria-hidden="true" />
              ) : (
                <ShieldCheck size={14} aria-hidden="true" />
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className={styles.bottom} data-fade-up>
          <p className={styles.copyright}>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className={styles.legal}>
            {footerLegal.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.markWrap}>
          <h3 ref={markRef} className={styles.displayMark} aria-hidden="true">
            {SITE.name.split('').map((char, index) => (
              <span key={`${char}-${index}`} data-footer-char className={styles.footerChar}>
                {char}
              </span>
            ))}
          </h3>
        </div>
      </Container>
    </footer>
  )
}
