import { Link } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container, Section, Text } from '@/components/ui'
import { aboutContent } from '@/content/pages'
import styles from './AboutPage.module.css'

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About"
        description={aboutContent.lead}
        canonicalPath="/about"
      />
      <PageHero
        eyebrow={aboutContent.eyebrow}
        title={aboutContent.title}
        support={aboutContent.lead}
        actions={
          <Button as={Link} to="/contact">
            Work with us
          </Button>
        }
      />
      <Section tone="light" className={styles.section}>
        <Container className={styles.layout}>
          <div className={styles.block}>
            <h2>Mission</h2>
            <Text>{aboutContent.mission}</Text>
          </div>
          <div className={styles.block}>
            <h2>Vision</h2>
            <Text>{aboutContent.vision}</Text>
          </div>
          <div className={styles.block}>
            <h2>Promise</h2>
            <Text>{aboutContent.promise}</Text>
          </div>

          <div className={styles.block}>
            <h2>Values</h2>
            <ul className={styles.values} role="list">
              {aboutContent.values.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <h2>Who we work with</h2>
            <ul className={styles.audiences} role="list">
              {aboutContent.audiences.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  )
}
