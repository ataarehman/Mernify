import { forwardRef } from 'react'
import { ArrowRight } from 'lucide-react'
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

/**
 * The single primary action across the site: a light surface with a coloured
 * icon block that sweeps across on hover while the label rolls to a duplicate.
 *
 * - `variant` swaps the palette only; geometry and motion never change.
 * - `block` stretches to the container width.
 * - `icon` replaces the sliding arrow (e.g. a send glyph on a submit button).
 */
export const Button = forwardRef(function Button(
  {
    as = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    type,
    magnetic = false,
    block = false,
    icon,
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
    block ? styles.block : '',
    magnetic ? styles.magnetic : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const resolvedType = Tag === 'button' ? type || 'button' : type
  const ref = magnetic ? magneticRef : forwardedRef

  return (
    <Tag ref={ref} className={classes} type={resolvedType} data-cursor="interactive" {...props}>
      <span className={styles.inner}>
        <span className={styles.label}>
          <span className={styles.labelLine}>{children}</span>
          <span className={styles.labelLine} aria-hidden="true">
            {children}
          </span>
        </span>
        <span className={styles.icon} aria-hidden="true">
          {icon ?? (
            <span className={styles.iconTrack}>
              <ArrowRight strokeWidth={2.5} />
              <ArrowRight strokeWidth={2.5} />
            </span>
          )}
        </span>
      </span>
    </Tag>
  )
})
