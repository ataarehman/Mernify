import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { industries, industriesPage } from '@/content/industries'
import { getIndustryVisual } from '@/lib/industryVisuals'
import styles from './IndustriesStack.module.css'

gsap.registerPlugin(ScrollTrigger)

/** Panel shrinks to this scale while the next one slides over it. */
const PINNED_SCALE = 0.9

/** Pin offset from the top of the viewport, clear of the sticky header. */
const PIN_START = 'top 13%'

/**
 * Sector panels that pin and stack as you scroll, so each industry hands over
 * to the next instead of scrolling past. Pinning is desktop + motion-safe only;
 * everywhere else the same markup reads as a plain vertical sequence.
 */
export function IndustriesStack({ onSelect }) {
  const { eyebrow, title, support } = industriesPage.grid
  const rootRef = useRef(null)
  const stackRef = useRef(null)

  useLayoutEffect(() => {
    const stack = stackRef.current
    if (!stack) return undefined

    const images = [...stack.querySelectorAll('img')]
    const refresh = () => ScrollTrigger.refresh()
    images.forEach((image) => {
      if (image.complete) return
      image.addEventListener('load', refresh, { once: true })
      image.addEventListener('error', refresh, { once: true })
    })

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Pinning uses position: fixed, which stutters badly under touch momentum
      // scrolling — so it is limited to precise-pointer desktops.
      mm.add(
        '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const panels = gsap.utils.toArray(`.${styles.panel}`, stack)

          panels.forEach((panel, index) => {
            // Each panel sticks once it reaches the pin line and stays for the
            // rest of the deck, so the next one travels over it instead of
            // pushing it up.
            ScrollTrigger.create({
              trigger: panel,
              start: PIN_START,
              endTrigger: stack,
              end: 'bottom bottom',
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            })

            const next = panels[index + 1]
            if (!next) return

            // Recede while the following panel rises over it: the whole depth
            // cue resolves across one transition rather than the length of the
            // deck.
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: next,
                  start: 'top bottom',
                  end: PIN_START,
                  scrub: 0.9,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                panel,
                { scale: 1, y: 0 },
                { scale: PINNED_SCALE, y: -26, ease: 'none', immediateRender: false },
                0,
              )
              .fromTo(
                panel.querySelector(`.${styles.dim}`),
                { opacity: 0 },
                { opacity: 0.6, ease: 'none', immediateRender: false },
                0,
              )
              .fromTo(
                panel.querySelector(`.${styles.content}`),
                { opacity: 1, y: 0 },
                { opacity: 0, y: -26, ease: 'none', immediateRender: false },
                0.25,
              )
              .fromTo(
                panel.querySelector(`.${styles.image}`),
                { scale: 1 },
                { scale: 1.1, ease: 'none', immediateRender: false },
                0,
              )
          })
        },
      )

      // Copy entrance runs on the children so it never fights the scrubbed exit.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray(`.${styles.content}`, stack).forEach((copy) => {
          gsap.from(copy.children, {
            y: 34,
            opacity: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: copy.closest(`.${styles.panel}`),
              start: 'top 78%',
              once: true,
            },
          })
        })
      })
    }, stack)

    const lateRefresh = window.setTimeout(refresh, 400)

    return () => {
      window.clearTimeout(lateRefresh)
      images.forEach((image) => {
        image.removeEventListener('load', refresh)
        image.removeEventListener('error', refresh)
      })
      ctx.revert()
    }
  }, [])

  const total = industries.length

  return (
    <section
      ref={rootRef}
      id="sectors"
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="industries-stack-title"
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
            <h2 id="industries-stack-title" className={styles.title}>
              {title}
            </h2>
          </div>
          <p className={styles.support}>{support}</p>
        </header>

        <div ref={stackRef} className={styles.stack}>
          {industries.map((item, index) => {
            const { Icon, accent, label } = getIndustryVisual(item.slug)
            const position = String(index + 1).padStart(2, '0')

            return (
              <article
                key={item.slug}
                id={item.slug}
                className={styles.panel}
                data-layout={item.layout}
                style={{ '--industry-accent': accent, zIndex: index + 1 }}
              >
                <div className={styles.frame} data-cursor="View">
                  <div className={styles.media}>
                    <img
                      className={styles.image}
                      src={item.image.src}
                      srcSet={item.image.srcSet}
                      sizes="(min-width: 1440px) 1400px, (min-width: 1024px) 92vw, 100vw"
                      alt={item.image.alt}
                      width="1280"
                      height="720"
                      loading={index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                    />
                    <span className={styles.scrim} aria-hidden="true" />
                    <span className={styles.dim} aria-hidden="true" />

                    <span className={styles.tags} aria-hidden="true">
                      <span className={styles.tag}>
                        <Icon size={15} strokeWidth={2} />
                        {label}
                      </span>
                      <span className={styles.tag}>{item.focus[0]}</span>
                    </span>

                    <span className={styles.index} aria-hidden="true">
                      <span className={styles.indexNumber}>{position}</span>
                      <span className={styles.indexTotal}>/ {total}</span>
                    </span>
                  </div>

                  <div className={styles.content}>
                    <h3 className={styles.panelTitle}>{item.title}</h3>
                    <p className={styles.panelText}>{item.summary}</p>

                    <ul className={styles.chips} role="list">
                      {item.focus.map((focus) => (
                        <li key={focus} className={styles.chip}>
                          {focus}
                        </li>
                      ))}
                    </ul>

                    <p className={styles.outcome}>{item.outcome}</p>

                    <button
                      type="button"
                      className={styles.action}
                      aria-label={`${item.title} challenges and solutions`}
                      onClick={() => onSelect?.(item.slug)}
                    >
                      <span className={styles.actionLabel} aria-hidden="true">
                        <span className={styles.actionLabelFull}>
                          {item.title} challenges &amp; solutions
                        </span>
                        <span className={styles.actionLabelShort}>Challenges &amp; solutions</span>
                      </span>
                      <span className={styles.actionIcon} aria-hidden="true">
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
