/**
 * Contact form submission interface.
 *
 * Production: set VITE_CONTACT_ENDPOINT to a form backend URL that accepts JSON POST.
 * Development fallback: opens a mailto draft so nothing pretends to be a live API.
 *
 * Expected endpoint contract:
 * POST { name, email, company, service, budget, message, timeline?, consent: true }
 * → 2xx on success
 */
export async function submitContactForm(payload) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      const text = await response.text().catch(() => '')
      throw new Error(text || `Request failed (${response.status})`)
    }
    return { mode: 'endpoint' }
  }

  const subject = encodeURIComponent(`Mernify inquiry — ${payload.company || payload.name}`)
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company || '—'}`,
      `Service interest: ${payload.service || '—'}`,
      `Budget: ${payload.budget || '—'}`,
      `Timeline: ${payload.timeline || '—'}`,
      '',
      payload.message,
    ].join('\n'),
  )
  const mailto = `mailto:hello@mernify.com?subject=${subject}&body=${body}`
  window.location.href = mailto
  return { mode: 'mailto' }
}
