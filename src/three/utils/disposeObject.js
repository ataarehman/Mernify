/**
 * Dispose Three.js object graphs safely.
 */
export function disposeObject(root) {
  if (!root) return

  root.traverse((node) => {
    if (node.geometry) {
      node.geometry.dispose()
    }

    if (node.material) {
      const materials = Array.isArray(node.material) ? node.material : [node.material]
      materials.forEach((material) => {
        Object.values(material).forEach((value) => {
          if (value && typeof value === 'object' && 'minFilter' in value) {
            value.dispose?.()
          }
        })
        material.dispose?.()
      })
    }
  })
}
