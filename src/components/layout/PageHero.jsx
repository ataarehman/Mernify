import { Container, Eyebrow, Heading, Text } from '@/components/ui'
import styles from './PageHero.module.css'

export function PageHero({
  eyebrow,
  title,
  support,
  actions,
  tone = 'light',
  className = '',
}) {
  const classes = [
    styles.hero,
    tone === 'dark' ? styles.dark : styles.light,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      className={classes}
      data-header-theme={tone === 'dark' ? 'dark' : 'light'}
      aria-labelledby="page-hero-title"
    >
      <Container className={styles.inner}>
        {eyebrow ? <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow> : null}
        <Heading id="page-hero-title" level={1} className={styles.title}>
          {title}
        </Heading>
        {support ? (
          <Text className={styles.support} muted={tone === 'light'}>
            {support}
          </Text>
        ) : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </Container>
    </section>
  )
}
