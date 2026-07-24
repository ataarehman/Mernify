import styles from './SkipLink.module.css'

export function SkipLink({ href = '#main-content' }) {
  return (
    <a className={styles.skip} href={href}>
      Skip to content
    </a>
  )
}
