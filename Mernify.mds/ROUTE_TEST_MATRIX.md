# ROUTE TEST MATRIX

**Base URL:** `http://localhost:5174`  
**Date:** 2026-07-24  
**Raw data:** `Mernify.md/qa-final/qa-results.json`

Legend: **P** = pass · **F** = fail · **N/A** = not applicable

## Primary routes

| Route | Load | Title unique | H1=1 | Meta/OG/Canonical | Overflow@1440 | Screenshot |
|-------|------|--------------|------|-------------------|---------------|------------|
| `/` | P | P | P | P | P | `screenshots/desktop/route_home.png` |
| `/services` | P | P | P | P | P | `route_services.png` |
| `/industries` | P | P | P | P | P | `route_industries.png` |
| `/case-studies` | P | P | P | P | P | `route_case-studies.png` |
| `/process` | P | P | P | P | P | `route_process.png` |
| `/about` | P | P | P | P | P | `route_about.png` |
| `/contact` | P | P | P | P | P | `route_contact.png` |
| `/privacy` | P | P | P | P | P | `route_privacy.png` |
| `/terms` | P | P | P | P | P | `route_terms.png` |
| `/work` (legacy) | P | P | P | P | P | same as case studies |
| `/does-not-exist-404` | P | P | P | P | P | 404 heading present |

## Service detail routes

| Route | Load | H1 | Meta | Notes |
|-------|------|----|------|-------|
| `/services/product-engineering` | P | P | P | |
| `/services/saas-development` | P | P | P | Direct + refresh tested |
| `/services/web-development` | P | P | P | |
| `/services/mobile-app-development` | P | P | P | Refresh nested OK |
| `/services/ai-integration` | P | P | P | |
| `/services/workflow-automation` | P | P | P | |
| `/services/ui-ux-design` | P | P | P | |
| `/services/cloud-devops` | P | P | P | |
| `/services/api-development` | P | P | P | |
| `/services/dedicated-product-teams` | P | P | P | |

## Case study detail routes (unpublished)

| Route | Load | Behavior | Indexed |
|-------|------|----------|---------|
| `/case-studies/saas-operations-platform` | P | Pending publication page | `noIndex` |
| `/case-studies/field-service-mobile` | P | Pending publication page | `noIndex` |
| `/case-studies/ai-document-workflow` | P | Pending publication page | `noIndex` |

Unpublished URLs removed from `public/sitemap.xml`.

## Viewport matrix (home)

| Viewport | Overflow | Nav | Screenshots |
|----------|----------|-----|-------------|
| 1440×1000 | P | Desktop | `desktop/home-1440x1000.png` (+ full) |
| 1280×800 | P | Desktop | `desktop/home-1280x800.png` |
| 1024×768 | P | Desktop | `tablet/home-1024x768.png` |
| 768×1024 | P | Mobile + Escape | `tablet/home-768x1024.png` (+ menu) |
| 390×844 | P | Mobile + Escape | `mobile/home-390x844.png` (+ menu) |
| 360×800 | P | Mobile + Escape | `mobile/home-360x800.png` (+ menu) |

Contact viewport captures also saved under each bucket (`contact-*.png`).

## Functional matrix

| Flow | Result | Notes |
|------|--------|-------|
| Hero primary CTA | P | → `/contact` |
| Hero secondary CTA | P | → `/case-studies` |
| Header Services/Industries/Case Studies/Process/About | P | |
| Header Contact Us | P | |
| Footer Privacy / Terms | P | |
| FAQ accordion | P | |
| Process keyboard | P | |
| Case study nav | P | Empty state (no published cases) |
| Service detail | P | |
| Contact validation | P | 5 alerts |
| Contact submit fallback | P | mailto messaging |
| History back | P | Forward flaky in headless |
| Nested refresh | P | |
| Reduced motion | P | |
| Keyboard Tab focus | P | |

## Sitemap alignment

Sitemap lists public marketing URLs only (home, services + 10 slugs, industries, case-studies index, process, about, contact, privacy, terms). Pending case-study slugs intentionally omitted.
