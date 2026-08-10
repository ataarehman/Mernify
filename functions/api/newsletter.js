import {
  parseContactBody,
  sanitize,
  sendContactEmail,
  validateContactPayload,
} from '../_lib/contactMail.js'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

/**
 * POST /api/newsletter
 * Uses the same mail microservice as /api/contact (EMAIL_SECRET).
 * Never fakes success.
 */
export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const email = sanitize(body.email, 160)
  const website = sanitize(body.website || body.company_url, 200)
  if (website) return json({ ok: true })

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email' }, 400)
  }

  const fields = parseContactBody({
    name: 'Newsletter subscriber',
    email,
    message: `Newsletter signup from the website.\n\nPlease add ${email} to Mernify updates / mailing list.`,
    consent: true,
    source: 'newsletter',
    page: sanitize(body.page, 200),
    website: '',
  })

  const check = validateContactPayload(fields)
  if (check.error) return json({ error: check.error }, check.status)

  const result = await sendContactEmail(fields, env)
  if (!result.ok) return json({ error: result.error }, result.status)
  return json({ ok: true, provider: result.provider })
}
