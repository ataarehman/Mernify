import { Button } from '@/components/ui'
import { resolveCalendlyUrl } from '@/lib/env'

/**
 * Demo-call CTA. Uses Calendly when VITE_CALENDLY_URL is set;
 * otherwise falls back to the contact page with discovery intent.
 */
export function BookCallCta({
  variant = 'primary',
  size = 'md',
  className = '',
  label = 'Schedule Meeting',
  block = false,
  magnetic = false,
}) {
  const calendly = resolveCalendlyUrl()
  const href = calendly || '/contact?intent=discovery'
  const external = Boolean(calendly)

  return (
    <Button
      as="a"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      variant={variant}
      size={size}
      block={block}
      magnetic={magnetic}
      className={className}
      data-booking={external ? 'calendly' : 'contact'}
    >
      {label}
    </Button>
  )
}
