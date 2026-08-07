import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button, Container } from '@/components/ui'
import { homeJourney } from '@/content/home'
import { processSteps } from '@/content/process'
import { getProcessIcon } from '@/lib/processIcons'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { useInView } from '@/hooks/useInView'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './HomeJourney.module.css'

gsap.registerPlugin(ScrollTrigger)

const homeProcessSteps = processSteps.filter((step) => step.id !== 'improve')


export function HomeJourney() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const processTitleRef = useRef(null)
  const timelineRef = useRef(null)
  const progressRef = useRef(null)
  const processRef = useRef(null)
  const pathFillRef = useRef(null)
  const chapterPanelRef = useRef(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const { prefersReducedMotion } = useReducedMotion()
  const inView = useInView(rootRef, { rootMargin: '18% 0px' })
  const chapters = homeJourney.chapters
  const active = chapters[activeChapter] || chapters[0]

  useScrubTitle(titleRef)
  useScrubTitle(processTitleRef)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    if (prefersReducedMotion) {
      gsap.set(root.querySelectorAll('[data-fade-up], [data-journey-node], [data-process-card]'), {
        autoAlpha: 1,
        y: 0,
        x: 0,
      })
      if (progressRef.current) gsap.set(progressRef.current, { scaleY: 1 })
      if (pathFillRef.current) gsap.set(pathFillRef.current, { scaleX: 1, scaleY: 1 })
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll('[data-fade-up]'),
        { autoAlpha: 0, y: 42 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 78%', once: true },
        },
      )

      const nodes = gsap.utils.toArray(root.querySelectorAll('[data-journey-node]'))
      const line = progressRef.current

      if (line && nodes.length) {
        gsap.set(line, { scaleY: 0, transformOrigin: 'top center' })
        gsap.to(line, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 65%',
            end: 'bottom 45%',
            scrub: 0.65,
          },
        })
      }

      nodes.forEach((node, index) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 58%',
          end: 'bottom 42%',
          onEnter: () => setActiveChapter((prev) => (prev === index ? prev : index)),
          onEnterBack: () => setActiveChapter((prev) => (prev === index ? prev : index)),
        })

        gsap.fromTo(
          node,
          { autoAlpha: 0, x: index % 2 === 0 ? -36 : 36 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 82%',
              once: true,
            },
          },
        )
      })

      const processRoot = processRef.current
      const pathFill = pathFillRef.current
      const cards = gsap.utils.toArray(root.querySelectorAll('[data-process-card]'))

      if (pathFill && processRoot) {
        const isVertical = () => window.matchMedia('(max-width: 1099px)').matches
        gsap.set(pathFill, {
          scaleX: isVertical() ? 1 : 0,
          scaleY: isVertical() ? 0 : 1,
          transformOrigin: isVertical() ? 'top center' : 'left center',
        })

        gsap.to(pathFill, {
          scaleX: 1,
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: processRoot.querySelector(`.${styles.processRail}`),
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.8,
            onUpdate: (self) => {
              const next = Math.min(
                homeProcessSteps.length - 1,
                Math.floor(self.progress * homeProcessSteps.length),
              )
              setActiveStep((prev) => (prev === next ? prev : next))
            },
          },
        })
      }

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            y: 52,
            rotateX: 6,
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            delay: index * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  useLayoutEffect(() => {
    const panel = chapterPanelRef.current
    if (!panel || prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.querySelectorAll('[data-chapter-anim]'),
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' },
      )
    }, panel)

    return () => ctx.revert()
  }, [activeChapter, prefersReducedMotion])

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      data-atmosphere-active={inView ? 'true' : 'false'}
      id="journey"
      aria-labelledby="home-journey-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <Container width="wide">
        <div className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{homeJourney.eyebrow}</p>
          <h2 id="home-journey-title" ref={titleRef} className={styles.title}>
            {splitScrubChars(homeJourney.title).map(({ key, char }) => (
              <span key={key} data-scrub-char>
                {char}
              </span>
            ))}
          </h2>
          <p className={styles.support}>{homeJourney.support}</p>
        </div>

        <div className={styles.story}>
          <aside className={styles.sticky} aria-live="polite">
            <div ref={chapterPanelRef} className={styles.chapterCard} key={active.id}>
              <span className={styles.chapterIndex} data-chapter-anim>
                {active.index}
              </span>
              <p className={styles.chapterLabel} data-chapter-anim>
                {active.label}
              </p>
              <h3 className={styles.chapterTitle} data-chapter-anim>
                {active.title}
              </h3>
              <p className={styles.chapterBody} data-chapter-anim>
                {active.body}
              </p>
              <div className={styles.chapterMeta} data-chapter-anim>
                <span>{active.metric}</span>
                <span>{active.detail}</span>
              </div>
              <div className={styles.chapterDots} aria-hidden="true">
                {chapters.map((chapter, index) => (
                  <span
                    key={chapter.id}
                    className={[styles.chapterDot, index === activeChapter ? styles.chapterDotActive : '']
                      .filter(Boolean)
                      .join(' ')}
                  />
                ))}
              </div>
            </div>
          </aside>

          <div ref={timelineRef} className={styles.timeline}>
            <div className={styles.lineTrack} aria-hidden="true">
              <span className={styles.lineBase} />
              <span ref={progressRef} className={styles.lineProgress} />
            </div>

            <ol className={styles.nodes} role="list">
              {chapters.map((chapter, index) => (
                <li
                  key={chapter.id}
                  className={[styles.node, index === activeChapter ? styles.nodeActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  data-journey-node
                  data-side={index % 2 === 0 ? 'left' : 'right'}
                >
                  <button
                    type="button"
                    className={styles.nodeBtn}
                    onClick={() => setActiveChapter(index)}
                    aria-current={index === activeChapter ? 'step' : undefined}
                  >
                    <span className={styles.nodeMarker}>
                      <span className={styles.nodePulse} aria-hidden="true" />
                      {chapter.index}
                    </span>
                    <span className={styles.nodeCopy}>
                      <span className={styles.nodeLabel}>{chapter.label}</span>
                      <span className={styles.nodeTitle}>{chapter.title}</span>
                      <span className={styles.nodeBody}>{chapter.body}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>

      <div
        ref={processRef}
        className={styles.process}
        data-header-theme="light"
      >
        <Container width="wide">
          <div className={styles.processHeader} data-fade-up>
            <div className={styles.processHeaderTop}>
              <p className={styles.eyebrow}>{homeJourney.processEyebrow}</p>
              <p className={styles.processCounter} aria-live="polite">
                <span>{String(activeStep + 1).padStart(2, '0')}</span>
                <span aria-hidden="true"> / </span>
                <span>{String(homeProcessSteps.length).padStart(2, '0')}</span>
              </p>
            </div>
            <h3 ref={processTitleRef} className={styles.processTitle}>
              {splitScrubChars(homeJourney.processTitle).map(({ key, char }) => (
                <span key={key} data-scrub-char>
                  {char}
                </span>
              ))}
            </h3>
            <p className={styles.support}>{homeJourney.processSupport}</p>
          </div>

          <div className={styles.processStage}>
            <div className={styles.pathRail} aria-hidden="true">
              <span className={styles.pathTrack} />
              <span ref={pathFillRef} className={styles.pathFill} />
            </div>

            <ol className={styles.processRail} role="list">
              {homeProcessSteps.map((step, index) => {
                const Icon = getProcessIcon(step.id)
                const isActive = index <= activeStep
                const isCurrent = index === activeStep
                return (
                  <li
                    key={step.id}
                    className={[
                      styles.processCard,
                      isActive ? styles.processCardLit : '',
                      isCurrent ? styles.processCardCurrent : '',
                      index % 2 === 1 ? styles.processCardOffset : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    data-process-card
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    <div className={styles.processOrb} aria-hidden="true">
                      <span className={styles.processOrbCore} />
                    </div>

                    <article className={styles.glass}>
                      <div className={styles.glassShine} aria-hidden="true" />
                      <div className={styles.processCardTop}>
                        <span className={styles.processStep}>
                          Step {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={styles.processIcon}>
                          <Icon size={20} strokeWidth={2} aria-hidden="true" />
                        </span>
                      </div>
                      <h4>{step.title}</h4>
                      <p>{step.summary}</p>
                      <ul className={styles.outputs} role="list">
                        {step.outputs.slice(0, 2).map((output) => (
                          <li key={output}>
                            <span className={styles.outputDot} aria-hidden="true" />
                            {output}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className={styles.processCta} data-fade-up>
            <Button as={Link} to="/process" size="lg">
              See full delivery process
            </Button>
          </div>
        </Container>
      </div>
    </section>
  )
}
