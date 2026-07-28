import { Container } from '@/components/ui'
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
      <Container width="wide" className={styles.inner}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1 id="page-hero-title" className={styles.title}>
          {title}
        </h1>
        {support ? <p className={styles.support}>{support}</p> : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </Container>
    </section>
  )
}
