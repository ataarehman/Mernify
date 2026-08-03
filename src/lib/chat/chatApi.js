/**
 * Chat API client — sends messages to the Mernify AI Cloudflare Worker.
 *
 * VITE_AI_CHAT_ENDPOINT must be set to the deployed Worker URL.
 * Without it, a mock response is returned in development.
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
 * @param {{ role: 'user'|'assistant', content: string }[]} messages
 * @param {{ page?: { url: string, title: string, type: string } }} context
 * @returns {Promise<string>} assistant reply text
 */
export async function sendChatMessage(messages, context = {}) {
  if (!ENDPOINT) {
    // Development fallback when no worker is deployed yet
    await new Promise((r) => setTimeout(r, 800))
    return devFallbackReply(messages)
  }

  const res = await postJson(ENDPOINT, { action: 'chat', messages, context })
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
  return data.reply
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

// ─── Development fallback ─────────────────────────────────────────────────────

function devFallbackReply(messages) {
  const last = messages.filter((m) => m.role === 'user').pop()?.content?.toLowerCase() || ''

  // Out-of-scope guard — mirror the Worker behaviour
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
