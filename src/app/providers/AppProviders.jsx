import { ReducedMotionProvider } from './ReducedMotionProvider'
import { MotionProvider } from './MotionProvider'

export function AppProviders({ children }) {
  return (
    <ReducedMotionProvider>
      <MotionProvider>{children}</MotionProvider>
    </ReducedMotionProvider>
  )
}
