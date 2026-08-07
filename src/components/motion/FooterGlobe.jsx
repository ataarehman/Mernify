import styles from './FooterGlobe.module.css'

/**
 * Soft wireframe globe — CSS/SVG only, paused under reduced motion / coarse pointers.
 */
export function FooterGlobe() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.glow} />
      <svg className={styles.globe} viewBox="0 0 320 320" fill="none">
        <defs>
          <radialGradient id="fg-sphere" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(21, 198, 226, 0.22)" />
            <stop offset="45%" stopColor="rgba(79, 70, 229, 0.12)" />
            <stop offset="100%" stopColor="rgba(2, 6, 23, 0)" />
          </radialGradient>
          <linearGradient id="fg-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(21, 198, 226, 0.55)" />
            <stop offset="50%" stopColor="rgba(248, 250, 252, 0.18)" />
            <stop offset="100%" stopColor="rgba(79, 70, 229, 0.5)" />
          </linearGradient>
        </defs>

        <circle cx="160" cy="160" r="118" fill="url(#fg-sphere)" />
        <circle cx="160" cy="160" r="118" stroke="url(#fg-ring)" strokeWidth="1.2" opacity="0.7" />

        <g className={styles.spin}>
          <ellipse
            cx="160"
            cy="160"
            rx="118"
            ry="42"
            stroke="rgba(21, 198, 226, 0.35)"
            strokeWidth="1"
          />
          <ellipse
            cx="160"
            cy="160"
            rx="118"
            ry="78"
            stroke="rgba(248, 250, 252, 0.12)"
            strokeWidth="1"
          />
          <ellipse
            cx="160"
            cy="160"
            rx="42"
            ry="118"
            stroke="rgba(79, 70, 229, 0.35)"
            strokeWidth="1"
          />
          <ellipse
            cx="160"
            cy="160"
            rx="78"
            ry="118"
            stroke="rgba(248, 250, 252, 0.12)"
            strokeWidth="1"
          />
          <line
            x1="42"
            y1="160"
            x2="278"
            y2="160"
            stroke="rgba(248, 250, 252, 0.16)"
            strokeWidth="1"
          />
          <line
            x1="160"
            y1="42"
            x2="160"
            y2="278"
            stroke="rgba(248, 250, 252, 0.12)"
            strokeWidth="1"
          />
        </g>

        <circle cx="160" cy="160" r="4" fill="rgba(21, 198, 226, 0.85)" />
        <circle
          className={styles.pulse}
          cx="160"
          cy="160"
          r="10"
          stroke="rgba(21, 198, 226, 0.45)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  )
}
