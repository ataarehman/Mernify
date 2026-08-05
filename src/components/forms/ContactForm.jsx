import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Field, TextInput, TextArea, SelectInput } from '@/components/forms/Field'
import { BookCallCta } from '@/components/cta/BookCallCta'
import { serviceInterests } from '@/content/pages'
import { SITE } from '@/constants/site'
import { submitContactForm } from '@/lib/submitContactForm'
import styles from './ContactForm.module.css'

const initial = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
  consent: false,
  website: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Enter your name.'
  if (!values.email.trim()) errors.email = 'Enter your business email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.message.trim() || values.message.trim().length < 20) {
    errors.message = 'Share a bit more detail — at least a few sentences.'
  }
  if (!values.consent) errors.consent = 'Consent is required to contact you.'
  return errors
}

export function ContactForm({ defaultService = '', defaultIntent = '' }) {
  const [values, setValues] = useState(() => ({
    ...initial,
    service: defaultService,
    message:
      defaultIntent === 'discovery' ? 'I would like to schedule a discovery call about: ' : '',
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const canSubmit = useMemo(() => status !== 'loading', [status])

  function onChange(event) {
    const { name, type, checked, value } = event.target
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  async function onSubmit(event) {
    event.preventDefault()

    // Honeypot — bots only
    if (values.website?.trim()) {
      setStatus('success')
      setStatusMessage(`Thanks — your message was sent. ${SITE.responseSla}`)
      setValues(initial)
      setErrors({})
      return
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('error')
      setStatusMessage('Please fix the highlighted fields.')
      return
    }

    setStatus('loading')
    setStatusMessage('Sending your message...')
    try {
      const result = await submitContactForm({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        service: values.service,
        budget: '',
        timeline: '',
        message: values.message.trim(),
        consent: true,
      })
      setStatus('success')
      if (result.mode === 'mailto') {
        setStatusMessage(
          `Opening your email client with a draft. If nothing opens, email ${SITE.email} directly. ${SITE.responseSla}`,
        )
      } else {
        setStatusMessage(
          `Thanks — your message was sent. ${SITE.responseSla} Next: we review context and reply with clarifying questions or a discovery-call invite.`,
        )
      }
      setValues(initial)
      setErrors({})
    } catch (err) {
      setStatus('error')
      setStatusMessage(
        err?.name === 'AbortError'
          ? `The request timed out. Please try again or email ${SITE.email}.`
          : err?.message || `Something went wrong. Please email ${SITE.email}.`,
      )
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successPanel} role="status" aria-live="polite">
        <p className={styles.successEyebrow}>Received</p>
        <p className={styles.successTitle}>Message sent</p>
        <p className={styles.successText}>{statusMessage}</p>
        <div className={styles.successActions}>
          <Button type="button" variant="inverse" size="md" onClick={() => setStatus('idle')}>
            Send another message
          </Button>
          <BookCallCta variant="secondary" size="md" label="Schedule Meeting" />
        </div>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="mf-hp">Leave blank</label>
        <input
          id="mf-hp"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={onChange}
        />
      </div>

      <div className={styles.grid}>
        <Field id="name" label="Name" required error={errors.name}>
          <TextInput
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={onChange}
            invalid={Boolean(errors.name)}
            maxLength={120}
            disabled={status === 'loading'}
            placeholder="Your name"
          />
        </Field>
        <Field id="email" label="Business email" required error={errors.email}>
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange}
            invalid={Boolean(errors.email)}
            maxLength={160}
            disabled={status === 'loading'}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <div className={styles.grid}>
        <Field id="company" label="Company" error={errors.company}>
          <TextInput
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={onChange}
            maxLength={160}
            disabled={status === 'loading'}
            placeholder="Company or product name"
          />
        </Field>
        <Field id="service" label="Service interest" error={errors.service}>
          <SelectInput
            id="service"
            name="service"
            value={values.service}
            onChange={onChange}
            invalid={Boolean(errors.service)}
            disabled={status === 'loading'}
          >
            <option value="">Select (optional)</option>
            {serviceInterests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>

      <Field id="message" label="How can we help?" required error={errors.message}>
        <TextArea
          id="message"
          name="message"
          value={values.message}
          onChange={onChange}
          invalid={Boolean(errors.message)}
          placeholder="Goals, current state, users, and what a useful next step looks like."
          maxLength={5000}
          disabled={status === 'loading'}
        />
      </Field>

      <label className={styles.consent} htmlFor="consent">
        <input
          id="consent"
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={onChange}
          aria-invalid={errors.consent ? 'true' : undefined}
          disabled={status === 'loading'}
        />
        <span>
          I agree to be contacted about this inquiry. See the <Link to="/privacy">Privacy Policy</Link>
          .
        </span>
      </label>
      {errors.consent ? (
        <p className={styles.consentError} role="alert">
          {errors.consent}
        </p>
      ) : null}

      <div className={styles.actions}>
        <Button type="submit" variant="inverse" size="md" disabled={!canSubmit} aria-busy={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send message'}
        </Button>
        <BookCallCta variant="secondary" size="md" label="Schedule Meeting" />
      </div>

      <div className={styles.status} role="status" aria-live="polite" data-state={status}>
        {statusMessage}
      </div>
    </form>
  )
}
