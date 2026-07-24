import styles from './TechMark.module.css'

export function TechMark({ label, path, className = '' }) {
  return (
    <span
      className={[styles.mark, className].filter(Boolean).join(' ')}
      aria-label={label}
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path d={path} />
      </svg>
      <span className={styles.label} aria-hidden="true">
        {label}
      </span>
    </span>
  )
}
