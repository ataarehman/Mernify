import { useRef } from 'react'
import { Crosshair, Sparkles, Telescope } from 'lucide-react'
import { Container } from '@/components/ui'
import { aboutContent } from '@/content/pages'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './AboutMission.module.css'

export function AboutMission() {
  const rootRef = useRef(null)
  const { missionVision } = aboutContent
  const mission = missionVision.mission
  const vision = missionVision.vision

  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 84%', y: 28 })

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="about-mission-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.gridFade} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{missionVision.eyebrow}</p>
          <h2 id="about-mission-title" className={styles.title}>
            {missionVision.title}
          </h2>
          <p className={styles.support}>{missionVision.support}</p>
        </header>

        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.mission}`} data-fade-up>
            <span className={styles.watermark} aria-hidden="true">
              01
            </span>
            <div className={styles.cardGlow} aria-hidden="true" />
            <div className={styles.cardTop}>
              <span className={styles.iconWrap} aria-hidden="true">
                <span className={styles.iconRing} />
                <span className={styles.icon}>
                  <Crosshair size={24} strokeWidth={2} />
                </span>
              </span>
              <p className={styles.label}>{mission.label}</p>
            </div>
            <h3 className={styles.cardTitle}>{mission.heading}</h3>
            <p className={styles.text}>{mission.text}</p>
            <ul className={styles.points} role="list">
              {mission.points.map((point) => (
                <li key={point}>
                  <span className={styles.pointDot} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <span className={styles.shine} aria-hidden="true" />
          </article>

          <article
            className={`${styles.card} ${styles.vision}`}
            data-fade-up
            data-delay="100"
          >
            <span className={styles.watermark} aria-hidden="true">
              02
            </span>
            <div className={styles.cardGlow} aria-hidden="true" />
            <div className={styles.cardTop}>
              <span className={styles.iconWrap} aria-hidden="true">
                <span className={styles.iconRing} />
                <span className={styles.icon}>
                  <Telescope size={24} strokeWidth={2} />
                </span>
              </span>
              <p className={styles.label}>
                <Sparkles size={12} aria-hidden="true" />
                {vision.label}
              </p>
            </div>
            <h3 className={styles.cardTitle}>{vision.heading}</h3>
            <p className={styles.text}>{vision.text}</p>
            <ul className={styles.points} role="list">
              {vision.points.map((point) => (
                <li key={point}>
                  <span className={styles.pointDot} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <span className={styles.shine} aria-hidden="true" />
          </article>
        </div>
      </Container>
    </section>
  )
}
