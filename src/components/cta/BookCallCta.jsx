import { Video } from 'lucide-react'
import { Button } from '@/components/ui'
import { resolveCalendlyUrl } from '@/lib/env'
import styles from './BookCallCta.module.css'

/**
 * Demo-call CTA. Uses Calendly when VITE_CALENDLY_URL is set;
 * otherwise falls back to the contact page with discovery intent.
 */
export function BookCallCta({
  variant = 'primary',
  size = 'lg',
  className = '',
  label = 'Book a Demo Call',
  showIcon = true,
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
      magnetic={magnetic}
      className={[styles.cta, className].filter(Boolean).join(' ')}
      data-booking={external ? 'calendly' : 'contact'}
    >
      <span className={styles.content}>
        {showIcon ? (
          <span className={styles.icon} aria-hidden="true">
            <Video size={18} strokeWidth={2.25} />
          </span>
        ) : null}
        <span className={styles.text}>{label}</span>
      </span>
    </Button>
  )
}
