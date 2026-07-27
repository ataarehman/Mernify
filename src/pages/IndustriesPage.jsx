import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Container, Section, Text } from '@/components/ui'
import { homeIndustries, industries } from '@/content/industries'
import styles from './IndustriesPage.module.css'

export function IndustriesPage() {
  return (
    <>
      <PageMeta
        title="Industries"
        description="Domain-aware product patterns for healthcare, logistics, field service, and more—without implied credentials."
        canonicalPath="/industries"
      />
      <PageHero
        eyebrow={homeIndustries.eyebrow}
        title={homeIndustries.title}
        support={homeIndustries.support}
      />
      <Section tone="light" className={styles.section}>
        <Container>
          <p className={styles.disclaimer}>{homeIndustries.disclaimer}</p>
          <div className={styles.list}>
            {industries.map((item) => (
              <article key={item.slug} id={item.slug} className={styles.card}>
                <h2>{item.title}</h2>
                <Text muted>{item.summary}</Text>
                <div className={styles.focus}>
                  <p className={styles.focusLabel}>Typical focus areas</p>
                  <ul role="list">
                    {item.focus.map((focus) => (
                      <li key={focus}>{focus}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
