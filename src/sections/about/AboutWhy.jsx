import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { aboutContent } from '@/content/pages'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './AboutWhy.module.css'

/** Keep scrub chars, but wrap words so mid-word line breaks never happen. */
function ScrubWords({ text, accent = '', charClass, accentClass, wordClass }) {
  const chunks = accent
    ? String(text).split(new RegExp(`(${accent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'))
    : [String(text)]

  const nodes = []
  chunks.forEach((chunk, chunkIndex) => {
    if (!chunk) return
    const isAccent = Boolean(accent) && chunk.toLowerCase() === accent.toLowerCase()
    const words = chunk.match(/\S+/g) || []
    words.forEach((word, wordIndex) => {
      nodes.push(
        <span key={`${chunkIndex}-${wordIndex}-${word}`} className={wordClass}>
          {splitScrubChars(word).map(({ key, char }) => (
            <span
              key={`${chunkIndex}-${wordIndex}-${key}`}
              data-scrub-char
              className={isAccent ? `${charClass} ${accentClass}` : charClass}
            >
              {char}
            </span>
          ))}
          {'\u00A0'}
        </span>,
      )
    })
  })

  return nodes
}

function ValueRow({ value, index }) {
  const rowRef = useRef(null)
  const previewRef = useRef(null)
  const [active, setActive] = useState(false)

  const onMove = useCallback((event) => {
    const row = rowRef.current
    const preview = previewRef.current
    if (!row || !preview) return
    const rect = row.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    preview.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -55%)`
  }, [])

  return (
    <li
      ref={rowRef}
      className={[styles.valueRow, active ? styles.valueRowActive : ''].filter(Boolean).join(' ')}
      data-fade-up
      data-delay={String(index * 40)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={onMove}
    >
      <div className={styles.valueMain}>
        <span className={styles.valueIndex}>{String(index + 1).padStart(2, '0')}</span>
        <div className={styles.valueCopy}>
          <h4>{value.title}</h4>
          <p className={styles.valueText}>{value.text}</p>
        </div>
      </div>
      <span className={styles.valueSide}>{value.side}</span>
      <div
        ref={previewRef}
        className={styles.valuePreview}
        style={{ backgroundImage: `url(${value.image})` }}
        aria-hidden="true"
      />
    </li>
  )
}

export function AboutWhy() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const { why, values, audiences } = aboutContent
  const [activePillar, setActivePillar] = useState(1)

  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 84%', y: 28 })
  useScrubTitle(titleRef, { start: 'top 90%', end: 'top 55%', scrub: 0.45 })

  return (
    <div ref={rootRef} className={styles.wrap}>
      <section
        className={styles.partner}
        data-header-theme="dark"
        aria-labelledby="about-why-title"
      >
        <div className={styles.partnerAtmosphere} aria-hidden="true">
          <span className={styles.orbOne} />
          <span className={styles.orbTwo} />
        </div>

        <Container width="wide" className={styles.partnerShell}>
          <header className={styles.partnerHeader} data-fade-up>
            <p className={styles.eyebrow}>{why.eyebrow}</p>
            <h2 id="about-why-title" ref={titleRef} className={styles.partnerTitle}>
              <ScrubWords
                text={why.title}
                accent={why.titleAccent}
                wordClass={styles.word}
                charClass={styles.char}
                accentClass={styles.accent}
              />
            </h2>
            <p className={styles.support}>{why.support}</p>
          </header>

          <div className={styles.pillars}>
            {why.pillars.map((pillar, index) => {
              const isActive = activePillar === index
              return (
                <article
                  key={pillar.title}
                  className={[styles.pillar, isActive ? styles.pillarActive : ''].filter(Boolean).join(' ')}
                  data-fade-up
                  data-delay={String(index * 70)}
                  onMouseEnter={() => setActivePillar(index)}
                  onFocus={() => setActivePillar(index)}
                  onClick={() => setActivePillar(index)}
                  tabIndex={0}
                >
                  <span className={styles.pillarFill} aria-hidden="true" />
                  <p className={styles.pillarWord}>{pillar.title}</p>
                  <div className={styles.pillarBody}>
                    <h3>{pillar.headline}</h3>
                    <p>{pillar.text}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <section
        className={styles.values}
        data-header-theme="light"
        aria-labelledby="about-values-title"
      >
        <Container width="wide" className={styles.valuesShell}>
          <header className={styles.valuesHeader} data-fade-up>
            <p className={styles.valuesEyebrow}>{why.valuesEyebrow}</p>
            <h3 id="about-values-title" className={styles.valuesTitle}>
              {why.valuesTitle}
            </h3>
            <p className={styles.valuesSupport}>{why.valuesSupport}</p>
          </header>

          <ul className={styles.valueList} role="list">
            {values.map((value, index) => (
              <ValueRow key={value.title} value={value} index={index} />
            ))}
          </ul>

          <div className={styles.audiences} data-fade-up>
            <header className={styles.audiencesTop}>
              <div className={styles.badge} aria-hidden="true">
                <svg className={styles.badgeRing} viewBox="0 0 200 200">
                  <defs>
                    <path
                      id="audiences-badge-path"
                      d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
                    />
                  </defs>
                  <text className={styles.badgeText}>
                    <textPath href="#audiences-badge-path" startOffset="0%">
                      {why.audiencesBadge}
                    </textPath>
                  </text>
                </svg>
                <span className={styles.badgeCore}>
                  <span className={styles.badgeDot} data-tone="indigo" />
                  <span className={styles.badgeDot} data-tone="cyan" />
                  <span className={styles.badgeDot} data-tone="violet" />
                  <span className={styles.badgeDot} data-tone="sky" />
                </span>
              </div>

              <div className={styles.audiencesHeading}>
                <p className={styles.audiencesEyebrow}>{why.audiencesEyebrow}</p>
                <h3 id="about-audiences-title">
                  {why.audiencesTitle.split(why.audiencesTitleAccent).map((part, index, parts) => (
                    <span key={`aud-title-${index}`}>
                      {part}
                      {index < parts.length - 1 ? (
                        <span className={styles.audiencesAccent}>{why.audiencesTitleAccent}</span>
                      ) : null}
                    </span>
                  ))}
                </h3>
                <p className={styles.audiencesSupport}>{why.audiencesSupport}</p>
              </div>
            </header>

            <div className={styles.audiencesBody}>
              <div className={styles.audiencesMedia} data-fade-up data-delay="80">
                {why.audiencesImages.map((image, index) => (
                  <figure
                    key={image.src}
                    className={index === 0 ? styles.mediaPrimary : styles.mediaSecondary}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={800}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                ))}
              </div>

              <ul className={styles.audienceList} role="list">
                {audiences.map((item, index) => (
                  <li key={item.title} data-fade-up data-delay={String(100 + index * 60)}>
                    <Link to={item.to} className={styles.audienceRow}>
                      <span className={styles.audienceIndex}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={styles.audienceCopy}>
                        <span className={styles.audienceTitle}>{item.title}</span>
                        <span className={styles.audienceText}>{item.text}</span>
                      </span>
                      <span className={styles.audienceArrow} aria-hidden="true">
                        <ArrowUpRight size={18} strokeWidth={2.2} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
