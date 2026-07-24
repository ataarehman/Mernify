import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container, Eyebrow, Heading, Section } from '@/components/ui'
import { TechMark } from '@/components/media/TechMark'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { homeTrust } from '@/content/trust'
import styles from './HomeTrust.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * HomeTrust — quiet technology credibility band.
 * Spec: static grid, light tone, no competing CTA, hide if empty.
 */
export function HomeTrust() {
  const rootRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const partners = homeTrust.partners

  useEffect(() => {
    const root = rootRef.current
    if (!root || !partners.length) return undefined

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('[data-trust-animate]', { autoAlpha: 1, y: 0 })
        return
      }

      gsap.fromTo(
        '[data-trust-animate]',
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            id: 'mf:home:trust',
            trigger: root,
            start: 'top 85%',
            once: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [partners.length, prefersReducedMotion])

  if (!partners.length) return null

  return (
    <Section
      ref={rootRef}
      tone="light"
      headerTheme="light"
      className={styles.trust}
      aria-labelledby="home-trust-title"
    >
      <Container>
        <div className={styles.header} data-trust-animate>
          <Eyebrow>{homeTrust.eyebrow}</Eyebrow>
          <Heading id="home-trust-title" level={2} className={styles.title}>
            {homeTrust.title}
          </Heading>
        </div>

        <ul className={styles.grid} role="list">
          {partners.map((partner) => (
            <li key={partner.id} className={styles.item} data-trust-animate>
              <TechMark label={partner.label} path={partner.path} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
