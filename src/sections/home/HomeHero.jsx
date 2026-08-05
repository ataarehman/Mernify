import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { HeroRipple } from '@/components/motion/HeroRipple'
import { whenPageEntranceReady } from '@/components/motion/pageEntrance'
import { homeHero } from '@/content/home'
import { BIG_TEXT_BLEND_COLOR, BIG_TEXT_BREAKPOINTS } from '@/motion/presets/bigText'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { refreshScrollTriggers } from '@/lib/scrollManager'
import styles from './HomeHero.module.css'

gsap.registerPlugin(ScrollTrigger)

export function HomeHero() {
  const wrapRef = useRef(null)
  const brandRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  // Entrance: wait for page curtain so motion is visible on first paint.
  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el || prefersReducedMotion) return undefined

    const title = el.querySelector('[data-hero-title]')
    const chars = title?.querySelectorAll('[data-char]')
    const brand = brandRef.current
    let ctx

    const cleanupReady = whenPageEntranceReady(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        if (chars?.length && window.innerWidth > 576) {
          gsap.set(title, { perspective: 300 })
          tl.from(chars, {
            duration: 1,
            delay: 0.08,
            x: 100,
            autoAlpha: 0,
            stagger: 0.05,
          })
        } else if (title) {
          tl.from(title, { autoAlpha: 0, y: 28, duration: 0.8, delay: 0.05 })
        }

        if (brand) {
          gsap.set(brand, { x: 0, y: 0, scale: 1, color: '#ffffff' })
          tl.from(brand, { autoAlpha: 0, duration: 0.85 }, '-=0.55')
        }

        tl.add(() => {
          refreshScrollTriggers(ScrollTrigger, { afterMs: 80 })
        })
      }, el)
    }, { playEntrance: true })

    return () => {
      cleanupReady()
      ctx?.revert()
    }
  }, [prefersReducedMotion])

  // Scroll scrub: giant Mernify scales / drifts into about (template §05)
  useLayoutEffect(() => {
    const section = wrapRef.current
    const brand = brandRef.current
    if (!section || !brand || prefersReducedMotion) return undefined

    let mm

    const cleanupReady = whenPageEntranceReady(() => {
      mm = gsap.matchMedia()

      const conditions = Object.fromEntries(
        BIG_TEXT_BREAKPOINTS.map((bp, index) => [`bp${index}`, bp.query]),
      )

      mm.add(conditions, (context) => {
        let active = BIG_TEXT_BREAKPOINTS[0]
        BIG_TEXT_BREAKPOINTS.forEach((bp, index) => {
          if (context.conditions[`bp${index}`]) active = bp
        })

        const tween = gsap.to(brand, {
          scale: active.scale,
          y: active.y,
          x: active.x,
          color: BIG_TEXT_BLEND_COLOR,
          transformOrigin: 'bottom center',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            scrub: 0.65,
            start: 'top top',
            end: 'bottom top',
            invalidateOnRefresh: true,
          },
        })

        return () => tween.scrollTrigger?.kill()
      })

      refreshScrollTriggers(ScrollTrigger, { afterMs: 100 })
    }, { playEntrance: true })

    return () => {
      cleanupReady()
      mm?.revert()
    }
  }, [prefersReducedMotion])

  const titleWords = homeHero.title.split(' ')

  return (
    <section
      ref={wrapRef}
      className={styles.hero}
      data-header-theme="dark"
      aria-labelledby="hero-title"
    >
      <HeroRipple interactiveRef={wrapRef} />

      <Container width="wide" className={styles.inner}>
        <div className={styles.top}>
          <h1 id="hero-title" className={styles.title} data-hero-title>
            {titleWords.map((word, index) => (
              <span key={`${word}-${index}`} className={styles.word}>
                {word.split('').map((char, charIndex) => (
                  <span key={`${index}-${charIndex}`} data-char className={styles.char}>
                    {char}
                  </span>
                ))}
                {index < titleWords.length - 1 ? '\u00A0' : null}
              </span>
            ))}
          </h1>

          <div className={styles.thumb} data-hero-thumb>
            <ClipReveal
              src="/assets/images/thumbs/banner-thumb.jpg"
              alt="Product engineering work at Mernify"
              className={styles.thumbClip}
              immediate
              loading="eager"
              fetchPriority="high"
              width={582}
              height={390}
            />
          </div>
        </div>

        <div className={styles.bigText} aria-hidden="true">
          <span ref={brandRef} className={styles.brandWord} data-hero-brand>
            Mernify
          </span>
        </div>
      </Container>
    </section>
  )
}
