import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui'
import { Field, TextInput, TextArea, SelectInput, CharCount } from '@/components/forms/Field'
import { BookCallCta } from '@/components/cta/BookCallCta'
import { serviceInterests } from '@/content/pages'
import { SITE } from '@/constants/site'
import { MESSAGE_MAX, MESSAGE_MIN, validateContactFields } from '@/lib/contactValidation'
import { submitContactForm } from '@/lib/submitContactForm'
import styles from './ContactForm.module.css'

const initial = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
  consent: false,
  // Obscure honeypot name — do NOT use "website" (browsers autofill it and
  // previously caused a fake success with no /api/contact call).
  mfTrap: '',
}

export function ContactForm({ defaultService = '', defaultIntent = '', defaultEmail = '' }) {
  const [values, setValues] = useState(() => ({
    ...initial,
    service: defaultService,
    email: defaultEmail,
    message:
      defaultIntent === 'discovery' ? 'I would like to schedule a discovery call about: ' : '',
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const submittingRef = useRef(false)

  const loading = status === 'loading'
  const canSubmit = useMemo(() => !loading, [loading])

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
    if (status === 'error') {
      setStatus('idle')
      setStatusMessage('')
    }
  }

  function focusFirstError(nextErrors) {
    const order = ['name', 'email', 'message', 'consent']
    const key = order.find((k) => nextErrors[k])
    if (!key) return
    document.getElementById(key)?.focus?.()
  }

  async function onSubmit(event) {
    event.preventDefault()
    if (submittingRef.current || loading) return

    // Same order as Home InquiryStepperForm: validate → honeypot → API
    const nextErrors = validateContactFields(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('error')
      setStatusMessage('Please fix the highlighted fields.')
      focusFirstError(nextErrors)
      return
    }

    // Honeypot — bots only (silent success, no API call)
    if (values.mfTrap?.trim()) {
      setStatus('success')
      setStatusMessage(`Thanks — your message was sent. ${SITE.responseSla}`)
      return
    }

    submittingRef.current = true
    setStatus('loading')
    setStatusMessage('Sending your message…')
    try {
      // Same delivery helper + payload shape as the working Home form
      await submitContactForm({
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
      setStatusMessage(
        `Thank you! Your request was submitted successfully. ${SITE.responseSla} We’ll reply with clarifying questions or a discovery-call invite.`,
      )
      setValues({
        ...initial,
        service: defaultService,
        message:
          defaultIntent === 'discovery' ? 'I would like to schedule a discovery call about: ' : '',
      })
      setErrors({})
    } catch (err) {
      setStatus('error')
      setStatusMessage(
        err?.name === 'AbortError'
          ? `The request timed out. Please try again or email ${SITE.email}.`
          : err?.message || `Something went wrong. Please try again or email ${SITE.email}.`,
      )
    } finally {
      submittingRef.current = false
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successPanel} role="status" aria-live="polite">
        <div className={styles.successBadge} aria-hidden="true">
          <Check size={22} strokeWidth={2.5} />
        </div>
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
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-busy={loading}>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="mf-hp">Leave blank</label>
        <input
          id="mf-hp"
          name="mfTrap"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-1p-ignore="true"
          data-form-type="other"
          value={values.mfTrap}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
          maxLength={MESSAGE_MAX}
          disabled={loading}
        />
        <CharCount value={values.message} min={MESSAGE_MIN} max={MESSAGE_MAX} />
      </Field>

      <label className={styles.consent} htmlFor="consent">
        <input
          id="consent"
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={onChange}
          aria-invalid={errors.consent ? 'true' : undefined}
          disabled={loading}
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
        <Button
          type="submit"
          variant="inverse"
          size="md"
          disabled={!canSubmit}
          aria-busy={loading}
        >
          {loading ? 'Sending…' : 'Send message'}
        </Button>
        <BookCallCta variant="secondary" size="md" label="Schedule Meeting" />
      </div>

      <div className={styles.status} role="status" aria-live="polite" data-state={status}>
        {statusMessage}
      </div>
    </form>
  )
}
