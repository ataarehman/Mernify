import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { SERVICE_ICONS } from '@/lib/serviceIcons'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './ServiceWhy.module.css'

gsap.registerPlugin(ScrollTrigger)

function ScrubTitle({ id, className, children }) {
  const ref = useRef(null)
  useScrubTitle(ref)
  const words = String(children).match(/\S+/g) || []
  return (
    <h2 id={id} ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${i}-${word}`} className={styles.word}>
          {splitScrubChars(word).map(({ key, char }) => (
            <span key={key} data-scrub-char className={styles.char}>
              {char}
            </span>
          ))}
          {'\u00A0'}
        </span>
      ))}
    </h2>
  )
}

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

export function ServiceWhy({ content }) {
  const rootRef = useRef(null)
  const mediaRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    y: 28,
    deps: [content?.title],
  })

  useLayoutEffect(() => {
    const media = mediaRef.current
    if (!media || prefersReducedMotion || !content?.media) return undefined

    const light = isLightMotion()
    const frame = media.querySelector('[data-why-frame]')
    const floatA = media.querySelector('[data-why-float="a"]')
    const floatB = media.querySelector('[data-why-float="b"]')
    const glow = media.querySelector('[data-why-glow]')

    const ctx = gsap.context(() => {
      if (frame) {
        gsap.fromTo(
          frame,
          { autoAlpha: 0, y: light ? 28 : 48, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: light ? 0.7 : 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: media,
              start: 'top 78%',
              once: true,
            },
          },
        )
      }

      if (!light && frame) {
        gsap.to(frame, {
          y: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: media,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.85,
          },
        })
      }

      ;[floatA, floatB].filter(Boolean).forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 20, scale: 0.92 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: 0.25 + i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: media,
              start: 'top 72%',
              once: true,
            },
          },
        )

        if (!light) {
          gsap.to(el, {
            y: i === 0 ? -8 : 10,
            duration: 3.2 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.6 + i * 0.2,
          })
        }
      })

      if (glow && !light) {
        gsap.to(glow, {
          opacity: 0.85,
          scale: 1.08,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }, media)

    return () => ctx.revert()
  }, [prefersReducedMotion, content?.media?.src])

  if (!content?.items?.length) return null

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="service-why-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.grid} />
        <span className={styles.rule} />
      </div>

      <Container width="wide" className={styles.shell}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <header className={styles.header} data-fade-up>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <ScrubTitle id="service-why-title" className={styles.title}>
                {content.title}
              </ScrubTitle>
              {content.support ? <p className={styles.support}>{content.support}</p> : null}
            </header>

            <ol className={styles.points} role="list">
              {content.items.map((item, index) => {
                const Icon = SERVICE_ICONS[item.icon] || SERVICE_ICONS.target
                return (
                  <li
                    key={item.title}
                    className={styles.point}
                    data-fade-up
                    data-delay={String(70 + index * 65)}
                  >
                    <span className={styles.pointIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.pointIcon} aria-hidden="true">
                      <Icon size={18} strokeWidth={2.1} />
                    </span>
                    <div className={styles.pointBody}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </li>
                )
              })}
            </ol>

            <div className={styles.actions} data-fade-up data-delay="280">
              <div className={styles.badges}>
                <span>Craft</span>
                <span>Ownership</span>
                <span>Delivery</span>
              </div>
              <Link to="/contact" className={styles.cta}>
                Talk to us <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>

          {content.media ? (
            <div ref={mediaRef} className={styles.media}>
              <div className={styles.mediaStage}>
                <span className={styles.mediaGlow} data-why-glow aria-hidden="true" />
                <span className={styles.mediaAccent} aria-hidden="true" />

                <div className={styles.mediaFrame} data-why-frame>
                  <ClipReveal
                    src={content.media.src}
                    alt={content.media.alt || ''}
                    className={styles.clip}
                  />
                  <span className={styles.mediaSheen} aria-hidden="true" />
                </div>

                <div className={styles.floatChip} data-why-float="a">
                  <span className={styles.floatDot} aria-hidden="true" />
                  Product engineering
                </div>

                <div className={styles.floatPanel} data-why-float="b">
                  <p className={styles.floatLabel}>From idea → production</p>
                  <p className={styles.floatMeta}>One accountable delivery loop</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
