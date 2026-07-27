import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ProductDashboard.module.css'

/**
 * Decorative product UI composition — ops console + mobile companion.
 * aria-hidden; labels are mock chrome only (not claimed metrics).
 */
export function ProductDashboard() {
  const rootRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-dash-float]',
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.35 },
      )

      // Cap continuous motion: ~12s then settle (ui-agent production gate).
      const parallax = gsap.to('[data-dash-parallax]', {
        y: -10,
        duration: 4.5,
        yoyo: true,
        repeat: 2,
        ease: 'sine.inOut',
        stagger: 0.4,
      })
      gsap.delayedCall(12, () => {
        parallax.kill()
        gsap.to('[data-dash-parallax]', { y: 0, duration: 0.6, ease: 'power2.out' })
      })

      gsap.fromTo(
        '[data-dash-bar]',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: 1.1,
          stagger: 0.08,
          delay: 0.7,
          ease: 'power2.out',
        },
      )
    }, root)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <div ref={rootRef} className={styles.stage} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.grid} />

      <div className={styles.desktop} data-dash-float data-dash-parallax>
        <div className={styles.titlebar}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.title}>Mernify Ops — Product Console</span>
        </div>
        <div className={styles.desktopBody}>
          <aside className={styles.sidebar}>
            <div className={styles.brandRow}>
              <span className={styles.mark} />
              <span>Ops Cloud</span>
            </div>
            <ul>
              <li className={styles.active}>Overview</li>
              <li>Customers</li>
              <li>Releases</li>
              <li>Automation</li>
              <li>Insights</li>
            </ul>
          </aside>
          <div className={styles.main}>
            <header className={styles.mainHead}>
              <div>
                <p className={styles.kicker}>Product workspace</p>
                <p className={styles.heading}>Release readiness</p>
              </div>
              <div className={styles.pill}>Staging · healthy</div>
            </header>
            <div className={styles.cards}>
              <article className={styles.metric}>
                <span>Activation</span>
                <strong>On track</strong>
                <div className={styles.barTrack}>
                  <span className={`${styles.barFill} ${styles.wHigh}`} data-dash-bar />
                </div>
              </article>
              <article className={styles.metric}>
                <span>Deploy cadence</span>
                <strong>Steady</strong>
                <div className={styles.barTrack}>
                  <span className={`${styles.barFill} ${styles.wMid}`} data-dash-bar />
                </div>
              </article>
              <article className={styles.metric}>
                <span>Quality gate</span>
                <strong>Clear</strong>
                <div className={styles.barTrack}>
                  <span className={`${styles.barFillAlt} ${styles.wLow}`} data-dash-bar />
                </div>
              </article>
            </div>
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <span>Delivery board</span>
                <span>This sprint</span>
              </div>
              <div className={styles.rows}>
                {[
                  ['Auth hardening', 'In review', styles.wHigh],
                  ['Billing webhooks', 'Building', styles.wMid],
                  ['Admin roles', 'Ready', styles.wFull],
                  ['Mobile sync', 'Queued', styles.wLow],
                ].map(([name, state, widthClass]) => (
                  <div key={name} className={styles.row}>
                    <div>
                      <strong>{name}</strong>
                      <span>{state}</span>
                    </div>
                    <div className={styles.miniTrack}>
                      <span className={widthClass} data-dash-bar />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobile} data-dash-float data-dash-parallax>
        <div className={styles.notch} />
        <div className={styles.mobileInner}>
          <p className={styles.mobileEyebrow}>Field status</p>
          <p className={styles.mobileTitle}>Today’s routes</p>
          <div className={styles.mobileCard}>
            <strong>Active day</strong>
            <span>Priority queue</span>
          </div>
          <ul className={styles.mobileList}>
            <li>
              <span>Harbor Clinic</span>
              <em>On site</em>
            </li>
            <li>
              <span>Riverside Depot</span>
              <em>En route</em>
            </li>
            <li>
              <span>North Gate</span>
              <em>Queued</em>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
