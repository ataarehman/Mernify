import styles from './Container.module.css'

const WIDTH = {
  default: styles.default,
  narrow: styles.narrow,
  wide: styles.wide,
  bleed: styles.bleed,
}

export function Container({
  width = 'default',
  className = '',
  children,
  as = 'div',
  ...props
}) {
  const Tag = as
  const classes = [styles.container, WIDTH[width] || WIDTH.default, className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
