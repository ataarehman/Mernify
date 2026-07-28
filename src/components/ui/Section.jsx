import { forwardRef } from 'react'
import styles from './Section.module.css'

export const Section = forwardRef(function Section(
  {
    as = 'section',
    tone = 'light',
    density = 'default',
    className = '',
    children,
    id,
    headerTheme,
    ...props
  },
  ref,
) {
  const Tag = as
  const densityClass =
    density === 'compact' ? styles.compact : density === 'spacious' ? styles.spacious : ''
  const classes = [
    styles.section,
    tone === 'dark' ? styles.dark : styles.light,
    densityClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      ref={ref}
      id={id}
      className={classes}
      data-header-theme={headerTheme || (tone === 'dark' ? 'dark' : 'light')}
      {...props}
    >
      {children}
    </Tag>
  )
})
