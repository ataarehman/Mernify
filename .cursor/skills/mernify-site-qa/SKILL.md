---
name: mernify-site-qa
description: >-
  Full-site QA for Mernify — routes, responsive layout, overflow, forms,
  console errors, SEO basics. Use when asked to QA the site, crawl pages,
  fix overflow, check mobile/desktop, or run scripts/qa-site-crawl.mjs.
---

# Mernify site QA

## When to use

Full-site QA, responsive bugs, broken links, missing h1, form UX, crawl reports.

## Procedure

1. List routes from `src/app/router.jsx` (include dynamic service/case/blog slugs from content).
2. Prefer `node scripts/qa-site-crawl.mjs` if present; otherwise Playwright / browser MCP.
3. Viewports: ~1440, ~834, ~390.
4. Per page: load → wait for content (`h1` or main) → check overflow, console, obvious broken images/CTAs.
5. Forms: Home inquiry + Contact + newsletter; honeypot must not block real users.
6. Fix issues in place; keep brand/layout.

## Overflow rule

Flag only when `document.documentElement.scrollWidth > clientWidth`. Wide decorative marquees alone are OK if the document does not scroll horizontally.

## Lazy routes

Wait for network idle / visible `h1` before concluding a heading is missing.

## Output

- Checked routes / viewports  
- Fixes (file paths)  
- Blockers needing Cloudflare / secrets / inbox  

## Related

- Agent: `.cursor/agents/frontend-qa.md`
- Build gate: `npm run build`
