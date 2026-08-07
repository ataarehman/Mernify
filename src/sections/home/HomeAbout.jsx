import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button, Container } from '@/components/ui'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { homeAbout } from '@/content/home'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HomeAbout.module.css'

gsap.registerPlugin(ScrollTrigger)

export function HomeAbout() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useScrubTitle(titleRef)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion) return undefined

    const targets = root.querySelectorAll('[data-fade-up]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const scrubChars = splitScrubChars(homeAbout.lead)

  return (
    <>
      <section
        ref={rootRef}
        className={styles.about}
        data-header-theme="light"
        aria-labelledby="home-about-title"
      >
        <Container width="wide">
          <div className={styles.grid}>
            <div className={styles.thumbOne} data-fade-up>
              <ClipReveal
                src="/assets/images/thumbs/about-thumb-one.webp"
                srcSet="/assets/images/thumbs/about-thumb-one-md.webp 700w, /assets/images/thumbs/about-thumb-one.webp 1400w"
                sizes="(max-width: 900px) 92vw, 42vw"
                alt=""
                className={styles.thumbClip}
                width={1400}
                height={1040}
              />
            </div>

            <div className={styles.main}>
              <h2 id="home-about-title" ref={titleRef} className={styles.title}>
                {scrubChars.map(({ key, char }) => (
                  <span key={key} data-scrub-char className={styles.scrubChar}>
                    {char}
                  </span>
                ))}
              </h2>

              <div className={styles.lower}>
                <div className={styles.thumbTwo} data-fade-up>
                  <ClipReveal
                    src="/assets/images/thumbs/about-thumb-two.webp"
                    srcSet="/assets/images/thumbs/about-thumb-two-md.webp 700w, /assets/images/thumbs/about-thumb-two.webp 1400w"
                    sizes="(max-width: 900px) 92vw, 28vw"
                    alt=""
                    className={styles.thumbClip}
                    width={1400}
                    height={1040}
                  />
                </div>
                <div className={styles.copy} data-fade-up>
                  <p className={styles.paragraph}>{homeAbout.body}</p>
                  <Button as={Link} to={homeAbout.cta.to} size="lg" block>
                    {homeAbout.cta.label}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <div className={styles.spacer} aria-hidden="true" />
    </>
  )
}
