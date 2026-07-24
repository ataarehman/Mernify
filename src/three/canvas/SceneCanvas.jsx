import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { useWebGLSupport } from '@/three/hooks/useWebGLSupport'
import { disposeObject } from '@/three/utils/disposeObject'
import styles from './SceneCanvas.module.css'

/**
 * Foundation WebGL host.
 * Pass `createScene({ THREE, renderer, scene, camera, canvas }) -> { onFrame, onResize, destroy }`.
 * Phase 1 ships infrastructure only — no Hero scene until approved.
 */
export function SceneCanvas({
  className,
  createScene,
  dprCap = 1.75,
  enabled = true,
}) {
  const canvasRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const webglSupported = useWebGLSupport()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !enabled || prefersReducedMotion || !webglSupported || !createScene) {
      return undefined
    }

    let cancelled = false
    let renderer
    let scene
    let camera
    let frameId = 0
    let sceneApi
    let observer
    let isIntersecting = true
    let isDocumentVisible = document.visibilityState === 'visible'

    const onVisibility = () => {
      isDocumentVisible = document.visibilityState === 'visible'
    }

    const resize = () => {
      if (!renderer || !camera || !canvas) return
      const width = canvas.clientWidth
      const height = Math.max(canvas.clientHeight, 1)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap))
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      sceneApi?.onResize?.({ width, height })
    }

    const tick = (time) => {
      frameId = window.requestAnimationFrame(tick)
      if (!isIntersecting || !isDocumentVisible || !renderer || !scene || !camera) return
      sceneApi?.onFrame?.(time)
      renderer.render(scene, camera)
    }

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', resize)

    ;(async () => {
      const THREE = await import('three')
      if (cancelled) return

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'default',
      })
      renderer.setClearColor(0x000000, 0)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.z = 3

      sceneApi = createScene({ THREE, renderer, scene, camera, canvas }) || {}
      resize()

      observer = new IntersectionObserver(
        ([entry]) => {
          isIntersecting = entry.isIntersecting
        },
        { threshold: 0.05 },
      )
      observer.observe(canvas)

      frameId = window.requestAnimationFrame(tick)
    })()

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', resize)
      if (frameId) window.cancelAnimationFrame(frameId)
      observer?.disconnect()
      sceneApi?.destroy?.()
      if (scene) disposeObject(scene)
      renderer?.dispose()
    }
  }, [createScene, dprCap, enabled, prefersReducedMotion, webglSupported])

  return (
    <canvas
      ref={canvasRef}
      className={[styles.canvas, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    />
  )
}
