import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './PageCta.module.css'

export function PageCta({
  title = 'Ready to discuss your next product?',
  support = '',
  cta = null,
  accentWords = ['product'],
  animated = false,
}) {
  const rootRef = useRef(null)
  const titleRef = useRef(null)

  useRevealOnScroll(rootRef, {
    selector: animated ? '[data-fade-up]' : '[data-fade-up-disabled]',
    start: 'top 90%',
    deps: [animated, title],
  })
  useScrubTitle(titleRef)

  const parts = title.split(new RegExp(`(${accentWords.join('|')})`, 'gi'))

  return (
    <section
      ref={rootRef}
      className={styles.cta}
      data-header-theme="dark"
      aria-labelledby="page-cta-title"
    >
      <div className={styles.bg} aria-hidden="true" />
      <img
        className={styles.shapeOne}
        src="/assets/images/shapes/cta-two-shape1.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className={styles.shapeTwo}
        src="/assets/images/shapes/cta-two-shape2.png"
        alt=""
        aria-hidden="true"
      />
      <Container className={styles.inner}>
        <h2
          id="page-cta-title"
          ref={titleRef}
          className={styles.title}
          {...(animated ? { 'data-fade-up': '' } : {})}
        >
          {animated
            ? parts.flatMap((part, index) => {
                const isAccent = accentWords.some(
                  (word) => word.toLowerCase() === part.toLowerCase(),
                )
                return splitScrubChars(part).map(({ key, char }) => (
                  <span
                    key={`${index}-${key}`}
                    data-scrub-char
                    className={isAccent ? styles.accent : undefined}
                  >
                    {char}
                  </span>
                ))
              })
            : parts.map((part, index) =>
                accentWords.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
                  <span key={`${part}-${index}`} className={styles.accent}>
                    {part}
                  </span>
                ) : (
                  <span key={`${part}-${index}`}>{part}</span>
                ),
              )}
        </h2>
        {support ? (
          <p
            className={styles.support}
            {...(animated ? { 'data-fade-up': '', 'data-delay': '150' } : {})}
          >
            {support}
          </p>
        ) : null}
        {cta ? (
          <Link
            to={cta.to}
            className={styles.button}
            {...(animated ? { 'data-fade-up': '', 'data-delay': '250' } : {})}
          >
            {cta.label}
          </Link>
        ) : null}
      </Container>
    </section>
  )
}
