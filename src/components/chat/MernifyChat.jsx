/**
 * MernifyChat — top-level chat widget entry point.
 * Lazy-loaded by RootLayout so it doesn't block initial render.
 * Only mounts when CHAT_ENABLED feature flag is true.
 */
import { ChatProvider } from './ChatProvider'
import { ChatLauncher } from './ChatLauncher'
import { ChatPanel } from './ChatPanel'

export function MernifyChat() {
  return (
    <ChatProvider>
      <ChatLauncher />
      <ChatPanel />
    </ChatProvider>
  )
}
