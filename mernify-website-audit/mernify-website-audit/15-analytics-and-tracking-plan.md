# Phase 15: Analytics and Conversion Tracking Plan

**Audit Date:** 2026-07-30  
**Method:** Source code analysis — no analytics found in codebase

---

## 15.1 Current Analytics State

**Verdict: Zero analytics instrumentation detected.**

| Platform | Status | Evidence |
|----------|--------|---------|
| Google Analytics 4 | ❌ Not installed | No GA4 script in `index.html` or any component |
| Google Tag Manager | ❌ Not installed | No GTM script found |
| Meta (Facebook) Pixel | ❌ Not installed | No pixel script found |
| LinkedIn Insight Tag | ❌ Not installed | No LinkedIn script found |
| Hotjar / Clarity | ❌ Not installed | No session recording tools |
| PostHog | ❌ Not installed | No product analytics |
| Segment | ❌ Not installed | No analytics abstraction layer |
| Mixpanel | ❌ Not installed | Not found |
| Consent Management Platform | ❌ Not installed | No cookie consent banner |
| Error tracking (Sentry etc.) | ❌ Not installed | No error reporting configured |

**Business Impact:**  
Without any analytics:
- Mernify cannot measure how many visitors come to the website
- Cannot track which pages convert to contact form submissions
- Cannot run retargeting campaigns on Facebook or LinkedIn
- Cannot measure ROI of any marketing spend
- Cannot identify which services generate the most interest
- Cannot measure drop-off points in the conversion funnel
- Cannot generate GA4 audiences for Google Ads
- Cannot prove marketing effectiveness to stakeholders

**This is a P0 business issue for any company planning to do paid marketing.**

---

## 15.2 Required Analytics Architecture

### Layer 1: Foundation

| Tool | Purpose | Cost | Priority |
|------|---------|------|---------|
| Google Analytics 4 | Core web analytics, audience building | Free | P0 |
| Google Tag Manager | Tag orchestration, event management | Free | P0 |
| Google Search Console | SEO performance, indexing status | Free | P0 |

### Layer 2: Advertising

| Tool | Purpose | Required For | Priority |
|------|---------|-------------|---------|
| LinkedIn Insight Tag | LinkedIn campaign attribution, audience | LinkedIn ads | P1 |
| Meta Pixel | Meta/Instagram ads | Facebook/Instagram ads | P2 |
| Google Ads conversion tag | Google Ads attribution | Google Ads | P1 |

### Layer 3: Behavior and CRO

| Tool | Purpose | Cost | Priority |
|------|---------|------|---------|
| Microsoft Clarity (free) | Session recording, heatmaps | Free | P2 |
| Hotjar (paid) | Heatmaps, recordings, surveys | Paid | P3 |

### Layer 4: Consent

| Tool | Purpose | Priority |
|------|---------|---------|
| CookieYes / Cookiebot | GDPR/PECR consent management | P1 (required before installing pixels) |

---

## 15.3 Event Tracking Plan

| # | Event Name | Trigger | Page | Business Meaning | Platform | Priority |
|---|-----------|---------|------|-----------------|---------|---------|
| 1 | `contact_form_start` | First input change on contact form | `/contact` | Visitor began an inquiry | GA4 | P0 |
| 2 | `contact_form_submit` | Form submission success | `/contact` | Lead captured | GA4, LinkedIn, Meta | P0 |
| 3 | `contact_form_error` | Form submission failure | `/contact` | Lead lost — system failure | GA4 | P0 |
| 4 | `cta_click` | Click on any CTA button | All | High-intent signal | GA4 | P0 |
| 5 | `discovery_call_click` | Click on Calendly/booking link | Contact, homepage | Highest-intent signal | GA4, LinkedIn | P0 |
| 6 | `service_view` | Time on service detail page >30s | `/services/*` | Service interest signal | GA4 | P1 |
| 7 | `case_study_view` | Time on case study page >60s | `/case-studies/*` | Evaluation stage signal | GA4 | P1 |
| 8 | `email_click` | Click on `info@mernify.co` | Contact | Direct intent | GA4 | P1 |
| 9 | `scroll_depth_50` | 50% page scroll | Homepage | Content engagement | GA4 | P2 |
| 10 | `scroll_depth_100` | 100% page scroll | Homepage | High engagement | GA4 | P2 |
| 11 | `resource_download` | Click on lead magnet | When created | Lead capture | GA4, LinkedIn | P2 |
| 12 | `outbound_link_click` | Click on external links (case study live sites) | Case studies | Verification behavior | GA4 | P2 |
| 13 | `qualified_lead` | Form submit + service + budget filled | `/contact` | Qualified B2B lead | GA4, LinkedIn, CRM | P0 |
| 14 | `page_engagement` | 60+ seconds on page | All | High engagement | GA4 | P2 |

---

## 15.4 Conversion Goals

### Primary Conversion

**Goal:** `contact_form_submit` — A visitor has completed and submitted the contact form.  
**Value:** High (business inquiry)  
**Google Ads Conversion Tag:** Yes  
**LinkedIn Insight Tag Conversion:** Yes

### Secondary Conversions

| Goal | Event | Value |
|------|-------|-------|
| Discovery call booked | `discovery_call_click` | Very high |
| Email intent | `email_click` | Medium |
| Case study engagement | `case_study_view` | Low (research stage) |
| Service interest | `service_view` | Low (awareness) |

### Micro-Conversions (Quality Signals)

| Goal | Event | Purpose |
|------|-------|---------|
| Homepage scroll 100% | `scroll_depth_100` | Identifies engaged visitors |
| Multiple service views | Multiple `service_view` | Identifies researchers |
| Case study + contact | Both events | High-quality lead signal |

---

## 15.5 Funnel Analytics

| Funnel Stage | Measurement Event | Expected Conversion Rate |
|-------------|------------------|------------------------|
| Homepage visit | `page_view` | 100% baseline |
| Homepage → Services | Navigation click | 20–40% |
| Services → Case Studies | Navigation click | 15–25% |
| Services → Contact | CTA click | 10–20% |
| Contact page visit | `page_view` | 10–20% of homepage |
| Contact form start | `contact_form_start` | 50–70% of contact visits |
| Contact form submit | `contact_form_submit` | 40–60% of form starts |
| Discovery call booked | `discovery_call_click` | 10–20% of contact page |

*These are estimated conversion rates for a new B2B marketing website. Actual rates will differ. Track and optimize monthly.*

---

## 15.6 GA4 Configuration Checklist

- [ ] Create GA4 property for `mernify.co`
- [ ] Install GA4 via Google Tag Manager
- [ ] Configure Enhanced Measurement (scroll, file downloads, video)
- [ ] Create Conversion Events for `contact_form_submit` and `discovery_call_click`
- [ ] Set up Google Search Console + link to GA4
- [ ] Configure Audiences for retargeting (all visitors, case study viewers, service page viewers)
- [ ] Connect to Google Ads (when ready for paid search)
- [ ] Configure custom reports: Traffic by source, Conversions by service page, Entry page performance

---

## 15.7 LinkedIn Campaign Analytics

| Setup Step | Status | Notes |
|-----------|--------|-------|
| LinkedIn Insight Tag installed | ❌ Required | Install via GTM |
| Company page created | Unknown | Required for advertising |
| Conversion tracking for form submit | ❌ Required | Set up after Insight Tag |
| Retargeting audience (all website visitors) | ❌ Required | Minimum 300 visitors before usable |
| Retargeting audience (case study viewers) | ❌ Required | Specific intent audience |
| Lead Gen Forms set up | ❌ Optional | Native LinkedIn forms for direct campaigns |

---

## 15.8 GDPR and Consent Requirements

**The Google Maps iframe on the contact page loads without consent — this is a GDPR violation in the EU.**

| Requirement | Status | Action |
|-------------|--------|--------|
| Cookie banner with consent options | ❌ Missing | Install before ANY analytics/pixels |
| GA4 IP anonymization | ❌ Missing | Enable in GA4 settings |
| Data processing agreement with Google | ❌ Unknown | Sign via GA4 settings |
| Privacy policy covers analytics | ❌ Unknown | Update privacy policy |
| Map consent gate (contact page) | ❌ Missing | Load Google Maps only after consent |

**Recommended implementation order:**
1. Install CookieYes or Cookiebot first
2. Then install GA4 + GTM — ensure they fire only after consent
3. Then LinkedIn Insight Tag
4. Then Meta Pixel (if needed)

---

## 15.9 Analytics Implementation Timeline

| Week | Task | Owner |
|------|------|-------|
| Week 1 | Install Google Analytics 4 + GTM | Engineering |
| Week 1 | Install Google Search Console, verify domain | Marketing |
| Week 1 | Set up CookieYes consent banner | Engineering |
| Week 2 | Configure conversion events in GTM | Marketing/Engineering |
| Week 2 | Install LinkedIn Insight Tag | Engineering |
| Week 2 | Link GA4 to Search Console | Marketing |
| Week 3 | Set up custom reports and dashboards | Marketing |
| Week 3 | Configure retargeting audiences | Marketing |
| Week 4 | Review first data and baseline KPIs | Leadership |
| Month 2 | Connect Google Ads (if launching paid search) | Marketing |
| Month 2 | Set up Meta Pixel (if launching social ads) | Marketing |
