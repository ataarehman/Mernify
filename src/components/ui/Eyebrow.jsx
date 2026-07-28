import styles from './Eyebrow.module.css'

export function Eyebrow({ as = 'p', rule = false, className = '', children, ...props }) {
  const Tag = as
  return (
    <Tag
      className={[styles.eyebrow, rule ? styles.withRule : '', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </Tag>
  )
}
