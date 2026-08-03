/**
 * Chat analytics — fires GA4 events when GA is loaded.
 * All events use the `mernify_chat_` namespace.
 */

function gtag(...args) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args)
  }
}

/** @param {string} eventName @param {object} [params] */
function track(eventName, params = {}) {
  gtag('event', eventName, { ...params, event_category: 'ai_concierge' })
}

export const chatAnalytics = {
  launcherViewed: () => track('mernify_chat_launcher_viewed'),
  opened: () => track('mernify_chat_opened'),
  closed: () => track('mernify_chat_closed'),
  conversationStarted: () => track('mernify_chat_conversation_started'),
  quickActionSelected: (label) => track('mernify_chat_quick_action', { label }),
  intentDetected: (intent) => track('mernify_chat_intent_detected', { intent }),
  serviceRecommended: (service) => track('mernify_chat_service_recommended', { service }),
  caseStudyRecommended: (slug) => track('mernify_chat_case_study_recommended', { slug }),
  briefGenerated: () => track('mernify_chat_brief_generated'),
  leadFormOpened: () => track('mernify_chat_lead_form_opened'),
  leadSubmitted: () => track('mernify_chat_lead_submitted'),
  leadFailed: (reason) => track('mernify_chat_lead_failed', { reason }),
  bookingStarted: () => track('mernify_chat_booking_started'),
  humanHandoffRequested: () => track('mernify_chat_human_handoff'),
  feedbackSubmitted: (positive) => track('mernify_chat_feedback', { positive }),
  conversationAbandoned: (turnCount) => track('mernify_chat_abandoned', { turn_count: turnCount }),
  newConversationStarted: () => track('mernify_chat_new_conversation'),
  aiError: (code) => track('mernify_chat_ai_error', { error_code: code }),
  aiTimeout: () => track('mernify_chat_ai_timeout'),
  injectionAttempt: () => track('mernify_chat_injection_attempt'),
}
