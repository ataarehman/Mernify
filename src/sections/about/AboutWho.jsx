import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Bot,
  Boxes,
  Layers3,
  UsersRound,
} from 'lucide-react'
import { Container } from '@/components/ui'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { aboutContent } from '@/content/pages'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './AboutWho.module.css'

const CAP_ICONS = [Boxes, Layers3, Bot, UsersRound]

export function AboutWho() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const { who } = aboutContent

  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 84%', y: 28 })
  useScrubTitle(titleRef, { start: 'top 90%', end: 'top 55%', scrub: 0.5 })

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="about-who-title"
    >
      <div className={styles.atmosphere} aria-hidden="true" />

      <Container width="wide" className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerCopy} data-fade-up>
            <p className={styles.eyebrow}>{who.eyebrow}</p>
            <h2 id="about-who-title" ref={titleRef} className={styles.title}>
              {splitScrubChars(who.title).map(({ key, char }) => (
                <span key={key} data-scrub-char className={styles.char}>
                  {char}
                </span>
              ))}
            </h2>
          </div>
          <p className={styles.lead} data-fade-up data-delay="80">
            {who.lead}
          </p>
        </header>

        <ul className={styles.highlights} role="list" data-fade-up>
          {who.highlights.map((item) => (
            <li key={item.label} className={styles.highlight}>
              <span className={styles.highlightLabel}>{item.label}</span>
              <span className={styles.highlightText}>{item.text}</span>
            </li>
          ))}
        </ul>

        <div className={styles.stage}>
          <div className={styles.media} data-fade-up>
            <div className={styles.mediaFrame}>
              <ClipReveal
                src={who.image}
                alt={who.imageAlt || ''}
                className={styles.clip}
              />
              <div className={styles.mediaShade} aria-hidden="true" />
            </div>
            <div className={styles.mark} aria-hidden="true">
              <img src="/assets/images/logo/favicon.svg" alt="" />
            </div>
            <div className={styles.mediaCaption} aria-hidden="true">
              <span>Partnership</span>
              <span>Engineering</span>
              <span>Ownership</span>
            </div>
          </div>

          <div className={styles.aside}>
            <div className={styles.asideIntro} data-fade-up>
              {who.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className={styles.caps} role="list">
              {who.capabilities.map((item, index) => {
                const Icon = CAP_ICONS[index % CAP_ICONS.length]
                return (
                  <li
                    key={item.title}
                    className={styles.cap}
                    data-fade-up
                    data-delay={String(index * 70)}
                  >
                    <span className={styles.capIcon} aria-hidden="true">
                      <Icon size={18} strokeWidth={2.1} />
                    </span>
                    <div className={styles.capCopy}>
                      <div className={styles.capTop}>
                        <span className={styles.index}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3>{item.title}</h3>
                      </div>
                      <p>{item.text}</p>
                    </div>
                    <Link
                      to="/services"
                      className={styles.capLink}
                      aria-label={`Explore ${item.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
