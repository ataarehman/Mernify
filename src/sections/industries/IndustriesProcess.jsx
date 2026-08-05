import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container, Eyebrow } from '@/components/ui'
import { industriesPage } from '@/content/industries'
import { processSteps } from '@/content/process'
import { getProcessIcon } from '@/lib/processIcons'
import styles from './IndustriesProcess.module.css'

gsap.registerPlugin(ScrollTrigger)

/** Scroll position at which a stage counts as reached and lights up. */
const REACH_LINE = 'top 72%'

/**
 * Delivery stages as a connected timeline: a spine that fills with scroll
 * progress, icon nodes that light up as each stage is reached, and cards that
 * alternate either side of the spine on desktop.
 */
export function IndustriesProcess() {
  const { eyebrow, title, support } = industriesPage.process
  const timelineRef = useRef(null)

  useLayoutEffect(() => {
    const root = timelineRef.current
    if (!root) return undefined

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isMotion: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { isDesktop, isMotion } = context.conditions
          if (!isMotion) return

          const fill = root.querySelector(`.${styles.spineFill}`)
          if (fill) {
            gsap.fromTo(
              fill,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: root,
                  start: 'top 70%',
                  end: 'bottom 60%',
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                },
              },
            )
          }

          gsap.utils.toArray(`.${styles.step}`, root).forEach((step, index) => {
            const node = step.querySelector(`.${styles.node}`)
            const card = step.querySelector(`.${styles.card}`)

            // Cards arrive from their own side of the spine on desktop, and
            // straight up once the layout collapses to a single column.
            const fromSide = isDesktop ? (index % 2 === 0 ? -42 : 42) : 0

            gsap.from([node, card], {
              opacity: 0,
              x: (i) => (i === 0 ? 0 : fromSide),
              y: (i) => (i === 0 ? 18 : isDesktop ? 0 : 26),
              duration: 0.75,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: { trigger: step, start: 'top 88%', once: true },
            })

            ScrollTrigger.create({
              trigger: step,
              start: REACH_LINE,
              onEnter: () => step.setAttribute('data-reached', 'true'),
              onLeaveBack: () => step.removeAttribute('data-reached'),
            })
          })
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  const total = String(processSteps.length).padStart(2, '0')

  return (
    <section
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="industries-process-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orb} />
        <span className={styles.horizon} />
      </div>

      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-fade-up>
          <div className={styles.headCopy}>
            <Eyebrow rule className={styles.eyebrow}>
              {eyebrow}
            </Eyebrow>
            <h2 id="industries-process-title" className={styles.title}>
              {title}
            </h2>
          </div>
          <p className={styles.support}>{support}</p>
        </header>

        <div ref={timelineRef} className={styles.track}>
          <span className={styles.spine} aria-hidden="true">
            <span className={styles.spineFill} />
          </span>

          <ol className={styles.timeline}>
            {processSteps.map((step, index) => {
              const Icon = getProcessIcon(step.id)

              return (
                <li key={step.id} className={styles.step}>
                  <span className={styles.node} aria-hidden="true">
                    <span className={styles.nodeRing} />
                    <Icon size={20} strokeWidth={1.9} />
                  </span>

                  <article className={styles.card}>
                    <span className={styles.edge} aria-hidden="true" />
                    <header className={styles.cardHead}>
                      <span className={styles.index} aria-hidden="true">
                        <span className={styles.indexNumber}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={styles.indexTotal}>/ {total}</span>
                      </span>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                    </header>

                    <p className={styles.stepText}>{step.summary}</p>

                    <ul className={styles.outputs} role="list">
                      {step.outputs.slice(0, 2).map((output) => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}
