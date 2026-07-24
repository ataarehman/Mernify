/**
 * Modular atmospheric field for HomeHero.
 * Indigo/cyan light on midnight void — signature, not a gadget demo.
 */
export function createHeroAtmosphere({ THREE, scene, camera }) {
  camera.fov = 42
  camera.position.set(0.15, 0.1, 4.6)
  camera.lookAt(-0.35, 0.05, 0)
  camera.updateProjectionMatrix()

  const root = new THREE.Group()
  scene.add(root)

  const ambient = new THREE.AmbientLight(0x0b1220, 1.1)
  const key = new THREE.PointLight(0x4f46e5, 22, 14, 2)
  key.position.set(-2.4, 1.6, 2.4)
  const fill = new THREE.PointLight(0x06b6d4, 14, 12, 2)
  fill.position.set(2.6, -1.0, 1.8)
  const rim = new THREE.DirectionalLight(0x93c5fd, 0.55)
  rim.position.set(0, 2.5, -3)
  scene.add(ambient, key, fill, rim)

  const modules = []
  const geo = new THREE.PlaneGeometry(1.05, 1.45, 1, 1)

  const panels = [
    { x: -1.55, y: 0.4, z: -0.55, rx: -0.28, ry: 0.22, color: 0x141c2e, opacity: 0.78 },
    { x: -0.25, y: 0.05, z: 0.15, rx: 0.1, ry: -0.08, color: 0x101826, opacity: 0.7 },
    { x: 1.2, y: -0.15, z: -0.25, rx: 0.22, ry: 0.18, color: 0x182338, opacity: 0.74 },
    { x: 0.15, y: 1.05, z: -1.15, rx: -0.42, ry: 0.12, color: 0x0f172a, opacity: 0.62 },
    { x: -0.95, y: -0.95, z: -0.85, rx: 0.18, ry: -0.2, color: 0x152036, opacity: 0.66 },
    { x: 1.55, y: 0.85, z: -0.95, rx: -0.15, ry: -0.28, color: 0x111827, opacity: 0.55 },
  ]

  panels.forEach((panel, index) => {
    const mat = new THREE.MeshStandardMaterial({
      color: panel.color,
      metalness: 0.62,
      roughness: 0.28,
      transparent: true,
      opacity: panel.opacity,
      side: THREE.DoubleSide,
      emissive: index % 2 === 0 ? 0x4f46e5 : 0x06b6d4,
      emissiveIntensity: 0.045,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(panel.x, panel.y, panel.z)
    mesh.rotation.set(panel.rx, panel.ry, index % 2 === 0 ? 0.06 : -0.05)
    root.add(mesh)
    modules.push({ mesh, base: mesh.position.clone(), phase: index * 0.85 })
  })

  const nodeGeo = new THREE.SphereGeometry(0.028, 16, 16)
  const nodeMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.85,
    metalness: 0.2,
    roughness: 0.25,
  })

  const nodePositions = [
    [-1.2, 0.55, 0.05],
    [-0.4, 0.2, 0.35],
    [0.55, -0.05, 0.15],
    [1.15, -0.35, -0.05],
    [0.1, 0.75, -0.4],
    [-0.7, -0.55, -0.2],
    [0.85, 0.45, -0.55],
    [-1.45, -0.15, -0.35],
  ]

  const nodes = nodePositions.map(([x, y, z], index) => {
    const node = new THREE.Mesh(nodeGeo, nodeMat.clone())
    node.position.set(x, y, z)
    node.material.emissiveIntensity = 0.55 + (index % 3) * 0.12
    root.add(node)
    return { node, base: node.position.clone(), phase: index * 0.7 }
  })

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.25, 0.55, 0.05),
    new THREE.Vector3(-0.4, 0.2, 0.35),
    new THREE.Vector3(0.55, -0.05, 0.15),
    new THREE.Vector3(1.15, -0.35, -0.05),
  ])
  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 64, 0.006, 8, false),
    new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.45,
    }),
  )
  root.add(tube)

  let pointer = { x: 0, y: 0 }
  let scrollProgress = 0
  const onPointer = (event) => {
    pointer = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: (event.clientY / window.innerHeight) * 2 - 1,
    }
  }
  window.addEventListener('pointermove', onPointer)

  return {
    onFrame(time) {
      const t = time * 0.001
      root.rotation.y = pointer.x * 0.07 + t * 0.035
      root.rotation.x = -pointer.y * 0.045 + 0.1
      root.position.z = scrollProgress * -0.42
      root.position.y = scrollProgress * -0.12

      modules.forEach((item, index) => {
        item.mesh.position.y = item.base.y + Math.sin(t * 0.65 + item.phase) * 0.07
        item.mesh.rotation.z = Math.sin(t * 0.3 + index) * 0.035
      })

      nodes.forEach((item, index) => {
        item.node.position.y = item.base.y + Math.sin(t * 0.9 + item.phase) * 0.045
        item.node.material.emissiveIntensity = 0.55 + Math.sin(t * 1.2 + index) * 0.2
      })

      key.intensity = 20 + Math.sin(t * 0.55) * 2.2
      fill.intensity = 12 + Math.cos(t * 0.45) * 1.6
      tube.material.opacity = 0.35 + Math.sin(t * 0.8) * 0.08
    },
    setScrollProgress(value) {
      scrollProgress = value
    },
    destroy() {
      window.removeEventListener('pointermove', onPointer)
      geo.dispose()
      nodeGeo.dispose()
      tube.geometry.dispose()
      tube.material.dispose()
      nodeMat.dispose()
      modules.forEach(({ mesh }) => mesh.material.dispose())
      nodes.forEach(({ node }) => node.material.dispose())
      scene.remove(root, ambient, key, fill, rim)
    },
  }
}
