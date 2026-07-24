import styles from './Stack.module.css'

const GAP = {
  1: styles.gap1,
  2: styles.gap2,
  3: styles.gap3,
  4: styles.gap4,
  5: styles.gap5,
  6: styles.gap6,
  7: styles.gap7,
  8: styles.gap8,
}

export function Stack({ gap = 4, className = '', children, as = 'div', ...props }) {
  const Tag = as
  const classes = [styles.stack, GAP[gap] || GAP[4], className].filter(Boolean).join(' ')
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
