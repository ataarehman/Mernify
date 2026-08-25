import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './BlogArticleBody.module.css'

const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\)/g

/**
 * Turn `[label](/path)` and `[label](https://…)` into React link nodes.
 */
export function renderRichText(text) {
  if (text == null || text === '') return null
  const source = String(text)
  const nodes = []
  let lastIndex = 0
  let match
  let key = 0

  LINK_RE.lastIndex = 0
  while ((match = LINK_RE.exec(source)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={`t-${key++}`}>{source.slice(lastIndex, match.index)}</Fragment>,
      )
    }

    const label = match[1]
    const href = match[2]
    const isInternal = href.startsWith('/') && !href.startsWith('//')

    if (isInternal) {
      nodes.push(
        <Link key={`l-${key++}`} to={href} className={styles.inlineLink}>
          {label}
        </Link>,
      )
    } else {
      nodes.push(
        <a
          key={`a-${key++}`}
          href={href}
          className={styles.inlineLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>,
      )
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < source.length) {
    nodes.push(<Fragment key={`t-${key++}`}>{source.slice(lastIndex)}</Fragment>)
  }

  return nodes.length ? nodes : source
}

function FigureBlock({ section, priority = false }) {
  const srcSet = section.src?.includes('-body.webp')
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
                {renderRichText(section.text)}
              </p>
            )
          case 'ul':
            return (
              <ul key={key} className={styles.list}>
                {section.items?.map((item) => (
                  <li key={item.slice(0, 48)}>{renderRichText(item)}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={key} className={styles.listOrdered}>
                {section.items?.map((item) => (
                  <li key={item.slice(0, 48)}>{renderRichText(item)}</li>
                ))}
              </ol>
            )
          case 'callout':
            return (
              <aside key={key} className={styles.callout} aria-label="Key takeaway">
                <p>
                  <span className={styles.takeaway}>Takeaway</span>
                  {renderRichText(section.text)}
                </p>
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
