import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button, Container } from '@/components/ui'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HomeFinalCta.module.css'

gsap.registerPlugin(ScrollTrigger)

export function HomeFinalCta() {
  const sectionRef = useRef(null)
  const modulesRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const modules = modulesRef.current
    if (!section || !modules || prefersReducedMotion) return undefined

    const mods = modules.querySelectorAll('[data-mod]')

    const ctx = gsap.context(() => {
      // Modules start separated, assemble on scroll-into-view
      gsap.set(mods[0], { x: -60, y: -30, opacity: 0 })
      gsap.set(mods[1], { x: 60, y: -30, opacity: 0 })
      gsap.set(mods[2], { x: 0, y: 50, opacity: 0 })

      gsap.to(mods, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 68%',
        },
      })

      gsap.from(section.querySelectorAll('[data-cta-reveal]'), {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
        },
        delay: 0.4,
      })
    }, section)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="cta-title"
    >
      <div className={styles.glow} aria-hidden="true" />

      {/* Module assembly */}
      <div ref={modulesRef} className={styles.modules} aria-hidden="true">
        <div className={`${styles.mod} ${styles.modL}`} data-mod />
        <div className={`${styles.mod} ${styles.modC}`} data-mod />
        <div className={`${styles.mod} ${styles.modR}`} data-mod />
      </div>

      <Container className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow} data-cta-reveal>
            Start your product journey
          </p>
          <h2 id="cta-title" className={styles.title} data-cta-reveal>
            Your Next Product<br />Starts Here.
          </h2>
          <p className={styles.support} data-cta-reveal>
            Bring us the idea, operational challenge, or existing product.
            We will help turn it into a scalable digital experience.
          </p>
          <div className={styles.actions} data-cta-reveal>
            <Button
              as={NavLink}
              to="/contact"
              size="lg"
              magnetic
              className={styles.primary}
            >
              Schedule a Discovery Call
            </Button>
            <Button
              as={NavLink}
              to="/contact?subject=product"
              size="lg"
              variant="ghost"
              className={styles.secondary}
            >
              Tell Us About Your Product
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
