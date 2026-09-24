import { Link } from 'react-router-dom'
import { Container } from '@/components/ui'
import { appInitials, getHomeMobileApps } from '@/content/mobileApps'
import styles from './HomeMobileApps.module.css'

export function HomeMobileApps() {
  const apps = getHomeMobileApps()

  return (
    <section className={styles.section} aria-labelledby="home-mobile-apps-title">
      <Container width="wide">
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Mobile applications</p>
            <h2 id="home-mobile-apps-title" className={styles.title}>
              Mobile Apps We&apos;ve Shipped
            </h2>
            <p className={styles.support}>
              Explore Android and iOS products built across AI, healthcare, e-commerce, retail,
              marketplaces and more.
            </p>
          </div>
          <Link className={styles.cta} to="/mobile-applications">
            View All Mobile Apps →
          </Link>
        </div>
        <div className={styles.grid}>
          {apps.map((app) => (
            <Link key={app.slug} to={`/mobile-applications/${app.slug}`} className={styles.card}>
              <span className={styles.mark} style={{ background: app.accent }}>
                {appInitials(app.name)}
              </span>
              <span>
                <span className={styles.name}>{app.name}</span>
                <span className={styles.platforms}>{app.platforms.join(' · ')}</span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
