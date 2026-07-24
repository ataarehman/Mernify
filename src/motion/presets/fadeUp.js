/**
 * Standard fade-up enter values for ScrollTrigger / timelines.
 */
export const fadeUp = {
  from: { autoAlpha: 0, y: 24 },
  to: { autoAlpha: 1, y: 0, duration: 0.55 },
}

export function applyFadeUp(targets, vars = {}) {
  return {
    ...fadeUp.from,
    ...vars.from,
    ...fadeUp.to,
    ...vars.to,
  }
}
