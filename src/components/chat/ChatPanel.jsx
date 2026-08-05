import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  Bot,
  Calendar,
  Minimize2,
  PenSquare,
  Send,
  User,
  X,
} from 'lucide-react'
import { useChat } from './useChat'
import { ChatMessage } from './ChatMessage'
import { QuickActions } from './QuickActions'
import { TypingIndicator } from './TypingIndicator'
import styles from './ChatPanel.module.css'

export function ChatPanel() {
  const {
    isOpen,
    autoOpened,
    close,
    messages,
    isLoading,
    error,
    clearError,
    sendMessage,
    startNewConversation,
    submitLead,
    startBooking,
    conversationState,
  } = useChat()

  const [input, setInput] = useState('')
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadValues, setLeadValues] = useState({ name: '', email: '', company: '' })
  const [leadStatus, setLeadStatus] = useState('idle')
  const [leadError, setLeadError] = useState('')

  const messagesRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  // Keep the newest message visible
  useEffect(() => {
    const list = messagesRef.current
    if (!list) return
    list.scrollTop = list.scrollHeight
  }, [messages, isLoading])

  // Focus input when panel opens and whenever the assistant finishes replying,
  // so the visitor can keep typing without clicking back into the field.
  useEffect(() => {
    if (!isOpen || isLoading || showLeadForm) return
    // Skip on touch devices: forcing focus there pops the keyboard over the thread
    if (window.matchMedia('(pointer: coarse)').matches) return
    // An auto-opened panel shouldn't grab focus away from the page the visitor is reading
    if (autoOpened && messages.length <= 1) return
    const timer = setTimeout(() => inputRef.current?.focus(), 60)
    return () => clearTimeout(timer)
  }, [isOpen, isLoading, showLeadForm, autoOpened, messages.length])

  // Grow the textarea with its content instead of clipping the placeholder/text
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [input, isOpen])

  // On mobile the panel is full-screen, so freeze the page behind it
  useEffect(() => {
    if (!isOpen) return
    if (!window.matchMedia('(max-width: 640px)').matches) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [isOpen])

  // Trap focus inside panel when open
  useEffect(() => {
    if (!isOpen) return
    const panel = panelRef.current
    if (!panel) return

    const focusable = panel.querySelectorAll(
      'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    function handleKeyDown(e) {
      if (e.key === 'Escape') { close(); return }
      if (e.key !== 'Tab') return
      if (!focusable.length) return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    panel.addEventListener('keydown', handleKeyDown)
    return () => panel.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  const handleSend = useCallback(() => {
    if (!input.trim() || isLoading) return
    sendMessage(input.trim())
    setInput('')
    inputRef.current?.focus()
  }, [input, isLoading, sendMessage])

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Lead form
  function handleLeadChange(e) {
    const { name, value } = e.target
    setLeadValues((prev) => ({ ...prev, [name]: value }))
    setLeadError('')
  }

  async function handleLeadSubmit(e) {
    e.preventDefault()
    if (!leadValues.name.trim()) { setLeadError('Please enter your name.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadValues.email.trim())) {
      setLeadError('Please enter a valid email address.')
      return
    }
    setLeadStatus('loading')
    try {
      await submitLead({
        name: leadValues.name.trim(),
        email: leadValues.email.trim(),
        company: leadValues.company.trim(),
      })
      setLeadStatus('success')
    } catch (err) {
      setLeadStatus('error')
      setLeadError(err.message || 'Submission failed. Please try again.')
    }
  }

  if (!isOpen) return null

  const showCta = Boolean(conversationState.showCta) || conversationState.buyingIntent === 'high'
  const showBookingAction =
    (showCta || conversationState.turnCount >= 3) && !conversationState.bookingStarted
  const showLeadAction =
    (showCta || conversationState.turnCount >= 2) &&
    !conversationState.leadSubmitted &&
    !showLeadForm

  return (
    <>
      {/* Overlay on mobile */}
      <div className={styles.overlay} aria-hidden="true" onClick={close} />

      <div
        id="mernify-chat-panel"
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Mernify AI Sales Assistant"
        data-lenis-prevent
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerAvatar} aria-hidden="true">
              <Bot size={16} strokeWidth={2} />
            </div>
            <div className={styles.headerMeta}>
              <span className={styles.headerName}>Mernify AI</span>
              <span className={styles.headerStatus}>
                <span className={styles.statusDot} aria-hidden="true" />
                Sales Assistant
              </span>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.headerBtn}
              onClick={startNewConversation}
              title="Start new conversation"
              aria-label="Start new conversation"
            >
              <PenSquare size={15} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={styles.headerBtn}
              onClick={close}
              title="Close chat"
              aria-label="Close Mernify AI chat"
            >
              <Minimize2 size={15} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* AI Disclosure */}
        <div className={styles.disclosure}>
          <Bot size={13} aria-hidden="true" />
          <span>You&apos;re chatting with an AI assistant. Not a human.</span>
        </div>

        {/* Messages */}
        <div
          ref={messagesRef}
          className={styles.messages}
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
          tabIndex={0}
          data-lenis-prevent
        >
          <div className={styles.messagesInner}>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        </div>

        {/* Quick actions */}
        <QuickActions />

        {/* High-intent / contextual CTAs */}
        {(showBookingAction || showLeadAction) && (
          <div className={`${styles.actionBar} ${showCta ? styles.actionBarHighlight : ''}`.trim()}>
            {showCta && (
              <p className={styles.ctaPrompt}>Ready to move forward? Choose a next step:</p>
            )}
            {showLeadAction && (
              <button
                type="button"
                className={showCta ? styles.actionChipPrimary : styles.actionChip}
                onClick={() => setShowLeadForm(true)}
              >
                <User size={13} aria-hidden="true" />
                Submit Inquiry
              </button>
            )}
            {showBookingAction && (
              <button
                type="button"
                className={showCta ? styles.actionChipPrimary : styles.actionChip}
                onClick={startBooking}
              >
                <Calendar size={13} aria-hidden="true" />
                Book a Call
              </button>
            )}
          </div>
        )}

        {/* Lead form (inline) */}
        {showLeadForm && leadStatus !== 'success' && (
          <form className={styles.leadForm} onSubmit={handleLeadSubmit} noValidate>
            <p className={styles.leadHeading}>Send your project details to Mernify</p>
            <input
              className={styles.leadInput}
              type="text"
              name="name"
              placeholder="Your name *"
              value={leadValues.name}
              onChange={handleLeadChange}
              autoComplete="name"
              aria-label="Your name"
              required
            />
            <input
              className={styles.leadInput}
              type="email"
              name="email"
              placeholder="Business email *"
              value={leadValues.email}
              onChange={handleLeadChange}
              autoComplete="email"
              aria-label="Business email"
              required
            />
            <input
              className={styles.leadInput}
              type="text"
              name="company"
              placeholder="Company (optional)"
              value={leadValues.company}
              onChange={handleLeadChange}
              autoComplete="organization"
              aria-label="Company"
            />
            {leadError && (
              <p className={styles.leadError} role="alert">
                {leadError}
              </p>
            )}
            <p className={styles.consentNote}>
              By submitting, you agree to the{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              . Your conversation summary will be included.
            </p>
            <div className={styles.leadActions}>
              <button
                type="button"
                className={styles.leadCancel}
                onClick={() => { setShowLeadForm(false); setLeadStatus('idle'); setLeadError('') }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.leadSubmit}
                disabled={leadStatus === 'loading'}
              >
                {leadStatus === 'loading' ? 'Sending...' : 'Send to Mernify'}
                {leadStatus !== 'loading' && <ArrowRight size={14} aria-hidden="true" />}
              </button>
            </div>
          </form>
        )}

        {leadStatus === 'success' && (
          <div className={styles.leadSuccess} role="status">
            Thanks! The Mernify team will be in touch shortly.
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className={styles.errorBanner} role="alert">
            <AlertCircle size={15} aria-hidden="true" />
            <span>{error}</span>
            <button type="button" className={styles.errorDismiss} onClick={clearError} aria-label="Dismiss error">
              <X size={13} />
            </button>
          </div>
        )}

        {/* Input area */}
        <div className={styles.inputArea}>
          <textarea
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your project…"
            rows={1}
            maxLength={2000}
            aria-label="Type your message"
          />
          <button
            type="button"
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            <Send size={16} strokeWidth={2} />
          </button>
        </div>
        <p className={styles.footer}>
          AI can make mistakes. Confirm important details with the Mernify team.
        </p>
      </div>
    </>
  )
}
