# Mernify — Agent Guide

Marketing site for **Mernify** (`mernify.co`): React 19 + Vite 7 SPA on Cloudflare Pages, with Pages Functions for contact/newsletter and optional Workers for AI chat.

## Default agent behavior

- Prefer smallest change that works; preserve existing design language (indigo `#4f46e5`, cyan `#15c6e2`).
- Never put secrets in `VITE_*` or commit `.env` / `cf-worker/.dev.vars`.
- Do not fake contact/newsletter success — delivery must go through `/api/contact` or `/api/newsletter` → mail microservice.
- Do not commit unless the user asks.
- Deploy from **repo root** so `functions/` ships with the site.

## Sub-agents (Cursor custom agents)

Project agents live in `.cursor/agents/` as Markdown + YAML frontmatter. Invoke with `/agent_name` or “use the `agent_name` subagent…”.

### Primary development agents

| Agent | File | Use when |
|-------|------|----------|
| **mernify_frontend** | `.cursor/agents/mernify_frontend.md` | UI, pages, sections, GSAP/motion, Three.js, responsive/a11y polish |
| **mernify_backend** | `.cursor/agents/mernify_backend.md` | Pages Functions, APIs, email delivery, validation, security, env/deploy server side |

### Supporting agents

| Agent | File | Use when |
|-------|------|----------|
| Frontend QA | `.cursor/agents/frontend-qa.md` | Full-site / responsive / a11y / console QA |
| Contact & email | `.cursor/agents/contact-email.md` | Forms, `/api/contact`, newsletter, EMAIL_* |
| Content & SEO | `.cursor/agents/content-seo.md` | Blog, case studies, meta, sitemap |
| Pages deploy | `.cursor/agents/pages-deploy.md` | Cloudflare Pages env, go-live verification |

## Skills (workflows)

| Skill | Path | Trigger |
|-------|------|---------|
| Contact email | `.cursor/skills/mernify-contact-email/SKILL.md` | Contact/newsletter/email delivery |
| Pages go-live | `.cursor/skills/mernify-pages-deploy/SKILL.md` | Deploy / live API verify |
| Site QA | `.cursor/skills/mernify-site-qa/SKILL.md` | Crawl, overflow, broken routes |

## Rules

Under `.cursor/rules/` — always-on project core plus globs for React, contact APIs, and content.

## Key paths

- App routes: `src/app/router.jsx`
- Content: `src/content/`
- Contact UI: `src/components/forms/`
- Delivery: `functions/api/contact.js`, `functions/api/newsletter.js`, `functions/_lib/contactMail.js`
- Local APIs: `vite.config.js` middleware
- AI chat Worker: `cf-worker/ai-chat.js`
- Go-live: `deploy/PAGES_GO_LIVE.md`
