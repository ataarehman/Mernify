import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { TeamGrid } from '@/components/about/TeamGrid'
import { getPublishedTeam } from '@/content/team'
import { aboutContent } from '@/content/pages'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './AboutTeam.module.css'

export function AboutTeam() {
  const rootRef = useRef(null)
  const { team } = aboutContent
  const published = getPublishedTeam()
  const hasMembers = published.length > 0
  const [activeRole, setActiveRole] = useState(0)

  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 86%', y: 28 })

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="about-team-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.noise} />
      </div>

      <Container width="wide" className={styles.shell}>
        <div className={styles.top}>
          <div className={styles.copy} data-fade-up>
            <p className={styles.eyebrow}>{team.eyebrow}</p>
            <h2 id="about-team-title" className={styles.title}>
              {team.title}
            </h2>
            <p className={styles.support}>{team.support}</p>

            <div className={styles.copyMeta}>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Model</span>
                <strong>Senior-led pods</strong>
              </div>
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Access</span>
                <strong>Direct to delivery</strong>
              </div>
            </div>

            <Link to="/contact" className={styles.cta}>
              Meet the pod
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.rail} data-fade-up data-delay="100">
            <p className={styles.railLabel}>Core pod structure</p>
            <ol className={styles.roles} role="list">
              {team.roles.map((role, index) => {
                const isActive = activeRole === index
                return (
                  <li key={role.id}>
                    <button
                      type="button"
                      className={[styles.role, isActive ? styles.roleActive : '']
                        .filter(Boolean)
                        .join(' ')}
                      onMouseEnter={() => setActiveRole(index)}
                      onFocus={() => setActiveRole(index)}
                      onClick={() => setActiveRole(index)}
                      aria-pressed={isActive}
                    >
                      <span className={styles.roleIndex} aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={styles.roleBody}>
                        <span className={styles.roleTitle}>{role.label}</span>
                        <span className={styles.roleNote}>{role.note}</span>
                      </span>
                      <span className={styles.roleStatus}>Pending bio</span>
                    </button>
                  </li>
                )
              })}
            </ol>
            <p className={styles.railHint}>
              Named bios and photos publish with founder approval.
            </p>
          </div>
        </div>

        <ul className={styles.promises} role="list" data-fade-up>
          {team.highlights.map((item, index) => (
            <li key={item.title} className={styles.promise}>
              <span className={styles.promiseIndex}>0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        {hasMembers ? (
          <div className={styles.membersPanel} data-fade-up>
            <TeamGrid embedded />
          </div>
        ) : null}
      </Container>
    </section>
  )
}
