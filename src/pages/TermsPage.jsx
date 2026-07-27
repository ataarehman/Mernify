import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Container, Section, Text } from '@/components/ui'
import { termsContent } from '@/content/pages'
import styles from './LegalPage.module.css'

export function TermsPage() {
  return (
    <>
      <PageMeta
        title={termsContent.title}
        description="Terms governing use of the Mernify marketing website."
        canonicalPath="/terms"
      />
      <PageHero title={termsContent.title} support={`Last updated ${termsContent.updated}`} />
      <Section tone="light" className={styles.section}>
        <Container className={styles.content}>
          {termsContent.sections.map((section) => (
            <article key={section.heading} className={styles.block}>
              <h2>{section.heading}</h2>
              <Text>{section.body}</Text>
            </article>
          ))}
        </Container>
      </Section>
    </>
  )
}
