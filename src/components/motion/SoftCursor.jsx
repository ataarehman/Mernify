import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './SoftCursor.module.css'

const BALL_SIZE = 5
const VIEW_SIZE = 140
const FOLLOW = 0.15

function canUseSoftCursor() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(pointer: fine)').matches &&
    window.matchMedia('(hover: hover)').matches &&
    !window.matchMedia('(max-width: 991px)').matches
  )
}

/**
 * Site-wide magic cursor ported from mernify-web `tw-cursor.js`.
 * Reads `[data-cursor]` labels already wired across the app.
 */
export function SoftCursor() {
  const rootRef = useRef(null)
  const ballRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !canUseSoftCursor()) return undefined

    const root = rootRef.current
    const ball = ballRef.current
    if (!root || !ball) return undefined

    document.documentElement.classList.add('mf-soft-cursor')
    document.body.classList.add('mf-soft-cursor')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { x: mouse.x, y: mouse.y }
    let viewEl = null
    let ticking = false
    let idleTimer = 0

    gsap.set(ball, {
      xPercent: -50,
      yPercent: -50,
      x: pos.x,
      y: pos.y,
      width: BALL_SIZE,
      height: BALL_SIZE,
      opacity: 1,
    })
    gsap.set(root, { autoAlpha: 1 })

    const onTick = () => {
      const dx = mouse.x - pos.x
      const dy = mouse.y - pos.y
      if (Math.abs(dx) < 0.08 && Math.abs(dy) < 0.08) {
        pos.x = mouse.x
        pos.y = mouse.y
        gsap.set(ball, { x: pos.x, y: pos.y })
        gsap.ticker.remove(onTick)
        ticking = false
        return
      }
      pos.x += dx * FOLLOW
      pos.y += dy * FOLLOW
      gsap.set(ball, { x: pos.x, y: pos.y })
    }

    const ensureTick = () => {
      if (ticking) return
      ticking = true
      gsap.ticker.add(onTick)
    }

    const onMove = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      ensureTick()
      gsap.to(root, { duration: 0.25, autoAlpha: 1, overwrite: 'auto' })
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        // Settle to the pointer and stop the ticker while idle.
        pos.x = mouse.x
        pos.y = mouse.y
        gsap.set(ball, { x: pos.x, y: pos.y })
        if (ticking) {
          gsap.ticker.remove(onTick)
          ticking = false
        }
      }, 140)
    }

    const resetBall = () => {
      ball.classList.remove(styles.withBlur)
      if (viewEl) {
        viewEl.remove()
        viewEl = null
      }
      gsap.to(ball, {
        duration: 0.3,
        yPercent: -50,
        width: BALL_SIZE,
        height: BALL_SIZE,
        scale: 1,
        opacity: 1,
        backgroundColor: '#ffffff',
        borderWidth: 0,
        backdropFilter: 'blur(0px)',
        boxShadow: 'none',
        overwrite: 'auto',
      })
    }

    const showView = (label) => {
      ball.classList.add(styles.withBlur)
      if (viewEl) viewEl.remove()
      viewEl = document.createElement('div')
      viewEl.className = styles.ballView
      viewEl.textContent = label
      ball.appendChild(viewEl)

      gsap.to(ball, {
        duration: 0.3,
        yPercent: -75,
        width: VIEW_SIZE,
        height: VIEW_SIZE,
        opacity: 1,
        backgroundColor: 'var(--mf-color-indigo)',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 8px 32px rgba(79, 70, 229, 0.35)',
        overwrite: 'auto',
      })
      gsap.fromTo(
        viewEl,
        { scale: 0, autoAlpha: 0 },
        { duration: 0.3, scale: 1, autoAlpha: 1, ease: 'power2.out' },
      )
    }

    // Ball hides here so the native pointer (or text caret) remains visible —
    // same idea as mernify-web hiding the ball on `a, button`.
    const isInteractive = (el) =>
      Boolean(
        el?.closest(
          [
            'a',
            'button',
            'label',
            'summary',
            'input',
            'textarea',
            'select',
            '[role="button"]',
            '[role="link"]',
            '[role="tab"]',
            '[role="menuitem"]',
            '[role="menuitemcheckbox"]',
            '[role="menuitemradio"]',
            '[role="option"]',
            '[role="radio"]',
            '[role="checkbox"]',
            '[role="switch"]',
            '[role="combobox"]',
            '[data-cursor="interactive"]',
            '.mf-hide-cursor',
          ].join(', '),
        ),
      )

    /** Expand only for intentional callouts (e.g. "View") — match mernify-web. */
    const isExpandLabel = (raw) => {
      const label = String(raw || '').trim().toLowerCase()
      if (!label) return false
      if (label === 'interactive' || label === 'hide' || label === 'none') return false
      return true
    }

    const getCursorHost = (el) => el?.closest('[data-cursor]')

    const onOver = (event) => {
      const target = event.target instanceof Element ? event.target : null
      if (!target) return

      const cursorHost = getCursorHost(target)
      if (cursorHost) {
        const label = cursorHost.getAttribute('data-cursor') || 'View'
        if (isExpandLabel(label)) {
          showView(label)
          return
        }
        // `data-cursor="interactive"` (and similar) → hide ball like a normal link
        gsap.to(ball, { duration: 0.25, scale: 0, opacity: 0, overwrite: 'auto' })
        return
      }

      if (isInteractive(target)) {
        gsap.to(ball, { duration: 0.25, scale: 0, opacity: 0, overwrite: 'auto' })
      }
    }

    const onOut = (event) => {
      const related = event.relatedTarget instanceof Element ? event.relatedTarget : null
      const target = event.target instanceof Element ? event.target : null
      if (!target) return

      const leavingExpand = (() => {
        const host = getCursorHost(target)
        if (!host) return false
        return isExpandLabel(host.getAttribute('data-cursor') || 'View')
      })()
      const enteringExpand = (() => {
        const host = getCursorHost(related)
        if (!host) return false
        return isExpandLabel(host.getAttribute('data-cursor') || 'View')
      })()

      if (leavingExpand && !enteringExpand) {
        resetBall()
        return
      }

      const leavingInteractive =
        isInteractive(target) ||
        (() => {
          const host = getCursorHost(target)
          return host && !isExpandLabel(host.getAttribute('data-cursor') || '')
        })()

      if (
        leavingInteractive &&
        (!related ||
          (!isInteractive(related) &&
            !(() => {
              const host = getCursorHost(related)
              return host && !isExpandLabel(host.getAttribute('data-cursor') || '')
            })()) ||
          enteringExpand)
      ) {
        if (!enteringExpand) {
          gsap.to(ball, {
            duration: 0.25,
            scale: 1,
            opacity: 1,
            overwrite: 'auto',
          })
        }
      }
    }

    const onLeaveDoc = () => {
      gsap.to(root, { duration: 0.25, autoAlpha: 0, overwrite: 'auto' })
    }

    const onEnterDoc = () => {
      gsap.to(root, { duration: 0.25, autoAlpha: 1, overwrite: 'auto' })
    }

    const onClick = (event) => {
      const target = event.target instanceof Element ? event.target : null
      if (!target) return
      const link = target.closest('a')
      if (!link) return
      if (link.target === '_blank') return
      const cursorAttr = link.getAttribute('data-cursor')
      if (cursorAttr && isExpandLabel(cursorAttr)) return
      const href = link.getAttribute('href') || ''
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
      gsap.to(ball, { duration: 0.25, scale: 1.3, autoAlpha: 0, overwrite: 'auto' })
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mouseleave', onLeaveDoc)
    document.addEventListener('mouseenter', onEnterDoc)
    document.addEventListener('click', onClick)
    ensureTick()

    const onVisibility = () => {
      if (document.hidden && ticking) {
        gsap.ticker.remove(onTick)
        ticking = false
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.documentElement.classList.remove('mf-soft-cursor')
      document.body.classList.remove('mf-soft-cursor')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeaveDoc)
      document.removeEventListener('mouseenter', onEnterDoc)
      document.removeEventListener('click', onClick)
      document.removeEventListener('visibilitychange', onVisibility)
      window.clearTimeout(idleTimer)
      if (ticking) gsap.ticker.remove(onTick)
      viewEl?.remove()
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div ref={rootRef} className={styles.root} id="magic-cursor" aria-hidden="true">
      <div ref={ballRef} className={styles.ball} id="ball" />
    </div>
  )
}
