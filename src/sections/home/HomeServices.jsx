import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { Container } from '@/components/ui'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { homeServicesCarousel } from '@/content/home'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HomeServices.module.css'

export function HomeServices() {
  const { slides, tags, blurb, viewAll } = homeServicesCarousel
  const [index, setIndex] = useState(0)
  const slideRef = useRef(null)
  const titleRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const active = slides[index]
  const total = slides.length

  useEffect(() => {
    if (prefersReducedMotion || total < 2) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [prefersReducedMotion, total])

  // Crossfade + char reveal when slide changes (one slide in DOM — no stacked height)
  useLayoutEffect(() => {
    const slide = slideRef.current
    const title = titleRef.current
    if (!slide) return undefined

    if (prefersReducedMotion) {
      gsap.set(slide, { autoAlpha: 1, y: 0 })
      return undefined
    }

    const chars = title?.querySelectorAll('[data-svc-char]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        slide,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' },
      )
      if (chars?.length) {
        gsap.fromTo(
          chars,
          { x: 72, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.75,
            stagger: 0.04,
            delay: 0.12,
            ease: 'power3.out',
          },
        )
      }
    }, slide)

    return () => ctx.revert()
  }, [index, prefersReducedMotion])

  return (
    <section
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="home-services-title"
    >
      <Container width="wide" className={styles.inner}>
        <div className={styles.slideWrap} aria-roledescription="carousel">
          <article
            key={active.slug}
            ref={slideRef}
            className={styles.slide}
            aria-label={`${index + 1} of ${total}`}
          >
            <div className={styles.grid}>
              <div className={styles.copy}>
                <span className={styles.index}>
                  ({String(index + 1).padStart(2, '0')}. SERVICE)
                </span>
                <h2 id="home-services-title" ref={titleRef} className={styles.title}>
                  {active.title.split('').map((char, charIndex) => (
                    <span
                      key={`${active.slug}-${charIndex}`}
                      data-svc-char
                      className={styles.char}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h2>
              </div>

              <Link
                to={`/services/${active.slug}`}
                className={styles.thumb}
                data-cursor="View"
              >
                <ClipReveal
                  key={active.image}
                  src={active.image}
                  alt=""
                  className={styles.thumbClip}
                  start="top 90%"
                />
              </Link>

              <div className={styles.meta}>
                <ul className={styles.tags} role="list">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <span className={styles.tag}>{tag}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.blurb}>{blurb}</p>
              </div>
            </div>

            <div className={styles.bottom}>
              <p className={styles.pagination} aria-hidden="true">
                [{String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}]
              </p>
              <div className={styles.bottomActions}>
                <div className={styles.dots} role="tablist" aria-label="Service slides">
                  {slides.map((slide, slideIndex) => (
                    <button
                      key={slide.slug}
                      type="button"
                      role="tab"
                      aria-selected={slideIndex === index}
                      aria-label={`Show ${slide.title}`}
                      className={[
                        styles.dot,
                        slideIndex === index ? styles.dotActive : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => setIndex(slideIndex)}
                    />
                  ))}
                </div>
                <Link to={viewAll.to} className={styles.viewAll}>
                  {viewAll.label}
                </Link>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}
