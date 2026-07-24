import { useMagnetic } from '@/hooks/useMagnetic'

export function Magnetic({
  as = 'div',
  strength = 0.32,
  radius = 90,
  className = '',
  children,
  ...props
}) {
  const ref = useMagnetic(strength, radius)
  const Tag = as

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}
