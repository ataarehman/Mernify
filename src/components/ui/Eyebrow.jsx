import styles from './Eyebrow.module.css'

export function Eyebrow({ as = 'p', className = '', children, ...props }) {
  const Tag = as
  return (
    <Tag className={[styles.eyebrow, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Tag>
  )
}
