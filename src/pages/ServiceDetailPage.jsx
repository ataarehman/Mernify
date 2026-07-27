import { Link, useParams } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container, Section, Text } from '@/components/ui'
import { SERVICE_ICONS } from '@/lib/serviceIcons'
import { getServiceBySlug } from '@/content/services'
import { NotFoundPage } from '@/pages/NotFoundPage'
import styles from './ServiceDetailPage.module.css'

export function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) {
    return <NotFoundPage />
  }

  const Icon = SERVICE_ICONS[service.icon] || SERVICE_ICONS.boxes

  return (
    <>
      <PageMeta
        title={service.title}
        description={service.description}
        canonicalPath={`/services/${service.slug}`}
      />
      <PageHero
        eyebrow="Service"
        title={service.title}
        support={service.description}
        actions={
          <Button as={Link} to="/contact">
            Discuss this service
          </Button>
        }
      />
      <Section tone="light" className={styles.section}>
        <Container className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.iconRow}>
              <span className={styles.icon}>
                <Icon size={24} aria-hidden="true" />
              </span>
            </div>
            <div className={styles.block}>
              <h2>Problem</h2>
              <Text>{service.problem}</Text>
            </div>
            <div className={styles.block}>
              <h2>Outcome</h2>
              <Text>{service.outcome}</Text>
            </div>
            <div className={styles.block}>
              <h2>Capabilities</h2>
              <ul role="list">
                {service.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <aside className={styles.aside}>
            <p className={styles.asideLabel}>Next step</p>
            <Text muted>
              Share your context on the contact form—we will suggest whether this service fits and
              what a discovery sprint might cover.
            </Text>
            <Button as={Link} to="/contact" className={styles.asideCta}>
              Start a conversation
            </Button>
            <Button as={Link} to="/services" variant="ghost">
              All services
            </Button>
          </aside>
        </Container>
      </Section>
    </>
  )
}
