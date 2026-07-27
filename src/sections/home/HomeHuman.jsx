import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HomeHuman.module.css'

gsap.registerPlugin(ScrollTrigger)

const PRINCIPLES = [
  {
    id: 'direct',
    title: 'Direct communication',
    body: 'You talk to the engineers building your product — not account managers passing messages. Questions get real answers.',
  },
  {
    id: 'senior',
    title: 'Senior-level involvement',
    body: 'Every product engagement is led by experienced engineers. We do not scale with junior teams assigned after kickoff.',
  },
  {
    id: 'transparent',
    title: 'Transparent delivery',
    body: 'You see what is being built, when it was built, and why decisions were made. No black-box development cycles.',
  },
  {
    id: 'ownership',
    title: 'Product ownership',
    body: 'We think about your product\'s future, not just the current sprint. Architecture decisions account for where you are going.',
  },
  {
    id: 'quality',
    title: 'Built-in quality',
    body: 'Testing is not a phase that comes at the end. Every feature is built with quality gates from day one.',
  },
  {
    id: 'support',
    title: 'Long-term partnership',
    body: 'After launch, the work continues. We support, monitor, and evolve products as your business grows.',
  },
]

export function HomeHuman() {
  const sectionRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const el = sectionRef.current
    if (!el || prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-reveal]'), {
        opacity: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 72%',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="human-title">
      <Container className={styles.inner}>
        <div className={styles.statement} data-reveal>
          <h2 id="human-title" className={styles.title}>
            Complex Technology.<br />Clear Partnership.
          </h2>
          <p className={styles.support}>
            The most technically ambitious products succeed when the humans
            behind them communicate well. We have built our practice around
            making that easy.
          </p>
        </div>

        <div className={styles.grid} role="list">
          {PRINCIPLES.map((p) => (
            <div key={p.id} className={styles.principle} data-reveal role="listitem">
              <h3 className={styles.principleTitle}>{p.title}</h3>
              <p className={styles.principleBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
