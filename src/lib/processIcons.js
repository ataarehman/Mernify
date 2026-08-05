import {
  ClipboardList,
  Code2,
  Compass,
  FlaskConical,
  PenTool,
  Rocket,
  TrendingUp,
} from 'lucide-react'

/** Icon per delivery stage. Shared so every process surface reads the same. */
export const PROCESS_ICONS = {
  discover: Compass,
  plan: ClipboardList,
  design: PenTool,
  develop: Code2,
  test: FlaskConical,
  launch: Rocket,
  improve: TrendingUp,
}

export function getProcessIcon(id) {
  return PROCESS_ICONS[id] || Compass
}
