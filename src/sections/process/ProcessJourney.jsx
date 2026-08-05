import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Check, Clock3 } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { processPage } from '@/content/process'
import { getProcessIcon } from '@/lib/processIcons'
import { useMotion } from '@/app/providers/useMotion'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ProcessJourney.module.css'

gsap.registerPlugin(ScrollTrigger)

const RING_RADIUS = 52
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

/**
 * Split-screen journey: a sticky console on the left tracks the active stage
 * and overall progress while the stage detail scrolls beside it. Below the
 * desktop breakpoint the console drops away and each stage reads as a
 * self-contained card, so nothing depends on sticky positioning.
 */
export function ProcessJourney() {
  const { eyebrow, title, support, panelLabel, progressLabel, note, items } = processPage.journey
  const trackRef = useRef(null)
  const ringRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { prefersReducedMotion } = useReducedMotion()
  const { scrollTo } = useMotion()

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const ring = ringRef.current
        if (ring) {
          gsap.fromTo(
            ring,
            { strokeDashoffset: RING_CIRCUMFERENCE },
            {
              strokeDashoffset: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: track,
                start: 'top 60%',
                end: 'bottom 70%',
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            },
          )
        }

        const rail = track.querySelector(`.${styles.railFill}`)
        if (rail) {
          gsap.fromTo(
            rail,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: track,
                start: 'top 60%',
                end: 'bottom 70%',
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            },
          )
        }

        gsap.utils.toArray(`.${styles.stage}`, track).forEach((stage, index) => {
          gsap.from(stage.querySelectorAll('[data-stage-part]'), {
            opacity: 0,
            y: 26,
            duration: 0.7,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: { trigger: stage, start: 'top 85%', once: true },
          })

          ScrollTrigger.create({
            trigger: stage,
            start: 'top 58%',
            end: 'bottom 58%',
            onEnter: () => {
              stage.setAttribute('data-reached', 'true')
              setActiveIndex(index)
            },
            onEnterBack: () => {
              stage.setAttribute('data-reached', 'true')
              setActiveIndex(index)
            },
            onLeaveBack: () => stage.removeAttribute('data-reached'),
          })
        })
      })
    }, track)

    return () => ctx.revert()
  }, [])

  const jumpTo = useCallback(
    (id, index) => {
      const el = document.getElementById(`stage-${id}`)
      if (!el) return
      setActiveIndex(index)
      if (prefersReducedMotion) {
        el.scrollIntoView({ behavior: 'auto', block: 'center' })
        return
      }
      scrollTo(el, { offset: -140, duration: 1 })
    },
    [prefersReducedMotion, scrollTo],
  )

  const active = items[activeIndex] || items[0]
  const ActiveIcon = getProcessIcon(active.id)
  const total = items.length
  const percent = Math.round(((activeIndex + 1) / total) * 100)

  return (
    <section
      id="journey"
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="process-journey-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.mesh} />
      </div>

      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-fade-up>
          <div className={styles.headCopy}>
            <Eyebrow rule className={styles.eyebrow}>
              {eyebrow}
            </Eyebrow>
            <h2 id="process-journey-title" className={styles.title}>
              {title}
            </h2>
          </div>
          <p className={styles.support}>{support}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.sidebar}>
            <div className={styles.console} aria-hidden="true">
              <div className={styles.gauge}>
                <svg className={styles.ring} viewBox="0 0 120 120" role="presentation">
                  <circle className={styles.ringTrack} cx="60" cy="60" r={RING_RADIUS} />
                  <circle
                    ref={ringRef}
                    className={styles.ringFill}
                    cx="60"
                    cy="60"
                    r={RING_RADIUS}
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={RING_CIRCUMFERENCE}
                  />
                </svg>
                <span className={styles.gaugeIcon}>
                  <ActiveIcon size={26} strokeWidth={1.7} />
                </span>
              </div>

              <p className={styles.consoleLabel}>{panelLabel}</p>
              <p className={styles.consoleStage}>
                <span className={styles.consoleIndex}>
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className={styles.consoleTitle}>{active.title}</span>
              </p>
              <p className={styles.consoleLead}>{active.lead}</p>

              <div className={styles.meter}>
                <span className={styles.meterHead}>
                  <span className={styles.meterLabel}>{progressLabel}</span>
                  <span className={styles.meterValue}>
                    {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </span>
                <span className={styles.meterTrack}>
                  <span className={styles.meterFill} style={{ width: `${percent}%` }} />
                </span>
              </div>
            </div>

            <nav className={styles.stepper} aria-label="Delivery stages">
              <ol className={styles.stepperList}>
                {items.map((step, index) => {
                  const Icon = getProcessIcon(step.id)
                  const isActive = index === activeIndex
                  return (
                    <li key={step.id}>
                      <button
                        type="button"
                        className={styles.stepperItem}
                        data-active={isActive ? 'true' : undefined}
                        aria-current={isActive ? 'step' : undefined}
                        onClick={() => jumpTo(step.id, index)}
                      >
                        <span className={styles.stepperIcon} aria-hidden="true">
                          <Icon size={15} strokeWidth={2} />
                        </span>
                        <span className={styles.stepperIndex}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={styles.stepperTitle}>{step.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </nav>

            <p className={styles.consoleNote}>{note}</p>
          </div>

          <div ref={trackRef} className={styles.track}>
            <span className={styles.rail} aria-hidden="true">
              <span className={styles.railFill} />
            </span>

            <ol className={styles.stages}>
              {items.map((step, index) => {
                const Icon = getProcessIcon(step.id)

                return (
                  <li
                    key={step.id}
                    id={`stage-${step.id}`}
                    className={styles.stage}
                    data-stage={step.id}
                  >
                    <span className={styles.marker} aria-hidden="true">
                      <span className={styles.markerRing} />
                      <Icon size={19} strokeWidth={1.9} />
                    </span>

                    <article className={styles.card}>
                      <div className={styles.cardTop} data-stage-part>
                        <div className={styles.cardHeading}>
                          <span className={styles.counter}>
                            <span className={styles.counterNumber}>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className={styles.counterTotal}>
                              / {String(total).padStart(2, '0')}
                            </span>
                          </span>
                          <h3 className={styles.stageTitle}>{step.title}</h3>
                          <p className={styles.stageLead}>{step.lead}</p>
                        </div>

                        <span className={styles.duration}>
                          <Clock3 size={14} strokeWidth={2} aria-hidden="true" />
                          {step.duration}
                        </span>
                      </div>

                      <p className={styles.stageText} data-stage-part>
                        {step.summary}
                      </p>

                      <div className={styles.panels} data-stage-part>
                        <div className={styles.panel}>
                          <p className={styles.panelLabel}>What happens</p>
                          <ul className={styles.activities} role="list">
                            {step.activities.map((activity) => (
                              <li key={activity}>
                                <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={styles.panel}>
                          <p className={styles.panelLabel}>What you receive</p>
                          <ul className={styles.outputs} role="list">
                            {step.outputs.map((output) => (
                              <li key={output}>{output}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <p className={styles.handoff} data-stage-part>
                        <ArrowDown size={14} strokeWidth={2.2} aria-hidden="true" />
                        <span>{step.handoff}</span>
                      </p>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
