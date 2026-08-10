import { useCallback, useState } from 'react'
import { Check, Link2, X } from 'lucide-react'
import { SITE } from '@/constants/site'
import styles from './BlogShare.module.css'

function LinkedInGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.75V21h3.19V8.5zM5.34 3C4.22 3 3.3 3.93 3.3 5.06c0 1.12.9 2.05 2.06 2.05h.02c1.14 0 2.05-.93 2.05-2.05C7.41 3.93 6.5 3 5.34 3zM20.25 21h-3.18v-6.52c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43V21H9.24V8.5h3.05v1.71h.04c.42-.8 1.46-1.65 3-1.65 3.21 0 3.8 2.11 3.8 4.86V21z" />
    </svg>
  )
}

export function BlogShare({ title, path }) {
  const [copied, setCopied] = useState(false)
  const url = `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }, [url])

  return (
    <div className={styles.share}>
      <p className={styles.label}>Share</p>
      <div className={styles.actions}>
        <a
          className={styles.btn}
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
        >
          <X size={16} aria-hidden="true" />
          <span>X</span>
        </a>
        <a
          className={styles.btn}
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <LinkedInGlyph />
          <span>LinkedIn</span>
        </a>
        <button type="button" className={styles.btn} onClick={copyLink} aria-label="Copy link">
          {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  )
}
