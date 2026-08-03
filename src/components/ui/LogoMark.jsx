import { Link } from 'react-router-dom'
import styles from './LogoMark.module.css'

const LOGO_DARK = '/assets/images/logo/logo-black.svg'
const LOGO_LIGHT = '/assets/images/logo/logo-white.svg'

export function LogoMark({ inverted = false, compact = false, className = '' }) {
  return (
    <Link
      to="/"
      className={[styles.logo, compact ? styles.compact : '', className]
        .filter(Boolean)
        .join(' ')}
      aria-label="Mernify home"
    >
      <img
        src={inverted ? LOGO_LIGHT : LOGO_DARK}
        alt=""
        className={styles.mark}
        width={220}
        height={52}
      />
    </Link>
  )
}
