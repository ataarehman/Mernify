export async function onRequestPost({ request }) {
  const body = await request.text()
  const res = await fetch('https://mernify.co/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })

  const data = await res.text()
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  })
}
