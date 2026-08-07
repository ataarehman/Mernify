import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button, Container } from '@/components/ui'
import { homePartners } from '@/content/partners'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { useInView } from '@/hooks/useInView'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './HomeTrust.module.css'

gsap.registerPlugin(ScrollTrigger)

function PartnerCard({ client }) {
  return (
    <li className={styles.item}>
      <Link to={client.to} className={styles.card} aria-label={`${client.name} case study`}>
        <span className={styles.idle}>
          <img src={client.logo} alt="" className={styles.logo} loading="lazy" decoding="async" />
        </span>
        <span className={styles.hover} aria-hidden="true">
          <span className={styles.preview}>
            <img
              src={client.image}
              alt=""
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </span>
          <span className={styles.hoverMeta}>
            <span className={styles.hoverName}>{client.name}</span>
            <span className={styles.hoverCategory}>{client.category}</span>
          </span>
          <span className={styles.hoverArrow}>
            <ArrowUpRight size={16} strokeWidth={2.25} />
          </span>
        </span>
      </Link>
    </li>
  )
}

/**
 * Seamless infinite marquee:
 * Duplicate the sequence into two identical groups and animate by the
 * measured width of ONE group (including item gaps). Pauses when offscreen.
 */
function MarqueeRow({ clients, direction = 'left', duration = 42 }) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const groupRef = useRef(null)
  const tweenRef = useRef(null)
  const inViewRef = useRef(true)
  const { prefersReducedMotion } = useReducedMotion()
  const inView = useInView(wrapRef, { rootMargin: '15% 0px' })
  inViewRef.current = inView

  useLayoutEffect(() => {
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group || prefersReducedMotion) return undefined

    const apply = () => {
      const distance = group.offsetWidth
      if (!distance) return

      tweenRef.current?.kill()
      const shift = distance
      const from = direction === 'right' ? -shift : 0
      const to = direction === 'right' ? 0 : -shift

      gsap.set(track, { x: from, force3D: true })
      tweenRef.current = gsap.to(track, {
        x: to,
        duration,
        ease: 'none',
        repeat: -1,
        force3D: true,
      })

      if (!inViewRef.current) tweenRef.current.pause()
    }

    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(group)
    window.addEventListener('resize', apply)

    return () => {
      tweenRef.current?.kill()
      tweenRef.current = null
      ro.disconnect()
      window.removeEventListener('resize', apply)
    }
  }, [clients, direction, duration, prefersReducedMotion])

  useEffect(() => {
    const tween = tweenRef.current
    if (!tween) return
    if (inView) tween.resume()
    else tween.pause()
  }, [inView])

  const sequence = clients.length < 8 ? [...clients, ...clients] : clients

  return (
    <div ref={wrapRef} className={styles.trackWrap}>
      <ul ref={trackRef} className={styles.track} role="list">
        <li className={styles.group} ref={groupRef}>
          <ul className={styles.groupList}>
            {sequence.map((client, index) => (
              <PartnerCard key={`${client.id}-${direction}-a-${index}`} client={client} />
            ))}
          </ul>
        </li>
        <li className={styles.group} aria-hidden="true">
          <ul className={styles.groupList}>
            {sequence.map((client, index) => (
              <PartnerCard key={`${client.id}-${direction}-b-${index}`} client={client} />
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export function HomeTrust() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const { clients } = homePartners
  const streamA = clients
  const streamB = [...clients].reverse()

  useScrubTitle(titleRef)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll('[data-fade-up]'),
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 82%', once: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={rootRef}
      className={styles.brand}
      data-header-theme="light"
      id="partners"
      aria-labelledby="home-partners-title"
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <Container width="wide">
        <div className={styles.header} data-fade-up>
          <div className={styles.headerCopy}>
            <p className={styles.eyebrow}>{homePartners.eyebrow}</p>
            <h2 id="home-partners-title" ref={titleRef} className={styles.title}>
              {splitScrubChars(homePartners.title).map(({ key, char }) => (
                <span key={key} data-scrub-char>
                  {char}
                </span>
              ))}
            </h2>
            <p className={styles.support}>{homePartners.support}</p>
          </div>
          <Button as={Link} to={homePartners.cta.to} size="md" data-fade-up>
            {homePartners.cta.label}
          </Button>
        </div>

        <div className={styles.marquee} data-fade-up>
          <MarqueeRow clients={streamA} direction="left" duration={48} />
          <MarqueeRow clients={streamB} direction="right" duration={54} />
          <div className={styles.fadeLeft} aria-hidden="true" />
          <div className={styles.fadeRight} aria-hidden="true" />
        </div>
      </Container>
    </section>
  )
}
