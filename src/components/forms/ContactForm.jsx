import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Field, TextInput, TextArea, SelectInput } from '@/components/forms/Field'
import { budgetRanges, serviceInterests } from '@/content/pages'
import { submitContactForm } from '@/lib/submitContactForm'
import styles from './ContactForm.module.css'

const initial = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
  consent: false,
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Enter your name.'
  if (!values.email.trim()) errors.email = 'Enter your business email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.service) errors.service = 'Select a service interest.'
  if (!values.message.trim() || values.message.trim().length < 20) {
    errors.message = 'Describe the project in at least a few sentences.'
  }
  if (!values.consent) errors.consent = 'Consent is required to contact you.'
  return errors
}

export function ContactForm({ defaultService = '', defaultIntent = '' }) {
  const [values, setValues] = useState(() => ({
    ...initial,
    service: defaultService,
    message: defaultIntent === 'discovery' ? 'I would like to schedule a discovery call about: ' : '',
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const canSubmit = useMemo(() => status !== 'loading', [status])

  function onChange(event) {
    const { name, type, checked, value } = event.target
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('error')
      setStatusMessage('Please fix the highlighted fields.')
      return
    }

    setStatus('loading')
    setStatusMessage('Sending…')
    try {
      const result = await submitContactForm({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        service: values.service,
        budget: values.budget,
        timeline: values.timeline.trim(),
        message: values.message.trim(),
        consent: true,
      })
      setStatus('success')
      setStatusMessage(
        result.mode === 'mailto'
          ? 'Opening your email client with a draft message. If nothing opens, email hello@mernify.com directly.'
          : 'Thanks — your message was sent. We will reply soon.',
      )
      setValues(initial)
      setErrors({})
    } catch (err) {
      setStatus('error')
      setStatusMessage(err?.message || 'Something went wrong. Please email hello@mernify.com.')
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.grid}>
        <Field id="name" label="Name" required error={errors.name}>
          <TextInput
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={onChange}
            invalid={Boolean(errors.name)}
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
          />
        </Field>
        <Field id="company" label="Company" error={errors.company}>
          <TextInput
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={onChange}
          />
        </Field>
        <Field id="service" label="Service interest" required error={errors.service}>
          <SelectInput
            id="service"
            name="service"
            value={values.service}
            onChange={onChange}
            invalid={Boolean(errors.service)}
          >
            <option value="">Select…</option>
            {serviceInterests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field id="budget" label="Budget range" error={errors.budget}>
          <SelectInput id="budget" name="budget" value={values.budget} onChange={onChange}>
            <option value="">Select…</option>
            {budgetRanges.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field id="timeline" label="Optional timeline" hint="When do you hope to start or launch?">
          <TextInput
            id="timeline"
            name="timeline"
            value={values.timeline}
            onChange={onChange}
            placeholder="e.g. discovery this month, MVP in Q4"
          />
        </Field>
      </div>

      <Field id="message" label="Project description" required error={errors.message}>
        <TextArea
          id="message"
          name="message"
          value={values.message}
          onChange={onChange}
          invalid={Boolean(errors.message)}
          placeholder="Goals, users, current state, and what success looks like."
        />
      </Field>

      <label className={styles.consent}>
        <input
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={onChange}
          aria-invalid={errors.consent ? 'true' : undefined}
        />
        <span>
          I agree to be contacted about this inquiry. See the{' '}
          <Link to="/privacy">Privacy Policy</Link>.
        </span>
      </label>
      {errors.consent ? (
        <p className={styles.consentError} role="alert">
          {errors.consent}
        </p>
      ) : null}

      <div className={styles.actions}>
        <Button type="submit" size="lg" disabled={!canSubmit}>
          {status === 'loading' ? 'Sending…' : 'Send message'}
        </Button>
      </div>

      <div
        className={styles.status}
        role="status"
        aria-live="polite"
        data-state={status}
      >
        {statusMessage}
      </div>
    </form>
  )
}
