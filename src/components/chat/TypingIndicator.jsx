import styles from './TypingIndicator.module.css'

export function TypingIndicator() {
  return (
    <div className={styles.wrap} role="status" aria-label="Mernify AI is typing">
      <div className={styles.avatar} aria-hidden="true">M</div>
      <div className={styles.bubble} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  )
}
