import styles from './ChatMessage.module.css'

// Simple markdown-to-safe-HTML for bold, lists, and line breaks.
// We never render raw AI HTML — only parse a limited set of patterns.
function renderContent(text) {
  const lines = text.split('\n')
  const result = []
  let listItems = []

  function flushList() {
    if (listItems.length) {
      result.push(
        <ul key={`list-${result.length}`} className={styles.list}>
          {listItems.map((li, i) => (
            <li key={i}>{parseLine(li)}</li>
          ))}
        </ul>,
      )
      listItems = []
    }
  }

  lines.forEach((line, i) => {
    const trimmed = line.trim()

    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      listItems.push(trimmed.slice(2))
      return
    }

    flushList()

    if (!trimmed) {
      if (i < lines.length - 1) result.push(<br key={`br-${i}`} />)
      return
    }

    result.push(
      <span key={`line-${i}`} className={styles.line}>
        {parseLine(trimmed)}
      </span>,
    )
  })

  flushList()
  return result
}

function parseLine(text) {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={[styles.wrap, isUser ? styles.user : styles.assistant].join(' ')}
      data-role={message.role}
    >
      {!isUser && (
        <div className={styles.avatar} aria-hidden="true">
          M
        </div>
      )}
      <div className={styles.bubble}>
        <div className={styles.content}>{renderContent(message.content)}</div>
        <time className={styles.time} dateTime={new Date(message.ts).toISOString()}>
          {new Date(message.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
    </div>
  )
}
