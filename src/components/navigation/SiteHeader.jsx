import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Clock, MapPin, Mail, Send, X } from 'lucide-react'
import gsap from 'gsap'
import { Container, LogoMark, Button } from '@/components/ui'
import { ServicesMegaMenu } from '@/components/navigation/ServicesMegaMenu'
import { footerSocial, megaServiceSlugs, navigation, primaryCta } from '@/content/navigation'
import { getServiceBySlug } from '@/content/services'
import { SITE } from '@/constants/site'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { useMotion } from '@/app/providers/useMotion'
import styles from './SiteHeader.module.css'

function setNavVisible(header, visible) {
  if (!header) return
  gsap.set(header.querySelectorAll('[data-nav-enter]'), {
    y: 0,
    autoAlpha: visible ? 1 : 0,
  })
}

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

const NEWSLETTER_ENDPOINT = String(import.meta.env.VITE_CONTACT_ENDPOINT || 'https://www.mernify.co/api/contact')
  .replace('/api/contact', '/api/newsletter')

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()
    const val = email.trim()
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return
    setStatus('loading')
    try {
      const endpoint = NEWSLETTER_ENDPOINT || 'https://mernify.co/api/newsletter'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: val }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') return <p style={{ fontSize: '0.85rem', color: 'inherit' }}>Thanks! We&apos;ll be in touch.</p>

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter mail"
        aria-label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
        required
      />
      <button type="submit" aria-label="Subscribe" disabled={status === 'loading'}>
        <Send size={16} aria-hidden="true" />
      </button>
      {status === 'error' && <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'inherit' }}>Failed. Try again.</p>}
    </form>
  )
}

export function SiteHeader() {
  const { pathname } = useLocation()
  const { prefersReducedMotion } = useReducedMotion()
  const { lenis } = useMotion()
  const [theme, setTheme] = useState('dark')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const menuId = useId()
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  const megaServices = megaServiceSlugs.map((slug) => getServiceBySlug(slug)).filter(Boolean)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-header-theme]'))
    if (!sections.length) {
      setTheme(pathname === '/' ? 'dark' : 'light')
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target) {
          setTheme(visible.target.getAttribute('data-header-theme') || 'light')
        }
      },
      {
        rootMargin: '-10% 0px -70% 0px',
        threshold: [0.05, 0.2, 0.4, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    const readY = () => lenis?.current?.scroll ?? window.scrollY ?? 0
    const onScroll = () => setScrolled(readY() > 16)
    onScroll()

    const instance = lenis?.current
    if (instance) {
      instance.on('scroll', onScroll)
      return () => instance.off('scroll', onScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lenis])

  useEffect(() => {
    document.documentElement.classList.toggle('mf-nav-open', menuOpen)
    const instance = lenis?.current
    if (menuOpen) instance?.stop?.()
    else instance?.start?.()

    const main = document.getElementById('main-content')
    const footer = document.querySelector('footer')
    if (menuOpen) {
      main?.setAttribute('inert', '')
      footer?.setAttribute('inert', '')
    } else {
      main?.removeAttribute('inert')
      footer?.removeAttribute('inert')
    }

    return () => {
      document.documentElement.classList.remove('mf-nav-open')
      instance?.start?.()
      main?.removeAttribute('inert')
      footer?.removeAttribute('inert')
    }
  }, [menuOpen, lenis])

  useEffect(() => {
    if (!menuOpen) return undefined

    const panel = panelRef.current
    const focusables = panel
      ? Array.from(
          panel.querySelectorAll(
            'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
          ),
        )
      : []
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setMobileServicesOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || focusables.length === 0) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
  }, [pathname])

  // The toggle is hidden from 1024px up, so an open panel would otherwise be
  // stranded when the viewport grows past the desktop breakpoint.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const sync = () => {
      if (desktop.matches) {
        setMenuOpen(false)
        setMobileServicesOpen(false)
      }
    }
    desktop.addEventListener('change', sync)
    return () => desktop.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return undefined

    if (prefersReducedMotion) {
      setNavVisible(header, true)
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.querySelectorAll('[data-nav-enter]'),
        { y: -14, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.05,
        },
      )
    }, header)

    return () => ctx.revert()
  }, [prefersReducedMotion, pathname])

  const closeMenu = () => {
    setMenuOpen(false)
    setMobileServicesOpen(false)
  }

  const isHome = pathname === '/'
  const inverted = !menuOpen && !scrolled && isHome && theme === 'dark'

  return (
    <header
      ref={headerRef}
      className={[
        styles.header,
        inverted ? styles.dark : styles.light,
        scrolled ? styles.scrolled : '',
        menuOpen ? styles.menuOpen : '',
        !isHome ? styles.innerPage : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Container width="wide" className={styles.inner}>
        <div data-nav-enter className={styles.brand}>
          <LogoMark inverted={inverted} />
        </div>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navigation.map((item) =>
            item.mega === 'services' ? (
              <div
                key={item.to}
                className={styles.navItem}
                data-nav-enter
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <NavLink
                  to={item.to}
                  data-cursor="interactive"
                  className={({ isActive }) =>
                    [styles.navLink, isActive || servicesOpen ? styles.active : '']
                      .filter(Boolean)
                      .join(' ')
                  }
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                >
                  <span className={styles.navLabel}>{item.label}</span>
                </NavLink>
                <ServicesMegaMenu open={servicesOpen} onClose={() => setServicesOpen(false)} />
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                data-nav-enter
                data-cursor="interactive"
                end={item.to === '/'}
                className={({ isActive }) =>
                  [styles.navLink, isActive ? styles.active : ''].filter(Boolean).join(' ')
                }
              >
                <span className={styles.navLabel}>{item.label}</span>
              </NavLink>
            ),
          )}
        </nav>

        <div className={styles.actions}>
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            data-nav-enter
            data-cursor="interactive"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              className={styles.menuToggleIcon}
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M11 15H21M1 8H21M1 1H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div data-nav-enter className={styles.ctaWrap}>
            <Button as={NavLink} to={primaryCta.to} size="sm">
              {primaryCta.label}
            </Button>
          </div>
        </div>
      </Container>

      <button
        type="button"
        className={[styles.overlay, menuOpen ? styles.overlayOpen : ''].join(' ')}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <aside
        ref={panelRef}
        id={menuId}
        className={[styles.offcanvas, menuOpen ? styles.offcanvasOpen : ''].join(' ')}
        aria-hidden={!menuOpen}
        // `inert` keeps the closed panel out of the tab order; `aria-hidden`
        // alone hides it from screen readers but leaves the links focusable.
        inert={!menuOpen}
      >
        <div className={styles.offcanvasTop}>
          <button
            type="button"
            className={styles.offcanvasClose}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <X size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>

          <div className={styles.offcanvasLogo}>
            <LogoMark />
          </div>

          <p className={styles.offcanvasTitle}>{SITE.positioning}</p>

          <nav className={styles.offcanvasNav} aria-label="Mobile">
            {navigation.map((item) =>
              item.mega === 'services' ? (
                <div key={item.to} className={styles.offcanvasItem}>
                  <button
                    type="button"
                    className={styles.offcanvasLink}
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((open) => !open)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={[
                        styles.offcanvasChevron,
                        mobileServicesOpen ? styles.offcanvasChevronOpen : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-hidden="true"
                    />
                  </button>
                  <ul
                    className={[
                      styles.offcanvasSub,
                      mobileServicesOpen ? styles.offcanvasSubOpen : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <li>
                      <NavLink to="/services" onClick={closeMenu}>
                        All services
                      </NavLink>
                    </li>
                    {megaServices.map((service) => (
                      <li key={service.slug}>
                        <NavLink to={`/services/${service.slug}`} onClick={closeMenu}>
                          {service.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div key={item.to} className={styles.offcanvasItem}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={styles.offcanvasLink}
                    onClick={closeMenu}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </NavLink>
                </div>
              ),
            )}
          </nav>
        </div>

        <div className={styles.offcanvasBottom}>
          {/* These labels are chrome, not document structure — using real
              headings here puts them in the outline ahead of the page's h1. */}
          <div className={styles.offcanvasContact}>
            <p className={styles.offcanvasHeading}>Contact us</p>
            <ul>
              <li>
                <MapPin size={16} aria-hidden="true" />
                <span>Remote-first · Global collaboration</span>
              </li>
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <Clock size={16} aria-hidden="true" />
                <span>{SITE.responseSla}</span>
              </li>
            </ul>
          </div>

          <div className={styles.offcanvasInput}>
            <p className={styles.offcanvasHeading}>Get Updates</p>
            <NewsletterForm />
          </div>

          <div className={styles.offcanvasSocial}>
            {footerSocial.map((item) => {
              const Icon = SOCIAL_ICONS[item.id]
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  {Icon ? <Icon /> : null}
                </a>
              )
            })}
          </div>

          <Button as={Link} to={primaryCta.to} size="md" block onClick={closeMenu}>
            {primaryCta.label}
          </Button>
        </div>
      </aside>
    </header>
  )
}
