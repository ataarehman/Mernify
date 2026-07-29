import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui'
import { homePortfolio } from '@/content/home'
import { useFadeUp } from '@/hooks/useFadeUp'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import styles from './HomeWork.module.css'

export function HomeWork() {
  const rootRef = useRef(null)
  const headerRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const { projects } = homePortfolio
  const rowOne = [projects[0], projects[1], projects[2]]
  const rowTwo = [projects[3], projects[4], projects[5]]

  useFadeUp(rootRef, { selector: '[data-fade-up]', start: 'top 82%', stagger: 0.08 })
  useScrubTitle(eyebrowRef, { start: 'top 95%', end: 'top 55%', scrub: 1.2 })
  useScrubTitle(titleRef, { start: 'top 92%', end: 'top 48%', scrub: 1.2 })

  // Size both mega lines to nearly the full content width (align with "PUBLISHED WORK").
  useLayoutEffect(() => {
    const header = headerRef.current
    const title = titleRef.current
    const eyebrow = eyebrowRef.current
    if (!header || !title) return undefined

    const fit = () => {
      const available = header.clientWidth
      if (!available) return

      // Probe natural glyph width (max-content), then scale to fill the row.
      const probe = 100
      title.style.width = 'max-content'
      title.style.fontSize = `${probe}px`
      if (eyebrow) {
        eyebrow.style.width = 'max-content'
        eyebrow.style.fontSize = `${probe}px`
      }

      const ratio = title.scrollWidth / probe
      title.style.width = ''
      if (eyebrow) eyebrow.style.width = ''
      if (!ratio) return

      // Fill almost the full row so "CASE STUDIES" lines up near the K in WORK.
      const size = `${Math.max((available / ratio) * 0.995, 28)}px`

      title.style.fontSize = size
      if (eyebrow) eyebrow.style.fontSize = size
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(header)
    document.fonts?.ready?.then(fit)

    return () => ro.disconnect()
  }, [])

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="home-work-title"
    >
      <Container width="wide">
        <div ref={headerRef} className={styles.header}>
          <p ref={eyebrowRef} className={styles.line} aria-hidden="true">
            {splitScrubChars(homePortfolio.eyebrow).map(({ key, char }) => (
              <span key={key} data-scrub-char className={styles.char}>
                {char}
              </span>
            ))}
          </p>
          <h2 id="home-work-title" className={styles.heading}>
            <span className={styles.srOnly}>
              {homePortfolio.eyebrow} {homePortfolio.title}
            </span>
            <span ref={titleRef} className={styles.line} aria-hidden="true">
              {splitScrubChars(homePortfolio.title).map(({ key, char }) => (
                <span key={key} data-scrub-char className={styles.char}>
                  {char}
                </span>
              ))}
            </span>
          </h2>
        </div>

        <div className={styles.mid} data-fade-up>
          <Link to={homePortfolio.cta.to} className={styles.midCta}>
            {homePortfolio.cta.label}
          </Link>
          <p className={styles.support}>{homePortfolio.support}</p>
          <h3 className={styles.status}>{homePortfolio.status}</h3>
        </div>

        <div className={styles.masonry}>
          <div className={styles.row}>
            <ProjectCard project={rowOne[0]} large />
            <div className={styles.stack}>
              <ProjectCard project={rowOne[1]} />
              <ProjectCard project={rowOne[2]} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.stack}>
              <ProjectCard project={rowTwo[0]} />
              <ProjectCard project={rowTwo[1]} />
            </div>
            <ProjectCard project={rowTwo[2]} large />
          </div>
        </div>
      </Container>
    </section>
  )
}

function ProjectCard({ project, large = false }) {
  if (!project) return null

  return (
    <article
      className={[styles.card, large ? styles.cardLarge : ''].filter(Boolean).join(' ')}
      data-fade-up
    >
      <div className={styles.cardTop}>
        <h4 className={styles.cardTitle}>
          <Link to={project.to}>{project.title}</Link>
        </h4>
        <ul className={styles.tags} role="list">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link to={project.to} className={styles.thumb} data-cursor="View">
        <img src={project.image} alt="" />
      </Link>
      <div className={styles.cardBottom}>
        <p>({project.id}. Project)</p>
        <p>({project.year})</p>
      </div>
    </article>
  )
}
