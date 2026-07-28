import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui'
import { homePortfolio } from '@/content/home'
import { useFadeUp } from '@/hooks/useFadeUp'
import styles from './HomeWork.module.css'

export function HomeWork() {
  const rootRef = useRef(null)
  const { projects } = homePortfolio
  const rowOne = [projects[0], projects[1], projects[2]]
  const rowTwo = [projects[3], projects[4], projects[5]]

  useFadeUp(rootRef, { selector: '[data-fade-up]', start: 'top 82%', stagger: 0.08 })

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="home-work-title"
    >
      <Container width="wide">
        <div className={styles.header} data-fade-up>
          <span className={styles.eyebrow}>{homePortfolio.eyebrow}</span>
          <h2 id="home-work-title" className={styles.title}>
            {homePortfolio.title}
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
