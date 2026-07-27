import { Container, Eyebrow, Heading, Section } from '@/components/ui'
import { homeFaq } from '@/content/faq'
import styles from './HomeFaq.module.css'

export function HomeFaq() {
  return (
    <Section tone="light" className={styles.section} aria-labelledby="home-faq-title">
      <Container className={styles.inner}>
        <div className={styles.header}>
          <Eyebrow>{homeFaq.eyebrow}</Eyebrow>
          <Heading id="home-faq-title" level={2}>
            {homeFaq.title}
          </Heading>
        </div>

        <div className={styles.list}>
          {homeFaq.items.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary className={styles.question}>{item.question}</summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}
