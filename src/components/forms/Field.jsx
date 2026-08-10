import { Children, cloneElement, isValidElement } from 'react'
import styles from './Field.module.css'

function withA11y(node, { id, describedBy, required }) {
  if (!isValidElement(node)) return node

  if (node.props.id === id) {
    return cloneElement(node, {
      'aria-describedby':
        [node.props['aria-describedby'], describedBy].filter(Boolean).join(' ') || undefined,
      'aria-required': required || node.props['aria-required'] || undefined,
    })
  }

  if (node.props.children) {
    return cloneElement(node, {
      children: Children.map(node.props.children, (child) =>
        withA11y(child, { id, describedBy, required }),
      ),
    })
  }

  return node
}

export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
  className = '',
}) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required ? (
          <span className={styles.req}>
            {' '}
            *<span className={styles.srOnly}> (required)</span>
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      <div>
        {Children.map(children, (child) => withA11y(child, { id, describedBy, required }))}
      </div>
      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function CharCount({ value = '', min, max, id }) {
  const length = String(value).trim().length
  const underMin = typeof min === 'number' && length > 0 && length < min
  const overMax = typeof max === 'number' && length > max
  const tone = underMin || overMax ? 'warn' : length >= (min || 0) && length > 0 ? 'ok' : 'neutral'

  return (
    <div className={styles.charMeta} id={id}>
      <span className={styles.charHint}>
        {typeof min === 'number' && typeof max === 'number'
          ? `Minimum ${min} characters · Maximum ${max} characters`
          : typeof max === 'number'
            ? `Maximum ${max} characters`
            : null}
      </span>
      <span className={styles.charCount} data-tone={tone} aria-live="polite">
        {length}
        {typeof max === 'number' ? ` / ${max}` : ''} characters
      </span>
    </div>
  )
}

export function TextInput({ id, invalid, className = '', ...props }) {
  return (
    <input
      id={id}
      className={[styles.control, className].filter(Boolean).join(' ')}
      aria-invalid={invalid ? 'true' : undefined}
      {...props}
    />
  )
}

export function TextArea({ id, invalid, className = '', ...props }) {
  return (
    <textarea
      id={id}
      className={[styles.control, styles.textarea, className].filter(Boolean).join(' ')}
      aria-invalid={invalid ? 'true' : undefined}
      {...props}
    />
  )
}

export function SelectInput({ id, invalid, className = '', children, ...props }) {
  return (
    <select
      id={id}
      className={[styles.control, styles.select, className].filter(Boolean).join(' ')}
      aria-invalid={invalid ? 'true' : undefined}
      {...props}
    >
      {children}
    </select>
  )
}
