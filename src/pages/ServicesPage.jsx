import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Container, Section, Text } from '@/components/ui'
import { SERVICE_ICONS } from '@/lib/serviceIcons'
import { services } from '@/content/services'
import styles from './ServicesPage.module.css'

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Services"
        description="Product engineering, SaaS, web, mobile, AI integration, and dedicated delivery—organized by commercial outcomes."
        canonicalPath="/services"
      />
      <PageHero
        eyebrow="Services"
        title="Product engineering buyers actually purchase"
        support="Every service is framed around the problem you need solved and the outcome you should expect—not a laundry list of frameworks."
      />
      <Section tone="light" className={styles.section}>
        <Container>
          <ul className={styles.grid} role="list">
            {services.map((item) => {
              const Icon = SERVICE_ICONS[item.icon] || SERVICE_ICONS.boxes
              return (
                <li key={item.slug}>
                  <Link to={`/services/${item.slug}`} className={styles.card}>
                    <span className={styles.icon}>
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h2>{item.title}</h2>
                    <Text muted className={styles.problem}>
                      {item.problem}
                    </Text>
                    <p className={styles.outcome}>
                      <strong>Outcome:</strong> {item.outcome}
                    </p>
                    <span className={styles.cta}>
                      Explore service <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>
    </>
  )
}
