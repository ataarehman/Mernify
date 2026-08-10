/**
 * Non-secret readiness check for contact delivery (mail microservice).
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function readEnvFile(path) {
  if (!existsSync(path)) return {}
  const out = {}
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const i = trimmed.indexOf('=')
    if (i <= 0) continue
    out[trimmed.slice(0, i).trim()] = trimmed.slice(i + 1).trim()
  }
  return out
}

const root = resolve(process.cwd())
const env = { ...readEnvFile(resolve(root, '.env')), ...readEnvFile(resolve(root, '.env.local')) }

const secret = env.EMAIL_SECRET || ''
const url = env.EMAIL_SERVICE_URL || 'https://mernify.co/api/email'

const checks = [
  {
    ok: Boolean(secret) && secret.length >= 16,
    label: 'Root .env EMAIL_SECRET',
    hint: 'Set EMAIL_SECRET to the mail microservice shared secret',
  },
  {
    ok: Boolean(url),
    label: 'EMAIL_SERVICE_URL',
    hint: 'Default https://mernify.co/api/email',
  },
  {
    ok: existsSync(resolve(root, 'functions/api/contact.js')),
    label: 'functions/api/contact.js',
    hint: 'Must deploy with the site (kills fake ok proxy)',
  },
]

let failed = 0
console.log('Contact readiness (secrets not printed)\n')
for (const c of checks) {
  console.log(`${c.ok ? 'OK  ' : 'NEED'}  ${c.label}`)
  if (!c.ok) {
    console.log(`      → ${c.hint}`)
    failed += 1
  }
}
try {
  console.log(`\nEMAIL_SERVICE_URL host: ${new URL(url).origin}`)
} catch {
  console.log('\nEMAIL_SERVICE_URL: (invalid)')
}
console.log(
  failed
    ? `\n${failed} item(s) still needed.`
    : '\nLocal config ready. Submit the form or POST /api/contact.',
)
process.exit(failed ? 1 : 0)
