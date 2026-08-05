import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { readConsent, writeConsent } from '@/lib/consent'
import styles from './CookieConsent.module.css'

/**
 * Lightweight consent banner (GDPR/PECR). Analytics scripts must wait for analytics: true.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!readConsent())
  }, [])

  if (!visible) return null

  function acceptAll() {
    writeConsent({ analytics: true, marketing: true })
    setVisible(false)
  }

  function essentialOnly() {
    writeConsent({ analytics: false, marketing: false })
    setVisible(false)
  }

  return (
    <div className={styles.banner} role="dialog" aria-labelledby="mf-consent-title" aria-live="polite">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p id="mf-consent-title" className={styles.title}>
            Cookies &amp; privacy
          </p>
          <p className={styles.text}>
            We use essential cookies to run this site. Optional analytics help us improve the
            experience. See our <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
        <div className={styles.actions}>
          <Button type="button" variant="ghost" size="sm" onClick={essentialOnly}>
            Essential only
          </Button>
          <Button type="button" size="sm" onClick={acceptAll}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  )
}
