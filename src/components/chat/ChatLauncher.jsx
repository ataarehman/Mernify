import { useEffect, useRef } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { useChat } from './ChatProvider'
import { chatAnalytics } from '@/lib/chat/chatAnalytics'
import styles from './ChatLauncher.module.css'

export function ChatLauncher() {
  const { isOpen, toggle } = useChat()
  const observed = useRef(false)

  useEffect(() => {
    if (!observed.current) {
      observed.current = true
      chatAnalytics.launcherViewed()
    }
  }, [])

  return (
    <button
      type="button"
      className={[styles.launcher, isOpen ? styles.open : ''].filter(Boolean).join(' ')}
      onClick={toggle}
      aria-label={isOpen ? 'Close Mernify AI chat' : 'Open Mernify AI chat'}
      aria-expanded={isOpen}
      aria-controls="mernify-chat-panel"
    >
      <span className={styles.iconWrap} aria-hidden="true">
        {isOpen ? <X size={22} strokeWidth={2} /> : <MessageCircle size={22} strokeWidth={2} />}
      </span>
      {!isOpen && <span className={styles.label}>Mernify AI</span>}
      {!isOpen && <span className={styles.pulse} aria-hidden="true" />}
    </button>
  )
}
