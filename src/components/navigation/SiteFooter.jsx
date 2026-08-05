import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button, Container, LogoMark } from '@/components/ui'
import {
  footerCompany,
  footerLegal,
  footerNav,
  footerServices,
  footerSocial,
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

export function SiteFooter() {
  const year = new Date().getFullYear()
  const footerRef = useRef(null)
  const markRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useFadeUp(footerRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    stagger: 0.12,
    duration: 0.9,
  })

  useLayoutEffect(() => {
    const mark = markRef.current
    if (!mark || prefersReducedMotion) return undefined

    const chars = mark.querySelectorAll('[data-footer-char]')
    if (!chars.length) return undefined

    const ctx = gsap.context(() => {
      gsap.set(mark, { autoAlpha: 0 })
      gsap.to(mark, {
        autoAlpha: 1,
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: mark,
          start: 'bottom 100%-=50px',
          once: true,
        },
      })

      const bounce = gsap.timeline({
        repeat: -1,
        delay: 0.5,
        scrollTrigger: {
          trigger: mark,
          start: 'bottom 100%-=50px',
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
            ease: 'power1.inOut',
            stagger: 0.02,
            duration: 0.6,
          },
          1.2,
        )
        .to({}, { duration: 1.2 })
    }, mark)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <footer
      ref={footerRef}
      className={styles.footer}
      data-header-theme="dark"
    >
      <img
        className={styles.bgShape}
        src="/assets/images/shapes/footer-bg-shape.webp"
        alt=""
        aria-hidden="true"
        width={1920}
        height={720}
        loading="lazy"
        decoding="async"
      />

      <Container width="wide" className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.colLeft}>
            <div data-fade-up>
              <div className={styles.logoWrap}>
                <LogoMark inverted />
              </div>
              <p className={styles.paragraph}>{SITE.promise}</p>
              <a className={styles.email} href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </div>

            <div className={styles.social} data-fade-up>
              <ul>
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
                        <span className={styles.activeMedia}>
                          {item.label}
                          <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden="true" />
                        </span>
                        <span className={styles.hoverMedia} aria-hidden="true">
                          {Icon ? <Icon /> : null}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Footer" data-fade-up>
            <ul>
              {footerNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={styles.navLink}>
                    <span>{item.label}</span>
                    <ChevronRight size={18} strokeWidth={2.25} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.subGroups}>
              <div className={styles.subGroup}>
                <h2 className={styles.subHeading}>Services</h2>
                <ul className={styles.subLinks}>
                  {footerServices.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.subGroup}>
                <h2 className={styles.subHeading}>Company</h2>
                <ul className={styles.subLinks}>
                  {footerCompany.map((item) => (
                    <li key={item.label}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          <div className={styles.colRight}>
            <div data-fade-up>
              <h2 className={styles.ctaTitle}>Ready to discuss your next product?</h2>
              <p className={styles.ctaCopy}>
                Share the idea, operational challenge, or existing product. We’ll help turn it
                into a scalable digital experience.
              </p>
              <div className={styles.ctaAction}>
                <Button as={Link} to={primaryCta.to} size="md">
                  {primaryCta.label}
                </Button>
              </div>
            </div>
            <div className={styles.copyrightBlock} data-fade-up>
              <p className={styles.copyright}>
                © {year} {SITE.name}. All rights reserved
              </p>
              <div className={styles.legal}>
                {footerLegal.map((item) => (
                  <Link key={item.to} to={item.to}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
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
