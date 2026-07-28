import { useRef } from 'react'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './TechBrandGrid.module.css'

const MARKS = [
  { idle: 'marquee-two-thumb1.png', hover: 'marquee-two-thumb11.png' },
  { idle: 'marquee-two-thumb2.png', hover: 'marquee-two-thumb22.png' },
  { idle: 'marquee-thumb55.png', hover: 'marquee-thumb5.png' },
  { idle: 'marquee-two-thumb4.png', hover: 'marquee-two-thumb44.png' },
  { idle: 'marquee-thumb33.png', hover: 'marquee-thumb3.png' },
  { idle: 'marquee-thumb11.png', hover: 'marquee-thumb1.png' },
  { idle: 'marquee-thumb66.png', hover: 'marquee-thumb6.png' },
  { idle: 'marquee-thumb22.png', hover: 'marquee-thumb2.png' },
]

export function TechBrandGrid({
  title = 'Built with modern product technology',
  className = '',
  animated = false,
}) {
  const rootRef = useRef(null)
  const titleRef = useRef(null)

  useRevealOnScroll(rootRef, {
    selector: animated ? '[data-fade-up]' : '[data-fade-up-disabled]',
    start: 'top 88%',
    deps: [animated, title],
  })
  useScrubTitle(titleRef)

  return (
    <section
      ref={rootRef}
      className={[styles.section, className].filter(Boolean).join(' ')}
      data-header-theme="light"
      aria-labelledby="tech-brand-title"
    >
      <div className={styles.inner}>
        <h2
          id="tech-brand-title"
          ref={titleRef}
          className={styles.title}
          {...(animated ? { 'data-fade-up': '', 'data-delay': '0' } : {})}
        >
          {animated
            ? splitScrubChars(title).map(({ key, char }) => (
                <span key={key} data-scrub-char>
                  {char}
                </span>
              ))
            : title}
        </h2>
        <ul className={styles.grid} role="list">
          {MARKS.map((mark, index) => (
            <li
              key={mark.idle}
              className={styles.item}
              {...(animated
                ? { 'data-fade-up': '', 'data-delay': String((index % 4) * 100 + 100) }
                : {})}
            >
              <span className={styles.idle}>
                <img src={`/assets/images/thumbs/${mark.idle}`} alt="" />
              </span>
              <span className={styles.hover}>
                <img src={`/assets/images/thumbs/${mark.hover}`} alt="" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
