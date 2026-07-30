import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './PageCta.module.css'

function ScrubWords({ text, accentWords = [], charClass, accentClass, wordClass }) {
  const accentSet = new Set(accentWords.map((word) => word.toLowerCase()))
  const words = String(text).match(/\S+/g) || []

  return words.map((word, wordIndex) => {
    const clean = word.replace(/[.,!?;:]+$/g, '')
    const trailing = word.slice(clean.length)
    const isAccent = accentSet.has(clean.toLowerCase())

    return (
      <span key={`${wordIndex}-${word}`} className={wordClass}>
        {splitScrubChars(clean).map(({ key, char }) => (
          <span
            key={`${wordIndex}-${key}`}
            data-scrub-char
            className={isAccent ? `${charClass} ${accentClass}`.trim() : charClass}
          >
            {char}
          </span>
        ))}
        {trailing
          ? splitScrubChars(trailing).map(({ key, char }) => (
              <span key={`${wordIndex}-t-${key}`} data-scrub-char className={charClass}>
                {char}
              </span>
            ))
          : null}
        {'\u00A0'}
      </span>
    )
  })
}

export function PageCta({
  title = 'Ready to discuss your next product?',
  support = '',
  cta = null,
  accentWords = ['product'],
  eyebrow = 'Next step',
  mediaSrc = '/assets/images/thumbs/cta-premium-media.jpg',
  mediaAlt = 'Product team collaborating on a digital product engagement',
  animated = false,
}) {
  const rootRef = useRef(null)
  const titleRef = useRef(null)

  useRevealOnScroll(rootRef, {
    selector: animated ? '[data-fade-up]' : '[data-fade-up-disabled]',
    start: 'top 88%',
    y: 28,
    deps: [animated, title],
  })
  useScrubTitle(titleRef)

  return (
    <section
      ref={rootRef}
      className={styles.cta}
      data-header-theme="dark"
      aria-labelledby="page-cta-title"
    >
      <div className={styles.bg} aria-hidden="true">
        <img
          src="/assets/images/thumbs/cta-premium-bg.jpg"
          alt=""
          className={styles.bgImage}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.bgOverlay} />
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
      </div>

      <Container width="wide" className={styles.shell}>
        <div className={styles.copy} data-fade-up>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h2 id="page-cta-title" ref={titleRef} className={styles.title}>
            {animated ? (
              <ScrubWords
                text={title}
                accentWords={accentWords}
                wordClass={styles.word}
                charClass={styles.char}
                accentClass={styles.accent}
              />
            ) : (
              title.split(new RegExp(`(${accentWords.join('|')})`, 'gi')).map((part, index) =>
                accentWords.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
                  <span key={`${part}-${index}`} className={styles.accent}>
                    {part}
                  </span>
                ) : (
                  <span key={`${part}-${index}`}>{part}</span>
                ),
              )
            )}
          </h2>
          {support ? (
            <p
              className={styles.support}
              {...(animated ? { 'data-fade-up': '', 'data-delay': '100' } : {})}
            >
              {support}
            </p>
          ) : null}
          {cta ? (
            <Link
              to={cta.to}
              className={styles.button}
              {...(animated ? { 'data-fade-up': '', 'data-delay': '180' } : {})}
            >
              {cta.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <figure
          className={styles.media}
          data-fade-up
          data-delay={animated ? '120' : undefined}
        >
          <div className={styles.mediaFrame}>
            <img
              src={mediaSrc}
              alt={mediaAlt}
              className={styles.mediaImage}
              width={900}
              height={1125}
              loading="lazy"
              decoding="async"
            />
            <span className={styles.mediaGlow} aria-hidden="true" />
          </div>
          <figcaption className={styles.mediaCaption}>
            Senior-led pods · Clear ownership · Reliable delivery
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}
