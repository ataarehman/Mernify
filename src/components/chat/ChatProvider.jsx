import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { sendChatMessage, submitChatLead } from '@/lib/chat/chatApi'
import { chatAnalytics } from '@/lib/chat/chatAnalytics'

// ─── Context ──────────────────────────────────────────────────────────────────

const ChatContext = createContext(null)

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used inside ChatProvider')
  return ctx
}

// ─── Constants ────────────────────────────────────────────────────────────────

const WELCOME = "Hi! I'm Mernify AI — here to help you find the right solution. What are you looking to build?"

const QUICK_ACTIONS = [
  { id: 'saas', label: 'Build a SaaS product', intent: 'saas-development' },
  { id: 'website', label: 'Develop a website', intent: 'web-development' },
  { id: 'mobile', label: 'Create a mobile app', intent: 'mobile-app-development' },
  { id: 'ai', label: 'Add AI to my business', intent: 'ai-integration' },
  { id: 'improve', label: 'Improve an existing product', intent: 'product-engineering' },
  { id: 'team', label: 'Hire developers', intent: 'dedicated-product-teams' },
  { id: 'portfolio', label: "Explore Mernify's work", intent: 'portfolio' },
]

function makeId() {
  return Math.random().toString(36).slice(2, 10)
}

function makeAssistantMessage(content) {
  return { id: makeId(), role: 'assistant', content, ts: Date.now() }
}

function makeUserMessage(content) {
  return { id: makeId(), role: 'user', content, ts: Date.now() }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ChatProvider({ children }) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([makeAssistantMessage(WELCOME)])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [conversationState, setConversationState] = useState({
    id: makeId(),
    intent: null,
    projectType: null,
    qualification: 'unknown',
    recommendedService: null,
    leadSubmitted: false,
    bookingStarted: false,
    humanHandoffRequested: false,
    turnCount: 0,
  })

  const abortRef = useRef(null)
  const sessionStarted = useRef(false)

  // Page context for the AI
  const pageContext = {
    page: {
      url: location.pathname,
      title: document.title || '',
      type: inferPageType(location.pathname),
    },
  }

  function open() {
    setIsOpen(true)
    chatAnalytics.opened()
    if (!sessionStarted.current) {
      sessionStarted.current = true
      chatAnalytics.conversationStarted()
    }
  }

  function close() {
    setIsOpen(false)
    chatAnalytics.closed()
  }

  function toggle() {
    if (isOpen) close()
    else open()
  }

  const addMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg])
  }, [])

  const sendMessage = useCallback(
    async (text) => {
      if (isLoading || !text.trim()) return

      // Cancel any in-flight request
      if (abortRef.current) abortRef.current()

      const userMsg = makeUserMessage(text.trim())
      setMessages((prev) => [...prev, userMsg])
      setShowQuickActions(false)
      setError(null)
      setIsLoading(true)

      let cancelled = false
      abortRef.current = () => { cancelled = true }

      try {
        const history = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }))

        const reply = await sendChatMessage(history, pageContext)
        if (cancelled) return

        addMessage(makeAssistantMessage(reply))
        setConversationState((prev) => ({
          ...prev,
          turnCount: prev.turnCount + 1,
        }))

        // Detect human handoff requests
        const lowerText = text.toLowerCase()
        if (
          lowerText.includes('speak to a human') ||
          lowerText.includes('talk to someone') ||
          lowerText.includes('real person') ||
          lowerText.includes('contact team')
        ) {
          chatAnalytics.humanHandoffRequested()
          setConversationState((prev) => ({ ...prev, humanHandoffRequested: true }))
        }
      } catch (err) {
        if (cancelled) return
        const isTimeout = err.message?.includes('timeout') || err.message?.includes('abort')
        if (isTimeout) chatAnalytics.aiTimeout()
        else chatAnalytics.aiError(err.message?.slice(0, 50) || 'unknown')
        setError(err.message || 'Something went wrong. Please try again.')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    },
    [isLoading, messages, pageContext, addMessage],
  )

  const sendQuickAction = useCallback(
    (action) => {
      chatAnalytics.quickActionSelected(action.label)
      chatAnalytics.intentDetected(action.intent)
      setConversationState((prev) => ({ ...prev, intent: action.intent }))
      sendMessage(action.label)
    },
    [sendMessage],
  )

  const startNewConversation = useCallback(() => {
    if (abortRef.current) abortRef.current()
    chatAnalytics.newConversationStarted()
    setMessages([makeAssistantMessage(WELCOME)])
    setIsLoading(false)
    setError(null)
    setShowQuickActions(true)
    setConversationState({
      id: makeId(),
      intent: null,
      projectType: null,
      qualification: 'unknown',
      recommendedService: null,
      leadSubmitted: false,
      bookingStarted: false,
      humanHandoffRequested: false,
      turnCount: 0,
    })
  }, [])

  const submitLead = useCallback(
    async (leadData) => {
      chatAnalytics.leadFormOpened()
      try {
        const summary = messages
          .slice(-8)
          .map((m) => `${m.role === 'user' ? 'Visitor' : 'AI'}: ${m.content}`)
          .join('\n')

        await submitChatLead({
          ...leadData,
          intent: conversationState.intent,
          recommendedService: conversationState.recommendedService,
          qualification: conversationState.qualification,
          page: location.pathname,
          referrer: document.referrer || '',
          summary,
          consent: true,
        })
        chatAnalytics.leadSubmitted()
        setConversationState((prev) => ({ ...prev, leadSubmitted: true }))
        return { ok: true }
      } catch (err) {
        chatAnalytics.leadFailed(err.message?.slice(0, 50) || 'unknown')
        throw err
      }
    },
    [messages, conversationState, location.pathname],
  )

  const startBooking = useCallback(() => {
    const url = String(import.meta.env.VITE_CALENDLY_URL || '').trim()
    chatAnalytics.bookingStarted()
    setConversationState((prev) => ({ ...prev, bookingStarted: true }))
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      window.open('/contact?intent=discovery', '_self')
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  // Abandon tracking on unmount
  useEffect(() => {
    return () => {
      if (sessionStarted.current && conversationState.turnCount > 0) {
        chatAnalytics.conversationAbandoned(conversationState.turnCount)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    isOpen,
    open,
    close,
    toggle,
    messages,
    isLoading,
    error,
    clearError,
    showQuickActions,
    quickActions: QUICK_ACTIONS,
    sendMessage,
    sendQuickAction,
    startNewConversation,
    submitLead,
    startBooking,
    conversationState,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function inferPageType(pathname) {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/services/')) return 'service-detail'
  if (pathname === '/services') return 'services'
  if (pathname.startsWith('/case-studies/')) return 'case-study-detail'
  if (pathname === '/case-studies') return 'case-studies'
  if (pathname === '/about') return 'about'
  if (pathname === '/contact') return 'contact'
  if (pathname === '/process') return 'process'
  if (pathname === '/industries') return 'industries'
  return 'general'
}
