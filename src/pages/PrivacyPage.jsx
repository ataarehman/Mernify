import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Container, Section, Text } from '@/components/ui'
import { privacyContent } from '@/content/pages'
import styles from './LegalPage.module.css'

export function PrivacyPage() {
  return (
    <>
      <PageMeta
        title={privacyContent.title}
        description="How Mernify handles information when you use mernify.co or contact us."
        canonicalPath="/privacy"
      />
      <PageHero title={privacyContent.title} support={`Last updated ${privacyContent.updated}`} />
      <Section tone="light" className={styles.section}>
        <Container className={styles.content}>
          {privacyContent.sections.map((section) => (
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
