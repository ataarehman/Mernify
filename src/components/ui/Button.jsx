import { forwardRef } from 'react'
import styles from './Button.module.css'
import { useMagnetic } from '@/hooks/useMagnetic'

const VARIANT_CLASS = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  inverse: styles.inverse,
}

const SIZE_CLASS = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
}

export const Button = forwardRef(function Button(
  {
    as = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    type,
    magnetic = false,
    children,
    ...props
  },
  forwardedRef,
) {
  const magneticRef = useMagnetic(0.28, 100)
  const Tag = as
  const classes = [
    styles.button,
    VARIANT_CLASS[variant] || VARIANT_CLASS.primary,
    SIZE_CLASS[size] || SIZE_CLASS.md,
    magnetic ? styles.magnetic : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const resolvedType = Tag === 'button' ? type || 'button' : type
  const ref = magnetic ? magneticRef : forwardedRef

  return (
    <Tag ref={ref} className={classes} type={resolvedType} data-cursor="interactive" {...props}>
      <span className={styles.label}>{children}</span>
    </Tag>
  )
})
