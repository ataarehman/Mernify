import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { homeServicesCarousel } from '@/content/home'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { useInView } from '@/hooks/useInView'
import styles from './HomeServicesOverview.module.css'

gsap.registerPlugin(ScrollTrigger)

const AUTOPLAY_MS = 6500

export function HomeServicesOverview() {
  const { slides, viewAll, eyebrow } = homeServicesCarousel
  const [index, setIndex] = useState(0)
  const rootRef = useRef(null)
  const slideRef = useRef(null)
  const titleRef = useRef(null)
  const progressRef = useRef(null)
  const progressTween = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const inView = useInView(rootRef, { rootMargin: '12% 0px' })
  const active = slides[index]
  const total = slides.length

  const goTo = useCallback(
    (next) => {
      setIndex(((next % total) + total) % total)
    },
    [total],
  )

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])
  const goNext = useCallback(() => goTo(index + 1), [goTo, index])

  // Autoplay when in view — pauses offscreen / reduced motion / tab hidden.
  useEffect(() => {
    if (prefersReducedMotion || total < 2 || !inView) {
      progressTween.current?.kill()
      if (progressRef.current) gsap.set(progressRef.current, { scaleX: inView ? 1 : 0 })
      return undefined
    }

    let timer = 0
    let cancelled = false

    const clear = () => {
      window.clearTimeout(timer)
      progressTween.current?.kill()
    }

    const arm = () => {
      if (cancelled || document.visibilityState === 'hidden') return

      const bar = progressRef.current
      progressTween.current?.kill()
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
        progressTween.current = gsap.to(bar, {
          scaleX: 1,
          duration: AUTOPLAY_MS / 1000,
          ease: 'none',
        })
      }

      timer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % total)
      }, AUTOPLAY_MS)
    }

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        clear()
      } else {
        arm()
      }
    }

    arm()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      clear()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [index, prefersReducedMotion, total, inView])

  useLayoutEffect(() => {
    const slide = slideRef.current
    const title = titleRef.current
    if (!slide) return undefined

    if (prefersReducedMotion) {
      gsap.set(slide, { autoAlpha: 1, y: 0 })
      return undefined
    }

    const chars = title?.querySelectorAll('[data-svc-char]')
    const meta = slide.querySelectorAll('[data-svc-meta]')
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(
        slide,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' },
      )
      if (chars?.length) {
        tl.fromTo(
          chars,
          { x: 40, autoAlpha: 0, rotateX: -28 },
          {
            x: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 0.65,
            stagger: 0.024,
            ease: 'power3.out',
          },
          0.06,
        )
      }
      if (meta.length) {
        tl.fromTo(
          meta,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' },
          0.16,
        )
      }
    }, slide)

    return () => ctx.revert()
  }, [index, prefersReducedMotion])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll('[data-svc-enter]'),
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 78%', once: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      id="services"
      aria-labelledby="home-services-overview-title"
    >
      <div className={styles.aura} aria-hidden="true" />
      <div className={styles.gridGlow} aria-hidden="true" />
      <Container width="wide" className={styles.inner}>
        <div className={styles.top} data-svc-enter>
          <div className={styles.topCopy}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <p className={styles.topHint}>Capabilities we ship with product teams</p>
          </div>
          <div className={styles.topActions}>
            <div className={styles.navBtns}>
              <button type="button" className={styles.navBtn} onClick={goPrev} aria-label="Previous service">
                <ChevronLeft size={20} strokeWidth={2.25} />
              </button>
              <button type="button" className={styles.navBtn} onClick={goNext} aria-label="Next service">
                <ChevronRight size={20} strokeWidth={2.25} />
              </button>
            </div>
            <Link to={viewAll.to} className={styles.viewAll}>
              {viewAll.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.shell} data-svc-enter>
          <aside className={styles.rail} aria-label="Service index">
            <ol className={styles.railList} role="list">
              {slides.map((slide, slideIndex) => {
                const activeSlide = slideIndex === index
                return (
                  <li key={slide.slug}>
                    <button
                      type="button"
                      className={[styles.railItem, activeSlide ? styles.railItemActive : ''].filter(Boolean).join(' ')}
                      aria-current={activeSlide ? 'true' : undefined}
                      onClick={() => goTo(slideIndex)}
                    >
                      <span className={styles.railIndex}>{String(slideIndex + 1).padStart(2, '0')}</span>
                      <span className={styles.railTitle}>{slide.title}</span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </aside>

          <div className={styles.stage} aria-roledescription="carousel">
            <article
              key={active.slug}
              ref={slideRef}
              className={styles.slide}
              aria-label={`${index + 1} of ${total}: ${active.title}`}
            >
              <div className={styles.grid}>
                <div className={styles.copy}>
                  <span className={styles.index} data-svc-meta>
                    ({String(index + 1).padStart(2, '0')}. SERVICE)
                  </span>
                  <h2 id="home-services-overview-title" ref={titleRef} className={styles.title}>
                    {active.title.split(' ').map((word, wordIndex, words) => (
                      <span key={`${active.slug}-w-${wordIndex}`} className={styles.word}>
                        {word.split('').map((char, charIndex) => (
                          <span
                            key={`${active.slug}-${wordIndex}-${charIndex}`}
                            data-svc-char
                            className={styles.char}
                          >
                            {char}
                          </span>
                        ))}
                        {wordIndex < words.length - 1 ? '\u00A0' : null}
                      </span>
                    ))}
                  </h2>
                  <Link to={`/services/${active.slug}`} className={styles.explore} data-svc-meta>
                    Explore service
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </div>

                <Link to={`/services/${active.slug}`} className={styles.thumb} data-cursor="View">
                  <span className={styles.thumbGlow} aria-hidden="true" />
                  <ClipReveal
                    key={active.image}
                    src={active.image}
                    srcSet={active.imageSrcSet}
                    sizes="(max-width: 900px) 92vw, min(28rem, 36vw)"
                    alt={`${active.title} — capability overview`}
                    className={styles.thumbClip}
                    start="top 90%"
                    width={1600}
                    height={1140}
                  />
                  <span className={styles.thumbFrame} aria-hidden="true" />
                </Link>

                <div className={styles.meta}>
                  <ul className={styles.tags} role="list" data-svc-meta>
                    {active.tags.map((tag) => (
                      <li key={tag}>
                        <span className={styles.tag}>{tag}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={styles.blurb} data-svc-meta>
                    {active.blurb}
                  </p>
                </div>
              </div>
            </article>

            <div className={styles.bottom}>
              <p className={styles.pagination} aria-hidden="true">
                <span className={styles.pageCurrent}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.pageSep}>/</span>
                <span>{String(total).padStart(2, '0')}</span>
              </p>
              <div className={styles.progressTrack} aria-hidden="true">
                <span ref={progressRef} className={styles.progressBar} />
              </div>
              <div className={styles.dots} role="tablist" aria-label="Service slides">
                {slides.map((slide, slideIndex) => (
                  <button
                    key={slide.slug}
                    type="button"
                    role="tab"
                    aria-selected={slideIndex === index}
                    aria-label={`Show ${slide.title}`}
                    className={[styles.dot, slideIndex === index ? styles.dotActive : ''].filter(Boolean).join(' ')}
                    onClick={() => goTo(slideIndex)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
