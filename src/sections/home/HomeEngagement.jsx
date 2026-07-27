import { Container, Eyebrow, Heading, Section, Text } from '@/components/ui'
import { deliveryPrinciples, engagementModels } from '@/content/why'
import styles from './HomeEngagement.module.css'

export function HomeEngagement() {
  return (
    <Section tone="light" className={styles.section} aria-labelledby="home-engagement-title">
      <Container>
        <div className={styles.header}>
          <Eyebrow>Engagement</Eyebrow>
          <Heading id="home-engagement-title" level={2}>
            Models that match where you are
          </Heading>
          <Text muted className={styles.support}>
            No fabricated testimonials—just clear ways to work together and principles we hold ourselves to.
          </Text>
        </div>

        <div className={styles.models}>
          <h3 className={styles.subheading}>Engagement models</h3>
          <ul className={styles.modelGrid} role="list">
            {engagementModels.map((model) => (
              <li key={model.title} className={styles.modelCard}>
                <h4>{model.title}</h4>
                <p>{model.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.principles}>
          <h3 className={styles.subheading}>Delivery principles</h3>
          <ul className={styles.principleGrid} role="list">
            {deliveryPrinciples.map((principle) => (
              <li key={principle.title} className={styles.principleCard}>
                <h4>{principle.title}</h4>
                <p>{principle.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
