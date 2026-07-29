import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui'
import { homePartners } from '@/content/partners'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './HomeTrust.module.css'

gsap.registerPlugin(ScrollTrigger)

function PartnerCard({ client }) {
  return (
    <li className={styles.item}>
      <Link to={client.to} className={styles.card} aria-label={`${client.name} case study`}>
        <span className={styles.idle}>
          <img src={client.logo} alt="" className={styles.logo} />
        </span>
        <span className={styles.hover} aria-hidden="true">
          <span className={styles.preview}>
            <img src={client.image} alt="" />
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

function MarqueeRow({ clients, direction = 'left', duration = 42 }) {
  const loop = [...clients, ...clients]
  return (
    <div className={styles.trackWrap}>
      <ul
        className={[styles.track, direction === 'right' ? styles.trackReverse : ''].filter(Boolean).join(' ')}
        style={{ '--marquee-duration': `${duration}s` }}
        role="list"
      >
        {loop.map((client, index) => (
          <PartnerCard key={`${client.id}-${direction}-${index}`} client={client} />
        ))}
      </ul>
    </div>
  )
}

export function HomeTrust() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const { clients } = homePartners
  const rowA = clients.filter((_, index) => index % 2 === 0)
  const rowB = clients.filter((_, index) => index % 2 === 1)

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
          <Link to={homePartners.cta.to} className={styles.cta} data-fade-up>
            {homePartners.cta.label}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.marquee} data-fade-up>
          <MarqueeRow clients={rowA.length ? rowA : clients} direction="left" duration={48} />
          <MarqueeRow clients={rowB.length ? rowB : clients} direction="right" duration={54} />
          <div className={styles.fadeLeft} aria-hidden="true" />
          <div className={styles.fadeRight} aria-hidden="true" />
        </div>
      </Container>
    </section>
  )
}
