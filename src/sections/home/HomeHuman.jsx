import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button, Container } from '@/components/ui'
import { homeHuman } from '@/content/home'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import { useFadeUp } from '@/hooks/useFadeUp'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HomeHuman.module.css'

gsap.registerPlugin(ScrollTrigger)

export function HomeHuman() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useScrubTitle(titleRef)
  useFadeUp(sectionRef, {
    selector: '[data-fade-up]',
    start: 'top 78%',
    stagger: 0.1,
  })

  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined
    ScrollTrigger.refresh()
    return undefined
  }, [prefersReducedMotion])

  const titleText = `${homeHuman.titleBefore}${homeHuman.titleAccent}`
  const beforeLen = homeHuman.titleBefore.length

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="human-title"
    >
      <Container width="wide">
        <div className={styles.top}>
          <div className={styles.badge} data-fade-up>
            <div className={styles.avatars}>
              {homeHuman.avatars.map((src) => (
                <span key={src} className={styles.avatar}>
                  <img src={src} alt="" width={52} height={52} loading="lazy" decoding="async" />
                </span>
              ))}
              <img
                className={styles.avatarShape}
                src="/assets/images/shapes/team-gerden-shape.png"
                alt=""
                aria-hidden="true"
                width={224}
                height={77}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={styles.badgeMeta}>
              <div className={styles.stars} aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p>{homeHuman.badge}</p>
            </div>
          </div>

          <h2 id="human-title" ref={titleRef} className={styles.title}>
            {splitScrubChars(titleText).map(({ key, char }, index) => (
              <span
                key={key}
                data-scrub-char
                className={[
                  styles.scrubChar,
                  index >= beforeLen ? styles.accent : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {char}
              </span>
            ))}
          </h2>
        </div>

        <div className={styles.grid}>
          {homeHuman.principles.map((item) => (
            <article key={item.title} className={styles.card} data-fade-up>
              <div className={styles.thumb}>
                <Link to={item.to} className={styles.thumbLink} aria-label={item.title}>
                  <img src={item.image} alt="" width={559} height={650} loading="lazy" decoding="async" />
                </Link>

                <span className={styles.subtitle}>{item.subtitle}</span>
                <h3 className={styles.cardTitle}>
                  <Link to={item.to}>{item.title}</Link>
                </h3>

                {item.social?.length ? (
                  <div className={styles.social}>
                    <ul>
                      {item.social.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                          >
                            {social.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.ctaWrap} data-fade-up>
          <Button as={Link} to={homeHuman.cta.to} size="lg" block>
            {homeHuman.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  )
}
