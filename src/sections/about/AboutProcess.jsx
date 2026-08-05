import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ClipboardList,
  Code2,
  Compass,
  FlaskConical,
  PenTool,
  Rocket,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button, Container } from '@/components/ui'
import { aboutContent } from '@/content/pages'
import { processSteps } from '@/content/process'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './AboutProcess.module.css'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  discover: Compass,
  plan: ClipboardList,
  design: PenTool,
  develop: Code2,
  test: FlaskConical,
  launch: Rocket,
}

export function AboutProcess() {
  const rootRef = useRef(null)
  const progressRef = useRef(null)
  const [active, setActive] = useState(0)
  const { prefersReducedMotion } = useReducedMotion()
  const steps = processSteps.filter((step) => step.id !== 'improve')
  const { process } = aboutContent
  const activeStep = steps[active] || steps[0]

  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 82%', y: 30 })

  useLayoutEffect(() => {
    const root = rootRef.current
    const progress = progressRef.current
    if (!root || !progress || prefersReducedMotion) {
      if (progress) gsap.set(progress, { scaleX: 1 })
      return undefined
    }

    const light =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(max-width: 900px)').matches

    const cards = Array.from(root.querySelectorAll('[data-process-step]'))
    const ctx = gsap.context(() => {
      if (light) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: root.querySelector(`.${styles.grid}`),
              start: 'top 80%',
              once: true,
            },
          },
        )
      } else {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root.querySelector(`.${styles.grid}`),
              start: 'top 70%',
              end: 'bottom 40%',
              scrub: 0.55,
            },
          },
        )
      }

      cards.forEach((card, index) => {
        if (!light) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 65%',
            end: 'bottom 45%',
            onEnter: () => setActive(index),
            onEnterBack: () => setActive(index),
          })
        }

        gsap.fromTo(
          card,
          { autoAlpha: 0, y: light ? 18 : 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: light ? 0.55 : 0.7,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              once: true,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="about-process-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.gridFade} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerCopy} data-fade-up>
            <p className={styles.eyebrow}>{process.eyebrow}</p>
            <h2 id="about-process-title" className={styles.title}>
              {process.title}
            </h2>
            <p className={styles.support}>{process.support}</p>
          </div>

          <aside className={styles.status} data-fade-up data-delay="80" aria-live="polite">
            <span className={styles.statusIndex}>
              {String(active + 1).padStart(2, '0')}
              <span>/{String(steps.length).padStart(2, '0')}</span>
            </span>
            <span className={styles.statusLabel}>{activeStep.title}</span>
            <span className={styles.statusHint}>Current stage</span>
          </aside>
        </header>

        <div className={styles.progress} data-fade-up aria-hidden="true">
          <span className={styles.progressTrack} />
          <span ref={progressRef} className={styles.progressFill} />
        </div>

        <ol className={styles.grid} role="list">
          {steps.map((step, index) => {
            const Icon = ICONS[step.id] || Compass
            const isActive = active === index
            return (
              <li
                key={step.id}
                data-process-step
                className={[styles.card, isActive ? styles.cardActive : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className={styles.watermark} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={styles.cardGlow} aria-hidden="true" />

                <div className={styles.cardTop}>
                  <span className={styles.stepIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.iconWrap} aria-hidden="true">
                    <span className={styles.iconRing} />
                    <span className={styles.stepIcon}>
                      <Icon size={18} strokeWidth={2.1} />
                    </span>
                  </span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.summary}</p>

                <ul className={styles.outputs} role="list">
                  {step.outputs.slice(0, 3).map((output) => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>

        {process.cta ? (
          <div className={styles.footer} data-fade-up>
            <Button as={Link} to={process.cta.to} variant="ghost" size="md">
              {process.cta.label}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
