import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { Button, Container, LogoMark } from '@/components/ui'
import { Magnetic } from '@/components/ui/Magnetic'
import { navigation, primaryCta, secondaryCta } from '@/content/navigation'
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

export function SiteHeader() {
  const { pathname } = useLocation()
  const { prefersReducedMotion } = useReducedMotion()
  const { lenis } = useMotion()
  const [theme, setTheme] = useState('dark')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

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
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('mf-nav-open', menuOpen)
    const instance = lenis?.current
    if (menuOpen) instance?.stop?.()
    else instance?.start?.()
    return () => {
      document.documentElement.classList.remove('mf-nav-open')
      instance?.start?.()
    }
  }, [menuOpen, lenis])

  useEffect(() => {
    if (!menuOpen) return undefined

    const panel = panelRef.current
    const focusables = panel
      ? Array.from(
          panel.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
      : []
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
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
  }, [pathname])

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

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return undefined
    if (!menuOpen) return undefined

    const targets = panel.querySelectorAll('[data-mobile-enter]')
    if (prefersReducedMotion) {
      gsap.set(targets, { y: 0, autoAlpha: 1 })
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: 'power3.out',
        },
      )
    }, panel)

    return () => ctx.revert()
  }, [menuOpen, prefersReducedMotion])

  const inverted = theme === 'dark' || menuOpen

  return (
    <header
      ref={headerRef}
      className={[
        styles.header,
        inverted ? styles.dark : styles.light,
        scrolled ? styles.scrolled : '',
        menuOpen ? styles.menuOpen : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Container className={styles.inner}>
        <div data-nav-enter className={styles.brand}>
          <LogoMark inverted={inverted} />
        </div>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navigation.map((item) => (
            <Magnetic key={item.to} as="span" className={styles.navMagnetic} strength={0.4} radius={70}>
              <NavLink
                to={item.to}
                data-nav-enter
                data-cursor="interactive"
                className={({ isActive }) =>
                  [styles.navLink, isActive ? styles.active : ''].filter(Boolean).join(' ')
                }
              >
                <span className={styles.navLabel}>{item.label}</span>
                <span className={styles.navLine} aria-hidden="true" />
              </NavLink>
            </Magnetic>
          ))}
        </nav>

        <div className={styles.actions}>
          <div data-nav-enter className={styles.ctaWrap}>
            <Button
              as={NavLink}
              to={primaryCta.to}
              size="sm"
              magnetic
              arrow
              className={styles.cta}
            >
              {primaryCta.label}
            </Button>
          </div>

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
            <span className={styles.menuToggleBars} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </Container>

      <div
        ref={panelRef}
        id={menuId}
        className={[styles.mobilePanel, menuOpen ? styles.mobilePanelOpen : ''].join(' ')}
        hidden={!menuOpen}
      >
        <div className={styles.mobileGlow} aria-hidden="true" />
        <div className={styles.mobileIntro} data-mobile-enter>
          <p className={styles.mobileEyebrow}>Navigate</p>
          <p className={styles.mobileLead}>Explore how we design, engineer, and scale digital products.</p>
        </div>
        <nav className={styles.mobileNav} aria-label="Mobile">
          {navigation.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={styles.mobileLink}
              data-mobile-enter
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.mobileIndex}>0{index + 1}</span>
              <span className={styles.mobileLabel}>{item.label}</span>
              <span className={styles.mobileChevron} aria-hidden="true">
                →
              </span>
            </NavLink>
          ))}
        </nav>
        <div className={styles.mobileFooter} data-mobile-enter>
          <Button
            as={NavLink}
            to={primaryCta.to}
            size="lg"
            magnetic
            arrow
            className={styles.mobileCta}
            onClick={() => setMenuOpen(false)}
          >
            {primaryCta.label}
          </Button>
          <NavLink
            to={secondaryCta.to}
            className={styles.mobileSecondary}
            onClick={() => setMenuOpen(false)}
          >
            {secondaryCta.label}
          </NavLink>
        </div>
      </div>
    </header>
  )
}
