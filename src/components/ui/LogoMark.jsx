import { Link } from 'react-router-dom'
import styles from './LogoMark.module.css'

/**
 * Intrinsic sizes are the encoded asset dimensions divided by 4 (the assets are
 * generated at 4x by scripts/build-logo-assets.mjs). Declaring them keeps the
 * header from reflowing while the wordmark loads — the two variants have
 * slightly different canvases, so each carries its own ratio.
 */
const LOGO_DARK = { src: '/assets/images/logo/logo-black.webp', width: 148, height: 52 }
const LOGO_LIGHT = { src: '/assets/images/logo/logo-white.webp', width: 142, height: 52 }

export function LogoMark({ inverted = false, compact = false, className = '' }) {
  const logo = inverted ? LOGO_LIGHT : LOGO_DARK

  return (
    <Link
      to="/"
      className={[styles.logo, compact ? styles.compact : '', className]
        .filter(Boolean)
        .join(' ')}
      aria-label="Mernify home"
    >
      <img
        src={logo.src}
        alt=""
        className={styles.mark}
        width={logo.width}
        height={logo.height}
        decoding="async"
        fetchPriority="high"
      />
    </Link>
  )
}
