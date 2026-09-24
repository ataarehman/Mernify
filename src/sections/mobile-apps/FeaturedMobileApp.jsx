import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { appInitials } from '@/content/mobileApps'
import styles from './mobileApps.module.css'

export function FeaturedMobileApp({ app }) {
  return (
    <article className={styles.featured}>
      <div>
        <p className={styles.badge}>{app.badge || 'Featured'}</p>
        <h2 className={styles.title}>{app.name}</h2>
        <p className={styles.support}>{app.description}</p>
        <p className={styles.meta}>
          {[app.region, app.platforms.join(' · ')].filter(Boolean).join(' — ')}
          {app.websiteUrl ? ` — ${app.websiteUrl.replace(/^https?:\/\//, '')}` : ''}
        </p>
        <ul className={styles.featureList}>
          {app.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className={styles.actions}>
          {app.playStoreUrl ? (
            <Button as="a" href={app.playStoreUrl} target="_blank" rel="noreferrer">
              Google Play
            </Button>
          ) : null}
          {app.appStoreUrl ? (
            <Button as="a" href={app.appStoreUrl} target="_blank" rel="noreferrer" variant="secondary">
              App Store
            </Button>
          ) : null}
          {app.websiteUrl ? (
            <Button as="a" href={app.websiteUrl} target="_blank" rel="noreferrer" variant="secondary">
              Visit Website
            </Button>
          ) : null}
          <Button as={Link} to={`/mobile-applications/${app.slug}`} variant="secondary">
            View Project
          </Button>
        </div>
      </div>
      <div className={styles.featuredShot}>
        {app.screenshots?.[0] ? (
          <img src={app.screenshots[0]} alt={`${app.name} on the app store`} />
        ) : (
          <span className={styles.mark}>{appInitials(app.name)}</span>
        )}
      </div>
    </article>
  )
}
