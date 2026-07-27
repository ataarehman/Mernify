import { Container, Eyebrow, Heading, Section, Text } from '@/components/ui'
import { TechMark } from '@/components/media/TechMark'
import { homeTrust } from '@/content/trust'
import styles from './HomeTrust.module.css'

export function HomeTrust() {
  if (!homeTrust.partners.length) return null

  return (
    <Section tone="light" className={styles.trust} aria-labelledby="home-trust-title">
      <Container>
        <div className={styles.header}>
          <Eyebrow>{homeTrust.eyebrow}</Eyebrow>
          <Heading id="home-trust-title" level={2} className={styles.title}>
            {homeTrust.title}
          </Heading>
          <Text muted className={styles.support}>
            {homeTrust.support}
          </Text>
        </div>
        <ul className={styles.grid} role="list">
          {homeTrust.partners.map((partner) => (
            <li key={partner.id} className={styles.item}>
              <TechMark label={partner.label} path={partner.path} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
