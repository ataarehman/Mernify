import { Link } from 'react-router-dom'
import styles from './BlogArticleBody.module.css'

function FigureBlock({ section, priority = false }) {
  const srcSet =
    section.src?.includes('-body.webp')
      ? `${section.src.replace('-body.webp', '-body-md.webp')} 1000w, ${section.src} 2000w`
      : undefined

  return (
    <figure className={styles.figure}>
      <img
        src={section.src}
        srcSet={srcSet}
        sizes="(max-width: 1099px) 100vw, min(52rem, 62vw)"
        alt={section.alt || ''}
        width={2000}
        height={1250}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {section.caption ? <figcaption>{section.caption}</figcaption> : null}
    </figure>
  )
}

/**
 * Renders structured blog sections into semantic article HTML.
 */
export function BlogArticleBody({ sections }) {
  if (!sections?.length) return null

  return (
    <div className={styles.body}>
      {sections.map((section, index) => {
        const key = `${section.type}-${section.id || index}`

        switch (section.type) {
          case 'h2':
            return (
              <h2 key={key} id={section.id} className={styles.h2}>
                {section.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={key} id={section.id} className={styles.h3}>
                {section.text}
              </h3>
            )
          case 'p':
            return (
              <p key={key} className={styles.p}>
                {section.text}
              </p>
            )
          case 'ul':
            return (
              <ul key={key} className={styles.list}>
                {section.items?.map((item) => (
                  <li key={item.slice(0, 48)}>{item}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={key} className={styles.listOrdered}>
                {section.items?.map((item) => (
                  <li key={item.slice(0, 48)}>{item}</li>
                ))}
              </ol>
            )
          case 'callout':
            return (
              <aside key={key} className={styles.callout} aria-label="Key takeaway">
                <p>{section.text}</p>
              </aside>
            )
          case 'figure':
            return <FigureBlock key={key} section={section} />
          default:
            return null
        }
      })}
    </div>
  )
}

export function BlogInlineLink({ to, children }) {
  return (
    <Link to={to} className={styles.inlineLink}>
      {children}
    </Link>
  )
}
