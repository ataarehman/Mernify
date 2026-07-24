import { useContext } from 'react'
import { ReducedMotionContext } from './reducedMotionContext'

export function useReducedMotion() {
  return useContext(ReducedMotionContext)
}
