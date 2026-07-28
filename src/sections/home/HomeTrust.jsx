import { useRef } from 'react'
import { Container } from '@/components/ui'
import { useFadeUp } from '@/hooks/useFadeUp'
import styles from './HomeTrust.module.css'

const MARKS = [
  { idle: 'marquee-thumb11.png', hover: 'marquee-thumb1.png' },
  { idle: 'marquee-thumb22.png', hover: 'marquee-thumb2.png' },
  { idle: 'marquee-thumb33.png', hover: 'marquee-thumb3.png' },
  { idle: 'marquee-thumb44.png', hover: 'marquee-thumb4.png' },
  { idle: 'marquee-thumb55.png', hover: 'marquee-thumb5.png' },
  { idle: 'marquee-thumb66.png', hover: 'marquee-thumb6.png' },
]

export function HomeTrust() {
  const rootRef = useRef(null)
  const loop = [...MARKS, ...MARKS]

  useFadeUp(rootRef, { selector: '[data-fade-up]', start: 'top 90%', y: 24, duration: 0.7 })

  return (
    <section
      ref={rootRef}
      className={styles.brand}
      data-header-theme="light"
      aria-label="Trusted technology partners"
    >
      <Container width="wide">
        <div className={styles.slide} data-fade-up>
          <div className={styles.trackWrap}>
            <ul className={styles.track} role="list">
              {loop.map((mark, index) => (
                <li key={`${mark.idle}-${index}`} className={styles.item}>
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
        </div>
      </Container>
    </section>
  )
}
