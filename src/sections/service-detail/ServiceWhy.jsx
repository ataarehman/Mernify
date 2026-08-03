import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { SERVICE_ICONS } from '@/lib/serviceIcons'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './ServiceWhy.module.css'

function ScrubTitle({ id, className, children }) {
  const ref = useRef(null)
  useScrubTitle(ref)
  const words = String(children).match(/\S+/g) || []
  return (
    <h2 id={id} ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${i}-${word}`} className={styles.word}>
          {splitScrubChars(word).map(({ key, char }) => (
            <span key={key} data-scrub-char className={styles.char}>
              {char}
            </span>
          ))}
          {'\u00A0'}
        </span>
      ))}
    </h2>
  )
}

export function ServiceWhy({ content }) {
  const rootRef = useRef(null)
  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 88%', y: 32 })

  if (!content?.items?.length) return null

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="service-why-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orb} />
      </div>
      <Container width="wide" className={styles.shell}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <header className={styles.header} data-fade-up>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <ScrubTitle id="service-why-title" className={styles.title}>
                {content.title}
              </ScrubTitle>
              {content.support ? <p className={styles.support}>{content.support}</p> : null}
            </header>

            <ul className={styles.grid} role="list">
              {content.items.map((item, index) => {
                const Icon = SERVICE_ICONS[item.icon] || SERVICE_ICONS.target
                return (
                  <li
                    key={item.title}
                    className={styles.card}
                    data-fade-up
                    data-delay={String(80 + index * 70)}
                  >
                    <span className={styles.icon} aria-hidden="true">
                      <Icon size={20} strokeWidth={2.1} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                )
              })}
            </ul>
          </div>

          {content.media ? (
            <figure className={styles.media} data-fade-up data-delay="120">
              <div className={styles.mediaFrame}>
                <ClipReveal
                  src={content.media.src}
                  alt={content.media.alt || ''}
                  className={styles.clip}
                />
              </div>
              <figcaption className={styles.caption}>
                <span>Craft</span>
                <span>Ownership</span>
                <Link to="/contact" className={styles.captionLink}>
                  Talk to us <ArrowUpRight size={16} />
                </Link>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
