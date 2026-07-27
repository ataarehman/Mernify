import { useSearchParams } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { ContactForm } from '@/components/forms/ContactForm'
import { Container, Section, Text } from '@/components/ui'
import { contactContent } from '@/content/pages'
import { SITE } from '@/constants/site'
import styles from './ContactPage.module.css'

export function ContactPage() {
  const [params] = useSearchParams()
  const intent = params.get('intent') || ''
  const service = params.get('service') || ''

  return (
    <>
      <PageMeta
        title="Contact"
        description={contactContent.support}
        canonicalPath="/contact"
      />
      <PageHero
        eyebrow={contactContent.eyebrow}
        title={contactContent.title}
        support={contactContent.support}
      />
      <Section tone="light" className={styles.section}>
        <Container className={styles.layout}>
          <aside className={styles.aside}>
            <div>
              <p className={styles.label}>{contactContent.emailLabel}</p>
              <a href={`mailto:${contactContent.email}`} className={styles.email}>
                {contactContent.email}
              </a>
            </div>
            <Text muted className={styles.note}>
              {contactContent.note}
            </Text>
            <Text muted className={styles.site}>
              {SITE.name} — {SITE.positioning}
            </Text>
          </aside>
          <div className={styles.formWrap}>
            <ContactForm defaultIntent={intent} defaultService={service} />
          </div>
        </Container>
      </Section>
    </>
  )
}
