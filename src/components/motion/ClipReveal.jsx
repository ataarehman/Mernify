import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { whenPageEntranceReady } from '@/components/motion/pageEntrance'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ClipReveal.module.css'

gsap.registerPlugin(ScrollTrigger)

const INITIAL_CLIPS = [
  'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)',
  'polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)',
  'polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)',
  'polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)',
  'polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)',
  'polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)',
  'polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)',
  'polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)',
  'polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)',
]

const FINAL_CLIPS = [
  'polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)',
  'polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)',
  'polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)',
  'polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)',
  'polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)',
  'polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)',
  'polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)',
  'polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)',
  'polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)',
]

const ORDER = [[0], [1, 3], [2, 4, 6], [5, 7], [8]]

function useSimpleReveal() {
  const [simple, setSimple] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(max-width: 900px)').matches
    )
  })

  useLayoutEffect(() => {
    const mq = window.matchMedia('(pointer: coarse), (max-width: 900px)')
    const sync = () => setSimple(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return simple
}

/** Skip large hero media on constrained connections. */
function useSkipHeavyVideo(enabled) {
  const [skip, setSkip] = useState(false)

  useLayoutEffect(() => {
    if (!enabled) return undefined
    const connection = navigator.connection
    if (!connection) return undefined

    const sync = () => {
      const type = connection.effectiveType
      setSkip(Boolean(connection.saveData || type === 'slow-2g' || type === '2g'))
    }
    sync()
    connection.addEventListener?.('change', sync)
    return () => connection.removeEventListener?.('change', sync)
  }, [enabled])

  return skip
}

function playTileTimeline(masks) {
  const tl = gsap.timeline()
  ORDER.forEach((indices, step) => {
    const targets = indices.map((i) => masks[i]).filter(Boolean)
    if (!targets.length) return
    tl.to(
      targets,
      {
        clipPath: (_j, el) => FINAL_CLIPS[masks.indexOf(el)],
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1,
      },
      step * 0.125,
    )
  })
  return tl
}

function clearMaskWillChange(masks) {
  masks.forEach((mask) => {
    mask.style.willChange = 'auto'
  })
}

function hideMasks(masks) {
  gsap.to(masks, {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.out',
    onComplete: () => {
      masks.forEach((mask) => {
        mask.style.visibility = 'hidden'
        mask.style.willChange = 'auto'
      })
    },
  })
}

function tryPlay(video) {
  if (!video || video.dataset.failed === '1') return
  video.muted = true
  video.playsInline = true
  const play = video.play()
  if (play?.catch) play.catch(() => {})
}

/**
 * Attach src only when we intentionally start media — keeps the MP4 off the critical path.
 */
function armVideo(video, videoSrc) {
  if (!video || !videoSrc || video.dataset.failed === '1') return
  if (video.dataset.armed === '1') {
    tryPlay(video)
    return
  }
  video.dataset.armed = '1'
  video.preload = 'auto'
  video.src = videoSrc
  tryPlay(video)
}

/**
 * Fade video in only after a real frame is playing. Poster stays underneath — no flicker.
 * On failure, keep the poster and hide the video layer.
 */
function revealWhenReady(video, masks, { preferMasks = true } = {}) {
  if (!video) return () => {}

  let done = false
  let timer

  const finishOk = () => {
    if (done || video.dataset.failed === '1') return
    done = true
    video.dataset.live = '1'
    gsap.to(video, { opacity: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
    if (preferMasks && masks?.length) hideMasks(masks)
  }

  const finishFail = () => {
    if (done) return
    done = true
    video.dataset.failed = '1'
    video.dataset.live = '0'
    gsap.set(video, { opacity: 0 })
    try {
      video.removeAttribute('src')
      video.load()
    } catch {
      // ignore
    }
    if (masks?.length) clearMaskWillChange(masks)
  }

  if (video.error) {
    finishFail()
    return () => {}
  }

  const onPlaying = () => finishOk()
  const onError = () => finishFail()
  const onEnded = () => {
    // Keep looping even if the `loop` attribute is ignored by a browser quirk.
    if (video.dataset.failed === '1') return
    try {
      video.currentTime = 0
    } catch {
      // ignore
    }
    tryPlay(video)
  }

  video.addEventListener('playing', onPlaying)
  video.addEventListener('error', onError)
  video.addEventListener('ended', onEnded)

  if (!video.paused && video.readyState >= 2) finishOk()
  else timer = window.setTimeout(() => {
    if (!video.paused && video.readyState >= 2) finishOk()
  }, 5000)

  return () => {
    done = true
    window.clearTimeout(timer)
    video.removeEventListener('playing', onPlaying)
    video.removeEventListener('error', onError)
    video.removeEventListener('ended', onEnded)
  }
}

/**
 * Pause decode work while off-screen / hidden; resume without seeking so the loop feels continuous.
 */
function bindVideoLifecycle(video, root) {
  if (!video || !root) return () => {}

  let inView = true

  const sync = () => {
    if (video.dataset.armed !== '1' || video.dataset.failed === '1') return
    if (document.hidden || !inView) {
      video.pause()
      return
    }
    tryPlay(video)
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      inView = Boolean(entry?.isIntersecting)
      sync()
    },
    { rootMargin: '15% 0px', threshold: 0.05 },
  )
  io.observe(root)

  document.addEventListener('visibilitychange', sync)

  return () => {
    io.disconnect()
    document.removeEventListener('visibilitychange', sync)
  }
}

/**
 * Template-style 9-tile clip reveal on desktop.
 * Falls back to a single fade on touch / smaller viewports for scroll perf.
 * `immediate` waits for page entrance then plays without scroll gating (hero).
 * Optional `videoSrc` keeps the tile reveal (poster via `src`) then hands off to a looping video.
 */
export function ClipReveal({
  src,
  videoSrc,
  alt = '',
  className = '',
  rounded = true,
  start = 'top 75%',
  immediate = false,
  loading = 'lazy',
  fetchPriority,
  width,
  height,
  srcSet,
  sizes,
}) {
  const rootRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const simple = useSimpleReveal()
  const skipVideo = useSkipHeavyVideo(Boolean(videoSrc))
  const hasVideo = Boolean(videoSrc) && !skipVideo

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !src) return undefined

    const source = root.querySelector('[data-clip-source]')
    const cleanups = []

    if (hasVideo && source) {
      cleanups.push(bindVideoLifecycle(source, root))
    }

    if (prefersReducedMotion || simple) {
      if (source && !hasVideo) {
        gsap.set(source, { opacity: 1 })
      }
      if (hasVideo && source) {
        gsap.set(source, { opacity: 0 })
      }

      if (!prefersReducedMotion && simple && source) {
        let ctx
        const cleanupReady = whenPageEntranceReady(() => {
          if (hasVideo) {
            armVideo(source, videoSrc)
            cleanups.push(revealWhenReady(source, [], { preferMasks: false }))
          }
          ctx = gsap.context(() => {
            const target = hasVideo ? source : source
            if (immediate) {
              if (!hasVideo) {
                gsap.fromTo(
                  target,
                  { opacity: 0, scale: 1.04 },
                  { opacity: 1, scale: 1, duration: 0.85, ease: 'power2.out' },
                )
              }
              return
            }
            if (!hasVideo) {
              gsap.fromTo(
                target,
                { opacity: 0, scale: 1.04 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.85,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: root,
                    start,
                    once: true,
                    invalidateOnRefresh: true,
                  },
                },
              )
            } else {
              ScrollTrigger.create({
                trigger: root,
                start,
                once: true,
                onEnter: () => armVideo(source, videoSrc),
              })
            }
          }, root)
        })
        cleanups.push(() => {
          cleanupReady()
          ctx?.revert()
        })
        return () => cleanups.forEach((fn) => fn?.())
      }

      if (hasVideo && prefersReducedMotion) {
        armVideo(source, videoSrc)
        cleanups.push(revealWhenReady(source, [], { preferMasks: false }))
      }
      return () => cleanups.forEach((fn) => fn?.())
    }

    const masks = Array.from(root.querySelectorAll('[data-clip-mask]'))
    let ctx

    const cleanupReady = whenPageEntranceReady(() => {
      ctx = gsap.context(() => {
        gsap.set(masks, { clipPath: (i) => INITIAL_CLIPS[i], opacity: 1 })
        if (hasVideo && source) gsap.set(source, { opacity: 0 })

        if (immediate) {
          if (hasVideo) armVideo(source, videoSrc)
          const tl = playTileTimeline(masks)
          tl.eventCallback('onComplete', () => {
            clearMaskWillChange(masks)
            if (hasVideo) {
              cleanups.push(revealWhenReady(source, masks))
            }
          })
          return
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start,
            once: true,
            invalidateOnRefresh: true,
            onEnter: () => {
              if (hasVideo) armVideo(source, videoSrc)
            },
          },
        })

        ORDER.forEach((indices, step) => {
          const targets = indices.map((i) => masks[i]).filter(Boolean)
          if (!targets.length) return
          tl.to(
            targets,
            {
              clipPath: (_j, el) => FINAL_CLIPS[masks.indexOf(el)],
              duration: 1,
              ease: 'power4.out',
              stagger: 0.1,
            },
            step * 0.125,
          )
        })

        tl.eventCallback('onComplete', () => {
          clearMaskWillChange(masks)
          if (hasVideo) cleanups.push(revealWhenReady(source, masks))
        })
      }, root)
    })

    cleanups.push(() => {
      cleanupReady()
      ctx?.revert()
    })

    return () => cleanups.forEach((fn) => fn?.())
  }, [src, videoSrc, hasVideo, start, prefersReducedMotion, simple, immediate])

  const posterLoading = immediate ? 'eager' : loading
  const posterPriority = immediate ? 'high' : fetchPriority

  return (
    <div
      ref={rootRef}
      className={[
        styles.root,
        rounded ? styles.rounded : '',
        simple ? styles.simple : '',
        hasVideo ? styles.hasVideo : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {hasVideo ? (
        <>
          <img
            className={styles.poster}
            src={src}
            alt=""
            aria-hidden="true"
            loading={posterLoading}
            decoding="async"
            draggable={false}
            {...(width ? { width } : {})}
            {...(height ? { height } : {})}
            {...(srcSet ? { srcSet } : {})}
            {...(sizes ? { sizes } : {})}
            {...(posterPriority ? { fetchPriority: posterPriority } : {})}
          />
          <video
            data-clip-source
            className={styles.source}
            poster={src}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            aria-label={alt}
            {...(width ? { width } : {})}
            {...(height ? { height } : {})}
          />
        </>
      ) : (
        <img
          data-clip-source
          className={styles.source}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          {...(width ? { width } : {})}
          {...(height ? { height } : {})}
          {...(srcSet ? { srcSet } : {})}
          {...(sizes ? { sizes } : {})}
          {...(fetchPriority ? { fetchPriority } : {})}
        />
      )}
      {!simple &&
        Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            data-clip-mask
            className={styles.mask}
            style={{ backgroundImage: `url(${src})` }}
            aria-hidden="true"
          />
        ))}
    </div>
  )
}
