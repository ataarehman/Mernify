import styles from './HeroModulesFallback.module.css'

/**
 * CSS/SVG fallback for the hero visual.
 * Draws the actual Mernify M-mark geometry:
 *   - Left pillar (parallelogram, indigo)
 *   - Center diamond (rotated square, gradient)
 *   - Right pillar (parallelogram, cyan)
 * Then four product-layer panels in the corners.
 */
export function HeroModulesFallback() {
  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.glow} />

      {/* ── M-mark SVG ── */}
      <div className={styles.mark}>
        <svg
          viewBox="0 0 200 200"
          className={styles.markSvg}
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="mf-grad-l" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="mf-grad-c" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="mf-grad-r" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id="mf-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Left pillar: parallelogram leaning right */}
          <polygon
            points="58,22 76,18 80,158 62,162"
            fill="url(#mf-grad-l)"
            opacity="0.92"
            filter="url(#mf-glow)"
            className={styles.modAnim}
          />

          {/* Right pillar: parallelogram leaning left (mirror) */}
          <polygon
            points="124,18 142,22 138,162 120,158"
            fill="url(#mf-grad-r)"
            opacity="0.92"
            filter="url(#mf-glow)"
            className={`${styles.modAnim} ${styles.modAnimDelay2}`}
          />

          {/* Center diamond: rotated square connector */}
          <rect
            x="86" y="86"
            width="28" height="28"
            rx="3"
            fill="url(#mf-grad-c)"
            opacity="0.9"
            transform="rotate(45 100 100)"
            filter="url(#mf-glow)"
            className={`${styles.modAnim} ${styles.modAnimDelay1}`}
          />
        </svg>
      </div>

      {/* ── Product panels ── */}
      <div className={styles.panels}>
        {[
          { label: 'Web App',  idx: '01', pos: 'tl' },
          { label: 'Mobile',   idx: '02', pos: 'tr' },
          { label: 'AI Flow',  idx: '03', pos: 'bl' },
          { label: 'Cloud',    idx: '04', pos: 'br' },
        ].map(({ label, idx, pos }) => (
          <div key={label} className={`${styles.panel} ${styles[pos]}`}>
            <span className={styles.panelBar} />
            <span className={styles.panelIdx}>{idx}</span>
            <span className={styles.panelLabel}>{label}</span>
            <span className={styles.panelSub}>Product layer</span>
          </div>
        ))}
      </div>

      {/* ── Connection lines ── */}
      <svg className={styles.connections} viewBox="0 0 560 480" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <g stroke="#4f46e5" strokeWidth="0.8" fill="none" opacity="0.2" strokeDasharray="4 5">
          <line x1="280" y1="240" x2="82" y2="100" />
          <line x1="280" y1="240" x2="478" y2="100" />
          <line x1="280" y1="240" x2="82" y2="380" />
          <line x1="280" y1="240" x2="478" y2="380" />
        </g>
        <g fill="#06b6d4" opacity="0.5">
          <circle cx="82"  cy="100" r="2.5" />
          <circle cx="478" cy="100" r="2.5" />
          <circle cx="82"  cy="380" r="2.5" />
          <circle cx="478" cy="380" r="2.5" />
        </g>
      </svg>
    </div>
  )
}
