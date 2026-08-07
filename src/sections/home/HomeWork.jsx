import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Button, Container } from '@/components/ui'
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

  useLayoutEffect(() => {
    const header = headerRef.current
    const title = titleRef.current
    const eyebrow = eyebrowRef.current
    if (!header || !title) return undefined

    const fit = () => {
      const available = header.clientWidth
      if (!available) return

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
      <div className={styles.atmosphere} aria-hidden="true" />
      <Container width="wide" className={styles.inner}>
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
          <div className={styles.midLead}>
            <p className={styles.kicker}>Portfolio</p>
            <h3 className={styles.status}>{homePortfolio.status}</h3>
            <p className={styles.support}>{homePortfolio.support}</p>
          </div>
          <Button as={Link} to={homePortfolio.cta.to} size="md">
            {homePortfolio.cta.label}
          </Button>
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
      style={{ '--card-accent': project.accent || 'var(--mf-color-indigo)' }}
      data-fade-up
    >
      <Link to={project.to} className={styles.cardLink} data-cursor="View">
        <span className={styles.thumb}>
          <img
            src={project.image}
            alt=""
            width={1440}
            height={900}
            loading="lazy"
            decoding="async"
            sizes={large ? '(max-width: 900px) 92vw, 58vw' : '(max-width: 900px) 92vw, 28vw'}
          />
        </span>

        <span className={styles.body}>
          <span className={styles.meta}>
            <span className={styles.index}>{project.id}</span>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.category}>{project.category}</span>
            <span className={styles.year}>{project.year}</span>
          </span>

          <span className={styles.cardTitle}>{project.title}</span>

          {project.excerpt ? <span className={styles.excerpt}>{project.excerpt}</span> : null}

          <span className={styles.footer}>
            <span className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </span>
            <span className={styles.arrow} aria-hidden="true">
              <ArrowUpRight size={16} strokeWidth={2.25} />
            </span>
          </span>
        </span>

        <span className={styles.glass} aria-hidden="true">
          <span className={styles.glassBtn}>
            View Case Study
            <ArrowUpRight size={16} strokeWidth={2.25} />
          </span>
        </span>
      </Link>
    </article>
  )
}
