import styles from './Heading.module.css'

const LEVEL_CLASS = {
  1: styles.h1,
  2: styles.h2,
  3: styles.h3,
  4: styles.h4,
}

export function Heading({ as, level = 2, className = '', children, ...props }) {
  const Tag = as || `h${level}`
  const classes = [styles.heading, LEVEL_CLASS[level] || LEVEL_CLASS[2], className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
