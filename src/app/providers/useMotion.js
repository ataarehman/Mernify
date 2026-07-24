import { useContext } from 'react'
import { MotionContext } from './motionContext'

export function useMotion() {
  return useContext(MotionContext)
}
