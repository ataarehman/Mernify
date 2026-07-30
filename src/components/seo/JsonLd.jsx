import { useEffect } from 'react'

/**
 * Injects JSON-LD structured data into document head.
 * Replaces any previous script with the same id when data changes.
 */
export function JsonLd({ id = 'mf-jsonld', data }) {
  useEffect(() => {
    if (!data) return undefined

    const scriptId = id
    let el = document.getElementById(scriptId)
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = scriptId
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(data)

    return () => {
      el?.remove()
    }
  }, [id, data])

  return null
}
