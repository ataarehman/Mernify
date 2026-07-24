import styles from './Text.module.css'

const SIZE = {
  lg: styles.lg,
  md: styles.md,
  sm: styles.sm,
}

export function Text({
  as = 'p',
  size = 'md',
  muted = false,
  className = '',
  children,
  ...props
}) {
  const Tag = as
  const classes = [
    styles.text,
    SIZE[size] || SIZE.md,
    muted ? styles.muted : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
