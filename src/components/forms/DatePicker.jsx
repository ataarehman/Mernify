import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './DatePicker.module.css'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const POP_WIDTH = 312

function parseISO(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(`${value}T12:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDisplay(value) {
  const date = parseISO(value)
  if (!date) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function buildCells(viewDate) {
  const first = startOfMonth(viewDate)
  const startOffset = first.getDay()
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()
  const cells = []

  for (let i = 0; i < startOffset; i += 1) cells.push(null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))
  }
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

/**
 * Lightweight calendar date picker — no external dependency.
 * Value is ISO `YYYY-MM-DD` (or empty string).
 * Popover is portaled to document.body so parent overflow cannot clip it.
 */
export function DatePicker({
  id,
  name,
  value = '',
  onChange,
  invalid = false,
  placeholder = 'Select a date',
  min,
  disabled = false,
  className = '',
  'aria-describedby': ariaDescribedBy,
}) {
  const autoId = useId()
  const fieldId = id || autoId
  const dialogId = `${fieldId}-dialog`
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const popRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: POP_WIDTH, placement: 'bottom' })
  const selected = parseISO(value)
  const [viewDate, setViewDate] = useState(() => selected || new Date())

  const minDate = useMemo(() => parseISO(min) || null, [min])
  const cells = useMemo(() => buildCells(viewDate), [viewDate])
  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(viewDate),
    [viewDate],
  )

  useEffect(() => {
    if (!selected) return
    setViewDate(selected)
  }, [selected])

  useLayoutEffect(() => {
    if (!open) return undefined

    function place() {
      const trigger = triggerRef.current
      const pop = popRef.current
      if (!trigger) return

      const rect = trigger.getBoundingClientRect()
      const popHeight = pop?.offsetHeight || 340
      const width = Math.min(POP_WIDTH, Math.max(rect.width, 260))
      const gap = 8
      const spaceBelow = window.innerHeight - rect.bottom - gap
      const spaceAbove = rect.top - gap
      const placement =
        spaceBelow >= popHeight
          ? 'bottom'
          : spaceAbove >= popHeight
            ? 'top'
            : spaceAbove > spaceBelow
              ? 'top'
              : 'bottom'

      let left = rect.left
      left = Math.max(8, Math.min(left, window.innerWidth - width - 8))

      let top =
        placement === 'top' ? rect.top - popHeight - gap : rect.bottom + gap
      top = Math.max(8, Math.min(top, window.innerHeight - popHeight - 8))

      setCoords({ top, left, width, placement })
    }

    place()
    const frame = requestAnimationFrame(place)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open, viewDate])

  useEffect(() => {
    if (!open) return undefined

    function onPointerDown(event) {
      const t = event.target
      if (rootRef.current?.contains(t) || popRef.current?.contains(t)) return
      setOpen(false)
    }
    function onKey(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function emit(next) {
    onChange?.({
      target: { name, value: next, type: 'text' },
    })
  }

  function isDisabled(date) {
    if (!minDate) return false
    const a = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const b = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
    return a < b
  }

  function selectDay(date) {
    if (isDisabled(date)) return
    emit(toISO(date))
    setOpen(false)
    triggerRef.current?.focus()
  }

  const todayISO = toISO(new Date())
  const display = formatDisplay(value)

  const popover =
    open && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={popRef}
            id={dialogId}
            className={styles.pop}
            role="dialog"
            aria-modal="true"
            aria-label="Choose a date"
            data-placement={coords.placement}
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              width: coords.width,
              zIndex: 10000,
            }}
          >
            <div className={styles.popHead}>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Previous month"
                onClick={() =>
                  setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
                }
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <p className={styles.monthLabel} aria-live="polite">
                {monthLabel}
              </p>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Next month"
                onClick={() =>
                  setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
                }
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.weekdays} aria-hidden="true">
              {WEEKDAYS.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className={styles.grid} role="grid" aria-label={monthLabel}>
              {cells.map((date, index) => {
                if (!date) {
                  return <span key={`e-${index}`} className={styles.empty} role="presentation" />
                }
                const iso = toISO(date)
                const isSelected = value === iso
                const isToday = iso === todayISO
                const dayDisabled = isDisabled(date)
                return (
                  <button
                    key={iso}
                    type="button"
                    role="gridcell"
                    className={[
                      styles.day,
                      isSelected ? styles.daySelected : '',
                      isToday ? styles.dayToday : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    disabled={dayDisabled}
                    aria-label={formatDisplay(iso)}
                    aria-pressed={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    onClick={() => selectDay(date)}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>

            <div className={styles.popFoot}>
              <button
                type="button"
                className={styles.footBtn}
                onClick={() => {
                  emit('')
                  setOpen(false)
                  triggerRef.current?.focus()
                }}
              >
                Clear
              </button>
              <button
                type="button"
                className={styles.footBtnAccent}
                onClick={() => {
                  const now = new Date()
                  if (!isDisabled(now)) {
                    emit(toISO(now))
                    setViewDate(now)
                  }
                  setOpen(false)
                  triggerRef.current?.focus()
                }}
              >
                Today
              </button>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <div
      ref={rootRef}
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      <button
        ref={triggerRef}
        type="button"
        id={fieldId}
        className={styles.trigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        aria-invalid={invalid ? 'true' : undefined}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
      >
        <CalendarDays className={styles.triggerIcon} size={18} aria-hidden="true" />
        <span className={display ? styles.value : styles.placeholder}>
          {display || placeholder}
        </span>
      </button>

      <input type="hidden" name={name} value={value} readOnly />

      {popover}
    </div>
  )
}

export function formatTimelineLabel(iso) {
  return formatDisplay(iso)
}
