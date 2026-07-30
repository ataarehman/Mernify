import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  BadgeCheck,
  MessageSquareText,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Container } from '@/components/ui'
import { TeamGrid } from '@/components/about/TeamGrid'
import { getPublishedTeam } from '@/content/team'
import { aboutContent } from '@/content/pages'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './AboutTeam.module.css'

const HIGHLIGHT_ICONS = [MessageSquareText, ShieldCheck, BadgeCheck]

export function AboutTeam() {
  const rootRef = useRef(null)
  const { team } = aboutContent
  const published = getPublishedTeam()
  const hasMembers = published.length > 0

  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 86%', y: 28 })

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="about-team-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.gridFade} />
      </div>

      <Container width="wide" className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerCopy} data-fade-up>
            <span className={styles.badge} aria-hidden="true">
              <Users size={16} />
            </span>
            <p className={styles.eyebrow}>{team.eyebrow}</p>
            <h2 id="about-team-title" className={styles.title}>
              {team.title}
            </h2>
            <p className={styles.support}>{team.support}</p>
          </div>

          <div className={styles.headerAside} data-fade-up data-delay="80">
            <p className={styles.asideLabel}>Engagement model</p>
            <p className={styles.asideValue}>Senior-led pods</p>
            <p className={styles.asideHint}>Architecture and delivery stay close to you</p>
          </div>
        </header>

        <div className={styles.highlights}>
          {team.highlights.map((item, index) => {
            const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length]
            return (
              <article
                key={item.title}
                className={styles.highlight}
                data-fade-up
                data-delay={String(index * 60)}
              >
                <span className={styles.highlightIcon} aria-hidden="true">
                  <Icon size={18} strokeWidth={2.1} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            )
          })}
        </div>

        {hasMembers ? (
          <div className={styles.membersPanel} data-fade-up>
            <TeamGrid embedded />
          </div>
        ) : (
          <div className={styles.rolesPanel} data-fade-up>
            <div className={styles.rolesHeader}>
              <p className={styles.rolesEyebrow}>Core roles</p>
              <h3>The people you’ll work with</h3>
              <p>
                Named bios and photos publish with founder approval. Until then, here’s the
                senior-led structure behind every engagement.
              </p>
            </div>

            <ul className={styles.roles} role="list">
              {team.roles.map((role, index) => (
                <li key={role.id} className={styles.roleCard}>
                  <span className={styles.roleIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className={styles.roleAvatar} aria-hidden="true">
                    <Users size={22} strokeWidth={1.75} />
                  </div>
                  <h4>{role.label}</h4>
                  <p>{role.note}</p>
                  <span className={styles.roleStatus}>Profile pending approval</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.ctaRow} data-fade-up>
          <p>Want to meet the team on a discovery call?</p>
          <Link to="/contact" className={styles.cta}>
            Start a conversation
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
