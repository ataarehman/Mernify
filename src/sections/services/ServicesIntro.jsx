import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { servicesPage } from '@/content/services'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ServicesIntro.module.css'

gsap.registerPlugin(ScrollTrigger)

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

/**
 * Premium overlapping dual-image stack (reference “Who we are” composition).
 * - Staggered entrance from opposite diagonals
 * - Scroll parallax for depth (desktop)
 * - ClipReveal tile masks (HTML tw-clip-anim parity)
 * - Subtle hover lift / scale
 */
function OverlapStack({ back, front }) {
  const stackRef = useRef(null)
  const backRef = useRef(null)
  const frontRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useLayoutEffect(() => {
    const stack = stackRef.current
    const backEl = backRef.current
    const frontEl = frontRef.current
    if (!stack || !backEl || !frontEl) return undefined

    const backMotion = backEl.querySelector('[data-overlap-motion]')
    const frontMotion = frontEl.querySelector('[data-overlap-motion]')
    if (!backMotion || !frontMotion) return undefined

    if (prefersReducedMotion) {
      gsap.set([backEl, frontEl, backMotion, frontMotion], {
        clearProps: 'all',
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      })
      return undefined
    }

    const light = isLightMotion()
    const ctx = gsap.context(() => {
      gsap.set(backMotion, {
        autoAlpha: 0,
        x: light ? 24 : 52,
        y: light ? -28 : -64,
        scale: 0.94,
        rotate: 2.5,
      })
      gsap.set(frontMotion, {
        autoAlpha: 0,
        x: light ? -24 : -52,
        y: light ? 28 : 64,
        scale: 0.94,
        rotate: -2,
      })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: stack,
            start: 'top 78%',
            once: true,
          },
        })
        .to(
          backMotion,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: light ? 0.85 : 1.15,
            ease: 'power3.out',
          },
          0,
        )
        .to(
          frontMotion,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: light ? 0.85 : 1.15,
            ease: 'power3.out',
          },
          light ? 0.08 : 0.16,
        )

      if (!light) {
        gsap.fromTo(
          backEl,
          { y: 28 },
          {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: stack,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        )
        gsap.fromTo(
          frontEl,
          { y: -20 },
          {
            y: 44,
            ease: 'none',
            scrollTrigger: {
              trigger: stack,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.85,
            },
          },
        )
      }
    }, stack)

    return () => ctx.revert()
  }, [prefersReducedMotion, back.src, front.src])

  return (
    <div ref={stackRef} className={styles.stack}>
      <div ref={backRef} className={[styles.frame, styles.frameBack].join(' ')}>
        <div data-overlap-motion className={styles.motion}>
          <div className={styles.frameInner}>
            <ClipReveal src={back.src} alt={back.alt} className={styles.clip} start="top 80%" />
          </div>
        </div>
      </div>
      <div ref={frontRef} className={[styles.frame, styles.frameFront].join(' ')}>
        <div data-overlap-motion className={styles.motion}>
          <div className={styles.frameInner}>
            <ClipReveal src={front.src} alt={front.alt} className={styles.clip} start="top 78%" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ServicesIntro() {
  const rootRef = useRef(null)
  const { intro } = servicesPage

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
      aria-labelledby="services-intro-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
      </div>

      <Container width="wide" className={styles.shell}>
        <div className={styles.layout}>
          <div className={styles.copy} data-fade-up data-delay="200" data-duration="1000">
            <p className={styles.eyebrow}>{intro.eyebrow}</p>
            <h2 id="services-intro-title" className={styles.title}>
              {intro.title}
            </h2>
            {intro.support ? <p className={styles.support}>{intro.support}</p> : null}
          </div>

          <OverlapStack back={intro.media.back} front={intro.media.front} />

          <ul className={styles.tags} role="list" aria-label="Service capabilities">
            {intro.tags.map((tag, index) => (
              <li
                key={tag.to}
                className={styles.tagItem}
                data-fade-up
                data-delay={String(200 + (index % 4) * 80)}
                data-duration="1000"
                style={{ '--tag-shift': `${(index % 3) * 0.55}rem` }}
              >
                <Link to={tag.to} className={styles.tag}>
                  {tag.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
