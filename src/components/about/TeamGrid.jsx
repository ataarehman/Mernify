import { getPublishedTeam, teamContent } from '@/content/team'
import styles from './TeamGrid.module.css'

/**
 * Renders published team members. If none are published, shows a concise
 * senior-led partnership note (no fake names).
 */
export function TeamGrid({ embedded = false }) {
  const members = getPublishedTeam()

  if (!members.length) {
    return (
      <div className={[styles.fallback, embedded ? styles.fallbackEmbedded : ''].filter(Boolean).join(' ')}>
        {embedded ? null : <h3 className={styles.fallbackTitle}>{teamContent.title}</h3>}
        <p className={styles.fallbackText}>{teamContent.support}</p>
        <p className={styles.fallbackHint}>
          Named bios and photos are published with founder approval.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      {embedded ? null : (
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{teamContent.eyebrow}</p>
          <h3 className={styles.title}>{teamContent.title}</h3>
          <p className={styles.support}>{teamContent.support}</p>
        </div>
      )}
      <ul className={styles.grid} role="list">
        {members.map((member) => (
          <li key={member.id} className={styles.card}>
            <img
              src={member.photo}
              alt=""
              className={styles.photo}
              width={320}
              height={400}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.meta}>
              <h4>{member.name}</h4>
              <p className={styles.role}>{member.role}</p>
              {member.bio ? <p className={styles.bio}>{member.bio}</p> : null}
              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  LinkedIn
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
