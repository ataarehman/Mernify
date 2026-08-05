import { useChat } from './useChat'
import styles from './QuickActions.module.css'

export function QuickActions() {
  const { quickActions, sendQuickAction, showQuickActions, isLoading } = useChat()

  if (!showQuickActions) return null

  return (
    <div className={styles.wrap} aria-label="Quick action suggestions">
      <p className={styles.hint}>Quick start:</p>
      <div className={styles.grid}>
        {quickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={styles.chip}
            onClick={() => sendQuickAction(action)}
            disabled={isLoading}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}
