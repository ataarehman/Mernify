import { Container, Eyebrow, Heading, Section, Text } from '@/components/ui'
import { SERVICE_ICONS } from '@/lib/serviceIcons'
import { whyMernify } from '@/content/why'
import styles from './HomeWhy.module.css'

export function HomeWhy() {
  return (
    <Section tone="light" className={styles.section} aria-labelledby="home-why-title">
      <Container>
        <div className={styles.header}>
          <Eyebrow>{whyMernify.eyebrow}</Eyebrow>
          <Heading id="home-why-title" level={2}>
            {whyMernify.title}
          </Heading>
          <Text muted className={styles.support}>
            {whyMernify.support}
          </Text>
        </div>
        <ul className={styles.grid} role="list">
          {whyMernify.items.map((item) => {
            const Icon = SERVICE_ICONS[item.icon] || SERVICE_ICONS.target
            return (
              <li key={item.title} className={styles.card}>
                <span className={styles.icon}>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
