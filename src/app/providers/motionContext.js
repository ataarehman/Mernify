import { createContext } from 'react'

export const MotionContext = createContext({
  lenis: null,
  scrollTo: () => {},
})
