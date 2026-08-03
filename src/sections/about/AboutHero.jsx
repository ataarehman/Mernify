import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { BookCallCta } from '@/components/cta/BookCallCta'
import { aboutContent } from '@/content/pages'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './AboutHero.module.css'

export function AboutHero() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const { hero } = aboutContent
  const titleWords = hero.title.match(/\S+/g) || []

  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 92%', y: 24 })
  useScrubTitle(titleRef, { start: 'top 85%', end: 'top 40%', scrub: 0.45 })

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      data-header-theme="light"
      aria-labelledby="about-hero-title"
    >
      <Container width="wide" className={styles.inner}>
        <h1 id="about-hero-title" ref={titleRef} className={styles.title}>
          {titleWords.map((word, wordIndex) => (
            <span key={`${word}-${wordIndex}`} className={styles.word}>
              {splitScrubChars(word).map(({ key, char }) => (
                <span key={`${wordIndex}-${key}`} data-scrub-char className={styles.char}>
                  {char}
                </span>
              ))}
              {'\u00A0'}
            </span>
          ))}
        </h1>

        <p className={styles.support} data-fade-up>
          {hero.supportBefore}
          <span className={styles.accent}>{hero.supportAccent}</span>
          {hero.supportAfter}
        </p>

        <div className={styles.actions} data-fade-up data-delay="100">
          <Link to={hero.primaryCta.to} className={styles.primary}>
            {hero.primaryCta.label}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link to={hero.secondaryCta.to} className={styles.secondary}>
            {hero.secondaryCta.label}
          </Link>
          <BookCallCta variant="secondary" size="md" />
        </div>
      </Container>
    </section>
  )
}
