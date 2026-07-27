import { useId } from 'react'
import { Link } from 'react-router-dom'
import styles from './LogoMark.module.css'

export function LogoMark({ inverted = false, compact = false, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const gradientId = `mfLogoGradient-${inverted ? 'inv' : 'std'}-${uid}`

  return (
    <Link
      to="/"
      className={[styles.logo, inverted ? styles.inverted : '', className].filter(Boolean).join(' ')}
      aria-label="Mernify home"
    >
      <span className={styles.mark} aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id={gradientId}
              x1="9"
              y1="10"
              x2="29"
              y2="30"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="10" className={styles.markBg} />
          <path
            d="M9 30V10h5.1l3.2 11.4L20.5 10H25.6L28.5 30h-4.1l-1.7-10.4L20.1 30h-2.9l-2.5-10.4L13.1 30H9z"
            fill={`url(#${gradientId})`}
          />
        </svg>
      </span>
      {!compact && <span className={styles.wordmark}>Mernify</span>}
    </Link>
  )
}
