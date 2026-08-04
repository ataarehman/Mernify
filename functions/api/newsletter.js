export async function onRequestPost({ request, env }) {
  const upstream = (env.EMAIL_SERVICE_URL || 'https://mernify.co/api/newsletter')
    .replace(/^﻿/, '').trim()
    .replace(/\/contact$/, '/newsletter')

  const body = await request.text()
  const res = await fetch(upstream, {
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
