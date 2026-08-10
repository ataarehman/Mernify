/** Shared contact / inquiry form rules — keep in sync with functions/_lib/contactMail.js */

export const MESSAGE_MIN = 20
export const MESSAGE_MAX = 5000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value) {
  return EMAIL_RE.test(String(value ?? '').trim())
}

export function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? '').trim())
}

export function isDateOnOrAfter(iso, minIso) {
  if (!isIsoDate(iso) || !isIsoDate(minIso)) return false
  return iso >= minIso
}

export function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * @param {object} values
 * @param {{ requireService?: boolean, requireTimeline?: boolean, minTimeline?: string }} [opts]
 */
export function validateContactFields(values, opts = {}) {
  const errors = {}
  const name = String(values.name ?? '').trim()
  const email = String(values.email ?? '').trim()
  const message = String(values.message ?? '').trim()
  const timeline = String(values.timeline ?? '').trim()
  const minTimeline = opts.minTimeline || todayISO()

  if (!name) errors.name = 'Enter your name.'
  else if (name.length < 2) errors.name = 'Enter at least 2 characters for your name.'

  if (!email) errors.email = 'Enter your business email.'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.'

  if (opts.requireService && !String(values.service ?? '').trim()) {
    errors.service = 'Select a service interest.'
  }

  if (timeline) {
    if (!isIsoDate(timeline)) errors.timeline = 'Pick a valid target date.'
    else if (!isDateOnOrAfter(timeline, minTimeline)) {
      errors.timeline = 'Choose today or a future date.'
    }
  } else if (opts.requireTimeline) {
    errors.timeline = 'Pick a target start date.'
  }

  if (!message) {
    errors.message = `Describe your project (at least ${MESSAGE_MIN} characters).`
  } else if (message.length < MESSAGE_MIN) {
    errors.message = `Add a bit more detail — at least ${MESSAGE_MIN} characters (currently ${message.length}).`
  } else if (message.length > MESSAGE_MAX) {
    errors.message = `Keep your message under ${MESSAGE_MAX} characters.`
  }

  if (!values.consent) errors.consent = 'Consent is required to contact you.'

  return errors
}

export function messageHint() {
  return `Minimum ${MESSAGE_MIN} characters · Maximum ${MESSAGE_MAX} characters`
}
