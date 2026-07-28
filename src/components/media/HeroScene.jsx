import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import styles from './HeroScene.module.css'

/**
 * Three.js hero scene.
 * Geometry derived from the actual Mernify M-mark:
 *   modL — tall parallelogram (indigo), comes from bottom-left
 *   modC — flat diamond / chevron connector (gradient), drops from above
 *   modR — tall parallelogram (cyan, mirrored), comes from bottom-right
 * They assemble into the M, then four product-layer panels emerge.
 */
export function HeroScene({ reduced = false }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const W = mount.clientWidth || 560
    const H = mount.clientHeight || 520

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Scene / Camera ────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100)
    camera.position.set(0, 0, 7)

    // ── Lights ────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const key = new THREE.DirectionalLight(0x4f46e5, 2.5)
    key.position.set(3, 5, 4)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x15c6e2, 2)
    fill.position.set(-4, -3, 3)
    scene.add(fill)
    const rim = new THREE.DirectionalLight(0xffffff, 0.6)
    rim.position.set(0, -2, -3)
    scene.add(rim)

    // ── Logo geometry helpers ─────────────────────────────────────
    // Build a parallelogram prism for the left/right uprights.
    // shear: how much the top edge is offset from the bottom edge on x-axis.
    function makePillarGeo(w, h, d, shear) {
      const geo = new THREE.BufferGeometry()
      const hw = w / 2
      const hh = h / 2
      const hd = d / 2
      // 8 vertices of the sheared box
      const verts = new Float32Array([
        // front face (z = +hd)
        -hw + shear,  hh, hd,  // 0 top-left
         hw + shear,  hh, hd,  // 1 top-right
         hw - shear, -hh, hd,  // 2 bot-right
        -hw - shear, -hh, hd,  // 3 bot-left
        // back face (z = -hd)
        -hw + shear,  hh, -hd, // 4
         hw + shear,  hh, -hd, // 5
         hw - shear, -hh, -hd, // 6
        -hw - shear, -hh, -hd, // 7
      ])
      const idx = new Uint16Array([
        // front
        0,1,2, 0,2,3,
        // back
        5,4,7, 5,7,6,
        // top
        4,5,1, 4,1,0,
        // bottom
        3,2,6, 3,6,7,
        // left
        4,0,3, 4,3,7,
        // right
        1,5,6, 1,6,2,
      ])
      geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
      geo.setIndex(new THREE.BufferAttribute(idx, 1))
      geo.computeVertexNormals()
      return geo
    }

    // ── Materials ─────────────────────────────────────────────────
    const matL = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      metalness: 0.25,
      roughness: 0.45,
      transparent: true,
      opacity: 0,
    })
    const matR = new THREE.MeshStandardMaterial({
      color: 0x15c6e2,
      metalness: 0.25,
      roughness: 0.45,
      transparent: true,
      opacity: 0,
    })
    const matC = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.2,
      roughness: 0.5,
      transparent: true,
      opacity: 0,
    })
    const matPanel = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.1,
      roughness: 0.85,
      transparent: true,
      opacity: 0,
    })

    // ── Build logo pieces ─────────────────────────────────────────
    // Pillar dimensions: w=0.48, h=1.85, d=0.18, shear=0.12 (lean inward)
    const geoL = makePillarGeo(0.48, 1.85, 0.18, 0.12)   // leans right (+shear top)
    const geoR = makePillarGeo(0.48, 1.85, 0.18, -0.12)  // leans left (-shear top)
    const geoDiamond = new THREE.BoxGeometry(0.72, 0.72, 0.18)

    const modL = new THREE.Mesh(geoL, matL)
    const modR = new THREE.Mesh(geoR, matR)
    const modC = new THREE.Mesh(geoDiamond, matC)

    // Final assembled positions matching the M-mark
    // Pillars: x = ±0.88 from center, centered vertically
    // Diamond: centered (0,0), rotated 45° on Z, slightly raised
    const finalL = new THREE.Vector3(-0.88, 0, 0)
    const finalR = new THREE.Vector3(0.88, 0, 0)
    const finalC = new THREE.Vector3(0, -0.1, 0)

    // Start positions: flying in from off-screen
    modL.position.set(-4.5, -3, 0.5)
    modR.position.set(4.5, -3, 0.5)
    modC.position.set(0, 4, 0)
    modC.rotation.z = Math.PI / 4 // diamond already starts rotated

    scene.add(modL, modR, modC)

    // ── Product layer panels ──────────────────────────────────────
    const panelDefs = [
      { label: 'Web App',  idx: '01', pos: new THREE.Vector3(-2.5,  1.3, -0.4), ry: 0.22 },
      { label: 'Mobile',   idx: '02', pos: new THREE.Vector3( 2.5,  1.3, -0.4), ry: -0.22 },
      { label: 'AI Flow',  idx: '03', pos: new THREE.Vector3(-2.5, -1.3, -0.4), ry: 0.18 },
      { label: 'Cloud',    idx: '04', pos: new THREE.Vector3( 2.5, -1.3, -0.4), ry: -0.18 },
    ]

    const panelObjs = panelDefs.map(({ label, idx, pos, ry }) => {
      const mat = matPanel.clone()
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 1.02), mat)
      mesh.position.copy(pos)
      mesh.rotation.y = ry
      scene.add(mesh)

      // Edge lines
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x4f46e5, transparent: true, opacity: 0 })
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.65, 1.02)),
        edgeMat,
      )
      edges.position.copy(pos)
      edges.rotation.y = ry
      scene.add(edges)

      // Label canvas texture
      const c = document.createElement('canvas')
      c.width = 256; c.height = 158
      const ctx2 = c.getContext('2d')
      ctx2.fillStyle = 'rgba(15,23,42,0.9)'
      ctx2.fillRect(0, 0, 256, 158)
      ctx2.strokeStyle = 'rgba(79,70,229,0.5)'
      ctx2.lineWidth = 1.5
      ctx2.strokeRect(1, 1, 254, 156)
      // indigo accent bar at top
      ctx2.fillStyle = '#4f46e5'
      ctx2.fillRect(0, 0, 256, 3)
      ctx2.fillStyle = '#15c6e2'
      ctx2.font = '700 12px Inter, sans-serif'
      ctx2.fillText(idx, 14, 24)
      ctx2.fillStyle = '#f8fafc'
      ctx2.font = '600 17px Space Grotesk, sans-serif'
      ctx2.fillText(label, 14, 52)
      ctx2.fillStyle = 'rgba(248,250,252,0.38)'
      ctx2.font = '400 11px Inter, sans-serif'
      ctx2.fillText('Product layer', 14, 74)
      // Decorative progress bar
      ctx2.fillStyle = 'rgba(79,70,229,0.18)'
      ctx2.fillRect(14, 94, 200, 4)
      ctx2.fillStyle = 'rgba(79,70,229,0.7)'
      ctx2.fillRect(14, 94, [140, 180, 110, 160][panelDefs.indexOf(panelDefs.find(d => d.label === label))], 4)

      const tex = new THREE.CanvasTexture(c)
      const lblMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0 })
      const lbl = new THREE.Mesh(new THREE.PlaneGeometry(1.62, 0.99), lblMat)
      lbl.position.copy(pos)
      lbl.position.z += 0.005
      lbl.rotation.y = ry
      scene.add(lbl)

      return { mesh, edges, mat, edgeMat, lbl, lblMat }
    })

    // ── Connection lines from center to panels ─────────────────────
    const connMat = new THREE.LineBasicMaterial({ color: 0x4f46e5, transparent: true, opacity: 0 })
    const connPts = []
    panelDefs.forEach(({ pos }) => { connPts.push(0, 0, 0, pos.x, pos.y, pos.z) })
    const connGeo = new THREE.BufferGeometry()
    connGeo.setAttribute('position', new THREE.Float32BufferAttribute(connPts, 3))
    const connLines = new THREE.LineSegments(connGeo, connMat)
    scene.add(connLines)

    // ── Assembly timeline ─────────────────────────────────────────
    const tl = gsap.timeline({ delay: reduced ? 0 : 0.1 })
    const dur = reduced ? 0.01 : 1

    // Phase 1: pillars fly in + materialize (staggered)
    tl.to(modL.position, { x: finalL.x, y: finalL.y, z: finalL.z, duration: dur * 0.85, ease: 'power3.out' }, 0)
    tl.to(matL, { opacity: 0.9, duration: dur * 0.5 }, 0)

    tl.to(modR.position, { x: finalR.x, y: finalR.y, z: finalR.z, duration: dur * 0.85, ease: 'power3.out' }, 0.09)
    tl.to(matR, { opacity: 0.9, duration: dur * 0.5 }, 0.09)

    // Phase 2: diamond drops and locks in
    tl.to(modC.position, { x: finalC.x, y: finalC.y, z: finalC.z, duration: dur * 0.7, ease: 'back.out(1.4)' }, 0.55)
    tl.to(matC, { opacity: 0.85, duration: dur * 0.45 }, 0.55)

    // Phase 3: panels emerge
    const pBase = reduced ? 0 : 1.2
    panelObjs.forEach(({ mat, edgeMat, lblMat }, i) => {
      tl.to(mat, { opacity: 0.78, duration: dur * 0.55 }, pBase + i * 0.1)
      tl.to(edgeMat, { opacity: 0.55, duration: dur * 0.4 }, pBase + i * 0.1)
      tl.to(lblMat, { opacity: 1, duration: dur * 0.45 }, pBase + i * 0.12)
    })
    tl.to(connMat, { opacity: 0.22, duration: dur * 0.4 }, pBase + 0.45)

    // ── Ambient rotation ──────────────────────────────────────────
    if (!reduced) {
      gsap.to(scene.rotation, { y: 0.05, duration: 9, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    }

    // ── Render loop ───────────────────────────────────────────────
    let raf
    let active = true
    const clock = new THREE.Clock()

    function tick() {
      if (!active) return
      raf = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()
      // Subtle breathing on assembled state
      if (tl.progress() > 0.4) {
        modL.rotation.y = Math.sin(t * 0.35) * 0.04
        modR.rotation.y = Math.sin(t * 0.35 + 0.5) * 0.04
        modC.rotation.z = Math.PI / 4 + Math.sin(t * 0.28) * 0.02
      }
      renderer.render(scene, camera)
    }
    tick()

    const onVis = () => { active = !document.hidden; if (active) tick() }
    document.addEventListener('visibilitychange', onVis)

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth
      const h = mount.clientHeight || 520
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(mount)

    return () => {
      active = false
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
      ro.disconnect()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [reduced])

  return <div ref={mountRef} className={styles.scene} aria-hidden="true" />
}
