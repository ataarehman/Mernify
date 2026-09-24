import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { appInitials, filterMobileApps, mobileAppFilters } from '@/content/mobileApps'
import styles from './mobileApps.module.css'

function Shot({ app }) {
  const src = app.screenshots?.[0] || app.coverImage
  if (src) {
    return (
      <div className={styles.shot}>
        <img src={src} alt={`${app.name} screenshot`} loading="lazy" decoding="async" />
      </div>
    )
  }
  return (
    <div className={styles.shot} aria-hidden="true">
      <div className={styles.device} style={{ color: app.accent }}>
        {appInitials(app.name)}
      </div>
    </div>
  )
}

export function MobileAppCard({ app }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.icon} style={{ background: app.accent }} aria-hidden="true">
          {appInitials(app.name)}
        </span>
        <div>
          <h3>{app.name}</h3>
          {app.company ? <p className={styles.company}>{app.company}</p> : null}
        </div>
        <span className={styles.platforms}>{app.platforms.join(' · ')}</span>
      </div>
      <p className={styles.desc}>{app.shortDescription}</p>
      <ul className={styles.featureList}>
        {app.categories.slice(0, 3).map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
      <Shot app={app} />
      <div className={styles.cardActions}>
        {app.playStoreUrl ? (
          <a href={app.playStoreUrl} target="_blank" rel="noreferrer">
            Google Play
          </a>
        ) : null}
        {app.appStoreUrl ? (
          <a href={app.appStoreUrl} target="_blank" rel="noreferrer">
            App Store
          </a>
        ) : null}
        {app.websiteUrl ? (
          <a href={app.websiteUrl} target="_blank" rel="noreferrer">
            Website
          </a>
        ) : null}
        <Link to={`/mobile-applications/${app.slug}`}>View Details</Link>
      </div>
    </article>
  )
}

export function MobileAppsGrid() {
  const [filter, setFilter] = useState('all')
  const apps = useMemo(() => filterMobileApps(filter), [filter])

  return (
    <div>
      <div className={styles.filters} role="tablist" aria-label="Filter mobile apps">
        {mobileAppFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            className={filter === item.id ? `${styles.filter} ${styles.filterActive}` : styles.filter}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {apps.length ? (
        <div className={styles.grid}>
          {apps.map((app) => (
            <MobileAppCard key={app.slug} app={app} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No apps in this filter yet.</p>
      )}
    </div>
  )
}
