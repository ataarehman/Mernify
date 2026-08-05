/**
 * Chat API client — sends messages to the Mernify AI Cloudflare Worker.
 *
 * VITE_AI_CHAT_ENDPOINT must be set to the deployed Worker URL
 * (local: http://127.0.0.1:8787 via `npm run chat:worker`).
 * Without it, a mock keyword response is returned in development only.
 */

const ENDPOINT = String(import.meta.env.VITE_AI_CHAT_ENDPOINT || '').trim()
const TIMEOUT_MS = 35_000

async function postJson(url, body) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    return res
  } finally {
    clearTimeout(timer)
  }
}

/**
 * @typedef {{
 *   reply: string,
 *   buyingIntent?: 'low'|'medium'|'high',
 *   showCta?: boolean,
 *   recommendedService?: string|null,
 *   memory?: object,
 * }} ChatResult
 */

/**
 * @param {{ role: 'user'|'assistant', content: string }[]} messages
 * @param {{ page?: { url: string, title: string, type: string } }} context
 * @param {{ conversationId?: string, intent?: string }} meta
 * @returns {Promise<ChatResult>}
 */
export async function sendChatMessage(messages, context = {}, meta = {}) {
  if (!ENDPOINT) {
    await new Promise((r) => setTimeout(r, 800))
    const reply = devFallbackReply(messages)
    return { reply, buyingIntent: 'low', showCta: false, recommendedService: null, memory: {} }
  }

  const res = await postJson(ENDPOINT, {
    action: 'chat',
    messages,
    context,
    conversationId: meta.conversationId || undefined,
    intent: meta.intent || undefined,
  })
  if (!res.ok) {
    let errMsg = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.error) errMsg = data.error
    } catch {
      /* ignore */
    }
    throw new Error(errMsg)
  }

  const data = await res.json()
  if (!data?.reply) throw new Error('Empty response from AI service.')
  return {
    reply: data.reply,
    buyingIntent: data.buyingIntent || 'low',
    showCta: Boolean(data.showCta),
    recommendedService: data.recommendedService || null,
    memory: data.memory || {},
  }
}

/**
 * @param {object} lead
 * @returns {Promise<void>}
 */
export async function submitChatLead(lead) {
  if (!ENDPOINT) {
    await new Promise((r) => setTimeout(r, 600))
    return
  }
  const res = await postJson(ENDPOINT, { action: 'lead', ...lead })
  if (!res.ok) {
    let errMsg = 'Lead submission failed'
    try {
      const data = await res.json()
      if (data?.error) errMsg = data.error
    } catch {
      /* ignore */
    }
    throw new Error(errMsg)
  }
}

/**
 * Notify the Worker that a session ended so it can distill FAQ candidates.
 * @param {{ conversationId: string, context?: object, intent?: string, leadSubmitted?: boolean }} payload
 */
export async function finalizeChatSession(payload) {
  if (!ENDPOINT || !payload?.conversationId) return
  try {
    await postJson(ENDPOINT, {
      action: 'finalize',
      conversationId: payload.conversationId,
      context: payload.context || {},
      intent: payload.intent || undefined,
      leadSubmitted: Boolean(payload.leadSubmitted),
    })
  } catch {
    /* ignore — learning must not break UX */
  }
}

// ─── Development fallback ─────────────────────────────────────────────────────

function devFallbackReply(messages) {
  const last = messages.filter((m) => m.role === 'user').pop()?.content?.toLowerCase() || ''

  const mernifyTopics = [
    'saas', 'platform', 'website', 'web app', 'mobile', 'app', 'ios', 'android',
    'ai', 'automation', 'devops', 'cloud', 'api', 'design', 'ux', 'team', 'developer',
    'build', 'product', 'software', 'startup', 'mvp', 'project', 'estimate',
    'consultation', 'case study', 'portfolio', 'mernify', 'hire', 'service',
  ]
  const isRelated = mernifyTopics.some((t) => last.includes(t))
  if (last.length > 5 && !isRelated) {
    return "Thanks for your message. I'm here to help with Mernify's software development, SaaS, mobile apps, AI solutions, and project inquiries. What would you like to build or improve?"
  }

  if (last.includes('saas') || last.includes('platform')) {
    return "SaaS development is one of Mernify's core strengths. We build multi-tenant platforms with admin portals, billing-ready foundations, and scalable architecture. What kind of SaaS product are you thinking about?"
  }
  if (last.includes('ai') || last.includes('machine learning') || last.includes('automation')) {
    return "Mernify's AI Integration service helps embed practical AI features — assistants, intelligent search, and model-powered automation — into real products. What business problem are you trying to solve with AI?"
  }
  if (last.includes('mobile') || last.includes('ios') || last.includes('android')) {
    return "Mernify builds iOS and Android apps using React Native and Flutter. We handle the full delivery cycle from design through App Store submission. Tell me more about your mobile app idea."
  }
  if (last.includes('website') || last.includes('web app') || last.includes('portal')) {
    return "Mernify designs and builds fast, accessible web platforms and portals. Do you have an existing site to replace, or is this a new build?"
  }
  if (last.includes('team') || last.includes('hire') || last.includes('developer')) {
    return "Mernify's dedicated product teams embed directly into your workflow — combining product, design, and engineering. How many people are you looking to add, and for how long?"
  }
  if (last.includes('case study') || last.includes('portfolio') || last.includes('work')) {
    return "Mernify has published case studies across SaaS, field service, luxury e-commerce, and analytics. Which industry or product type are you most interested in seeing?"
  }
  if (last.includes('estimate') || last.includes('quote') || last.includes('price') || last.includes('cost')) {
    return "Mernify provides custom estimates after a short discovery conversation — project cost depends on scope, team size, and timeline. Want me to help prepare a project summary to share with the team?"
  }

  return "Hi! I'm Mernify AI — here to help you find the right solution. Are you looking to build a SaaS platform, website, mobile app, or something AI-powered?"
}
