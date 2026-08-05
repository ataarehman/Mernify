import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { sendChatMessage, submitChatLead, finalizeChatSession } from '@/lib/chat/chatApi'
import { chatAnalytics } from '@/lib/chat/chatAnalytics'
import { whenPageEntranceReady } from '@/components/motion/pageEntrance'
import { ChatContext } from './useChat'

// ─── Constants ────────────────────────────────────────────────────────────────

const WELCOME =
  "Hi — I'm Mernify AI, your product sales assistant. Tell me what you're looking to build or improve, and I'll help map the right approach."

const QUICK_ACTIONS = [
  { id: 'saas', label: 'Build a SaaS product', intent: 'saas-development' },
  { id: 'website', label: 'Develop a website', intent: 'web-development' },
  { id: 'mobile', label: 'Create a mobile app', intent: 'mobile-app-development' },
  { id: 'ai', label: 'Add AI to my business', intent: 'ai-integration' },
  { id: 'improve', label: 'Improve an existing product', intent: 'product-engineering' },
  { id: 'team', label: 'Hire developers', intent: 'dedicated-product-teams' },
  { id: 'portfolio', label: "Explore Mernify's work", intent: 'portfolio' },
]

// Auto-open: "true" = every device, "desktop" = pointer-precise screens only,
// "false" = never. Fires once per browser session.
const AUTO_OPEN_MODE = String(import.meta.env.VITE_CHAT_AUTO_OPEN ?? 'true').toLowerCase()
const AUTO_OPEN_DELAY_MS = Number(import.meta.env.VITE_CHAT_AUTO_OPEN_DELAY ?? 1500)
const AUTO_OPEN_SESSION_KEY = 'mernify-chat-auto-opened'

function autoOpenAllowed() {
  if (AUTO_OPEN_MODE === 'false') return false
  if (AUTO_OPEN_MODE === 'desktop' && window.matchMedia('(max-width: 640px)').matches) return false
  try {
    return sessionStorage.getItem(AUTO_OPEN_SESSION_KEY) !== '1'
  } catch {
    return true
  }
}

function rememberAutoOpen() {
  try {
    sessionStorage.setItem(AUTO_OPEN_SESSION_KEY, '1')
  } catch {
    /* private mode — greeting may repeat next navigation */
  }
}

function makeId() {
  return Math.random().toString(36).slice(2, 10)
}

function makeAssistantMessage(content) {
  return { id: makeId(), role: 'assistant', content, ts: Date.now() }
}

function makeUserMessage(content) {
  return { id: makeId(), role: 'user', content, ts: Date.now() }
}

function initialConversationState() {
  return {
    id: makeId(),
    intent: null,
    projectType: null,
    qualification: 'unknown',
    recommendedService: null,
    leadSubmitted: false,
    bookingStarted: false,
    humanHandoffRequested: false,
    turnCount: 0,
    buyingIntent: 'low',
    showCta: false,
    memory: {},
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ChatProvider({ children }) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [autoOpened, setAutoOpened] = useState(false)
  const [messages, setMessages] = useState([makeAssistantMessage(WELCOME)])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [conversationState, setConversationState] = useState(initialConversationState)

  const abortRef = useRef(null)
  const isOpenRef = useRef(isOpen)
  const sessionStarted = useRef(false)
  const conversationStateRef = useRef(conversationState)
  const pageContextRef = useRef(null)
  const finalizedRef = useRef(new Set())

  conversationStateRef.current = conversationState
  isOpenRef.current = isOpen

  // Page context for the AI
  const pageContext = {
    page: {
      url: location.pathname,
      title: document.title || '',
      type: inferPageType(location.pathname),
    },
  }
  pageContextRef.current = pageContext

  const finalizeCurrentSession = useCallback((stateOverride) => {
    const state = stateOverride || conversationStateRef.current
    if (!state?.id || state.turnCount < 1) return
    if (finalizedRef.current.has(state.id)) return
    finalizedRef.current.add(state.id)
    void finalizeChatSession({
      conversationId: state.id,
      context: pageContextRef.current || {},
      intent: state.intent || undefined,
      leadSubmitted: Boolean(state.leadSubmitted),
    })
  }, [])

  const open = useCallback((source = 'user') => {
    setAutoOpened(source === 'auto')
    setIsOpen(true)
    rememberAutoOpen()
    chatAnalytics.opened()
    if (!sessionStarted.current) {
      sessionStarted.current = true
      chatAnalytics.conversationStarted()
    }
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setAutoOpened(false)
    rememberAutoOpen()
    chatAnalytics.closed()
    finalizeCurrentSession()
  }, [finalizeCurrentSession])

  const toggle = useCallback(() => {
    if (isOpenRef.current) close()
    else open('user')
  }, [close, open])

  // Greet visitors on landing — once per browser session, after the entrance
  // curtain clears, and never on top of a panel they already opened or dismissed.
  useEffect(() => {
    if (!autoOpenAllowed()) return
    let timer
    const cancelEntranceWait = whenPageEntranceReady(() => {
      timer = window.setTimeout(() => {
        if (!isOpenRef.current) open('auto')
      }, AUTO_OPEN_DELAY_MS)
    })
    return () => {
      cancelEntranceWait()
      window.clearTimeout(timer)
    }
  }, [open])

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

        const result = await sendChatMessage(history, pageContext, {
          conversationId: conversationStateRef.current.id,
          intent: conversationStateRef.current.intent || undefined,
        })
        if (cancelled) return

        addMessage(makeAssistantMessage(result.reply))
        setConversationState((prev) => ({
          ...prev,
          turnCount: prev.turnCount + 1,
          buyingIntent: result.buyingIntent || 'low',
          showCta: Boolean(result.showCta) || result.buyingIntent === 'high',
          recommendedService: result.recommendedService || prev.recommendedService,
          projectType: result.memory?.projectType || prev.projectType,
          memory: result.memory || prev.memory,
          qualification:
            result.buyingIntent === 'high'
              ? 'high'
              : result.buyingIntent === 'medium'
                ? 'medium'
                : prev.qualification,
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
          setConversationState((prev) => ({ ...prev, humanHandoffRequested: true, showCta: true }))
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
    finalizeCurrentSession()
    chatAnalytics.newConversationStarted()
    setMessages([makeAssistantMessage(WELCOME)])
    setIsLoading(false)
    setError(null)
    setShowQuickActions(true)
    setConversationState(initialConversationState())
  }, [finalizeCurrentSession])

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
          conversationId: conversationState.id,
          intent: conversationState.intent,
          recommendedService: conversationState.recommendedService,
          qualification: conversationState.qualification,
          page: location.pathname,
          referrer: document.referrer || '',
          summary,
          brief: formatMemoryBrief(conversationState.memory),
          consent: true,
        })
        chatAnalytics.leadSubmitted()
        setConversationState((prev) => ({ ...prev, leadSubmitted: true }))
        finalizedRef.current.add(conversationState.id)
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

  // Finalize + abandon tracking on unmount
  useEffect(() => {
    return () => {
      const state = conversationStateRef.current
      if (sessionStarted.current && state.turnCount > 0) {
        chatAnalytics.conversationAbandoned(state.turnCount)
        finalizeCurrentSession(state)
      }
    }
  }, [finalizeCurrentSession])

  // Best-effort finalize when the tab closes
  useEffect(() => {
    function onPageHide() {
      finalizeCurrentSession()
    }
    window.addEventListener('pagehide', onPageHide)
    return () => window.removeEventListener('pagehide', onPageHide)
  }, [finalizeCurrentSession])

  const value = {
    isOpen,
    autoOpened,
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

function formatMemoryBrief(memory) {
  if (!memory || typeof memory !== 'object') return ''
  return Object.entries(memory)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
}
