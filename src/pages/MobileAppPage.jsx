import { Link, useParams } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container } from '@/components/ui'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { appInitials, getMobileApp } from '@/content/mobileApps'
import styles from '@/sections/mobile-apps/mobileApps.module.css'

export function MobileAppPage() {
  const { slug } = useParams()
  const app = getMobileApp(slug)

  if (!app) return <NotFoundPage />

  const image = app.screenshots?.[0] || app.coverImage

  return (
    <div className={styles.page}>
      <PageMeta
        title={`${app.name} | Mobile Applications | Mernify`}
        description={app.shortDescription}
        canonicalPath={`/mobile-applications/${app.slug}`}
      />
      <PageHero
        eyebrow={app.company || 'Mobile application'}
        title={app.name}
        support={app.description}
        actions={
          <div className={styles.heroActions}>
            {app.websiteUrl ? (
              <Button as="a" href={app.websiteUrl} target="_blank" rel="noreferrer">
                Visit Website
              </Button>
            ) : null}
            {app.playStoreUrl ? (
              <Button as="a" href={app.playStoreUrl} target="_blank" rel="noreferrer" variant="secondary">
                Google Play
              </Button>
            ) : null}
            {app.appStoreUrl ? (
              <Button as="a" href={app.appStoreUrl} target="_blank" rel="noreferrer" variant="secondary">
                App Store
              </Button>
            ) : null}
            {app.caseStudyPath ? (
              <Button as={Link} to={app.caseStudyPath} variant="secondary">
                Case Study
              </Button>
            ) : null}
          </div>
        }
      />
      <section className={styles.section}>
        <Container width="wide" className={styles.detailHero}>
          {image ? (
            <img src={image} alt={`${app.name} screenshot`} width={800} height={480} />
          ) : (
            <div className={styles.shot} aria-hidden="true">
              <div className={styles.device} style={{ color: app.accent }}>
                {appInitials(app.name)}
              </div>
            </div>
          )}
          <p className={styles.meta}>
            {app.platforms.join(' · ')}
            {app.region ? ` · ${app.region}` : ''}
          </p>
          <ul className={styles.featureList}>
            {app.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button as={Link} to="/mobile-applications" variant="secondary">
              All mobile apps
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
