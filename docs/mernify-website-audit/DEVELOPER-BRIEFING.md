# Mernify Website — Developer Briefing

**Issued:** July 30, 2026  
**Based on:** Full cross-functional website audit (19 files, `docs/mernify-website-audit/`)  
**Site:** https://mernify.co/  
**Action required:** See Priority 1 items below — production is broken

---

## 🔴 STOP — Production Is Broken Right Now

Live browser testing confirmed the following on July 30, 2026:

| URL | What a user sees |
|-----|-----------------|
| `/case-studies` | **403 Forbidden** (nginx) |
| `/portfolio` | **403 Forbidden** (nginx) |
| `/services` | Shows the **About** page content |
| `/contact` | Shows the **Services** content |
| `/about` | Shows footer / blank screen |
| `/process` | **404 Not Found** |
| `/services/saas-development` | **404 Not Found** |
| `/services/mobile-app-development` | Shows wrong service content |

**Root cause:** The nginx server is missing the SPA fallback directive. React Router only works when navigating client-side within a session. Any direct URL access, shared link, or Google crawl hits nginx first — and nginx tries to find an actual file or directory at that path, which does not exist for React routes.

### Fix (5 minutes)

In your nginx server block (likely `/etc/nginx/sites-available/mernify.co` or similar):

```nginx
server {
    listen 80;
    server_name mernify.co www.mernify.co;
    root /var/www/mernify/dist;   # adjust to your actual dist path
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;   # ← THIS LINE IS MISSING OR WRONG
    }
}
```

After editing, run:
```bash
sudo nginx -t          # test config syntax
sudo systemctl reload nginx
```

Then verify by opening https://mernify.co/case-studies directly in a browser (not by clicking a nav link — use a fresh tab or incognito).

---

## 🔴 Priority 1 — Fix Immediately (This Sprint)

### 1. Fix nginx SPA routing (above)
**Time:** ~15 minutes including deploy and verification  
**Impact:** Unblocks everything — every page currently broken for external users

---

### 2. Disable production source maps

In `vite.config.js`, change:
```js
// BEFORE
build: {
  sourcemap: true,
}

// AFTER
build: {
  sourcemap: false,
}
```

Then redeploy a production build. Right now anyone can open DevTools → Sources and read your full source code, component names, business logic, and content structure.

**Time:** 5 minutes + redeploy  
**File:** `vite.config.js` line with `sourcemap: true`

---

### 3. Fix sitemap domain

`public/sitemap.xml` currently lists all URLs as `https://mernify.com/...` — the wrong domain. The site is at `mernify.co`.

Open `public/sitemap.xml` and replace every instance of `https://mernify.com` with `https://mernify.co`.

Then resubmit the sitemap in Google Search Console.

**Time:** 10 minutes  
**File:** `public/sitemap.xml`

---

### 4. Confirm contact form lead delivery

The `ContactForm` component calls `submitContactForm()`, which uses `VITE_CONTACT_ENDPOINT` if available — but falls back to a `mailto:` link if not set.

**Check:**
```bash
# On your server or in your CI/CD pipeline:
echo $VITE_CONTACT_ENDPOINT
```

If this is empty or undefined, every form submission silently opens a mailto link instead of posting to a backend. Leads may be going nowhere.

**If you don't have a backend endpoint yet:**
- Use [Formspree](https://formspree.io) (free tier: 50 submissions/month)
- Or [Web3Forms](https://web3forms.com) (free, no account required)
- Set `VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-id` in your `.env.production`

**File:** `src/components/forms/ContactForm.jsx` → `submitContactForm` function  
**Time:** 30 minutes to set up Formspree + update env + redeploy

---

### 5. Fix character encoding artifacts in source files

Several source files contain garbled unicode characters that may render incorrectly depending on the browser/OS. Search and fix these:

```
Files to check:
- src/pages/ContactPage.jsx      → "A" artifact in meta list item
- src/components/forms/ContactForm.jsx  → "Sending…", "Select…", "let's"
- src/pages/AboutPage.jsx        → check support prop text
- index.html                     → title contains garbled char
```

The fix is to replace each artifact with the correct UTF-8 character:
- `Sending…` → `Sending...` or use the actual ellipsis `…` (U+2026)
- `let's` → `let's`
- Garbled chars in title → remove or retype

**Time:** 20 minutes

---

## 🟡 Priority 2 — This Week

### 6. Install Google Analytics 4

No analytics are currently installed on the site. Without this you cannot:
- Know how many visitors the site receives
- See which pages users visit
- Measure contact form submissions
- Run Google Ads or retargeting

**Steps:**
1. Create a GA4 property at https://analytics.google.com
2. Install via Google Tag Manager (preferred) or add the script directly to `index.html`
3. Set up a "Form Submit" conversion event

**Time:** 2–4 hours (including consent banner for GDPR)

---

### 7. Add GDPR consent management

The site embeds a Google Maps iframe (`ContactPage.jsx`) and links to Google Fonts — both of which load third-party cookies. This requires a consent banner under GDPR/PECR for EU visitors.

**Quick option:** [Cookiebot](https://www.cookiebot.com) or [Klaro](https://klaro.org) (open source)

**Also:** The Google Maps iframe loads unconditionally. Either replace it with a static image + link, or wrap it in a consent check so it only loads after the user accepts.

**Time:** 4–8 hours

---

### 8. Add security headers

Currently missing from HTTP responses:
- `Content-Security-Policy` — prevents XSS attacks
- `X-Frame-Options: DENY` — prevents clickjacking
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`

Add these to your nginx config:
```nginx
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

For CSP, generate a policy at https://report-uri.com/home/generate and add it when ready.

**Time:** 1 hour  
**File:** nginx server config

---

### 9. Add spam protection to contact form

The contact form has no reCAPTCHA or honeypot. Add a hidden honeypot field:

```jsx
{/* Hidden honeypot — bots fill this, humans don't */}
<input
  type="text"
  name="website"
  autoComplete="off"
  tabIndex={-1}
  aria-hidden="true"
  style={{ display: 'none' }}
/>
```

On the server side, reject any submission where this field is filled.

**Time:** 1 hour  
**File:** `src/components/forms/ContactForm.jsx`

---

## 🟢 Priority 3 — Next 2 Weeks

### 10. Add Open Graph + Twitter Card metadata

Every page shared on LinkedIn, Slack, or WhatsApp shows a blank preview because OG tags are missing.

In `src/components/seo/PageMeta.jsx`, add:
```jsx
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content="https://mernify.co/og-default.jpg" />
<meta property="og:url" content={`https://mernify.co${canonicalPath}`} />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content="https://mernify.co/og-default.jpg" />
```

Also create a 1200×630px OG image (`public/og-default.jpg`).

**Time:** 3–4 hours  
**File:** `src/components/seo/PageMeta.jsx`

---

### 11. Add structured data (JSON-LD)

No structured data exists. Add at minimum an `Organization` schema in `index.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mernify",
  "url": "https://mernify.co",
  "logo": "https://mernify.co/logo.svg",
  "email": "hello@mernify.com",
  "description": "Product engineering partner for startups and growing businesses.",
  "sameAs": [
    "https://www.linkedin.com/company/mernify",
    "https://www.instagram.com/mernify",
    "https://www.facebook.com/mernify"
  ]
}
</script>
```

**Time:** 1 hour  
**File:** `index.html`

---

### 12. Add Calendly / calendar booking

The contact page has a form but no direct calendar booking. This removes 15–25% of potential conversions from users who prefer to book a call rather than fill a form.

Add a Calendly embed or link button alongside the contact form.

**Time:** 2 hours  
**File:** `src/pages/ContactPage.jsx`

---

## Audit File Index

All findings are documented in `docs/mernify-website-audit/`:

| File | Contents |
|------|---------|
| `00-executive-summary.md` | Overall verdict, scores, top issues |
| `01-project-and-route-inventory.md` | Route table with live vs. code status |
| `02-functional-qa-audit.md` | Routing emergency + form/nav testing |
| `03-responsive-and-cross-browser-audit.md` | Mobile, tablet, breakpoint findings |
| `04-performance-and-technical-audit.md` | Bundle size, Three.js, Lighthouse estimate |
| `05-accessibility-audit.md` | WCAG 2.2 AA gaps |
| `06-seo-audit.md` | Sitemap, OG, structured data, meta |
| `07-product-positioning-analysis.md` | Messaging, positioning, differentiation |
| `08-ux-and-customer-journey.md` | Buyer journey gaps |
| `09-conversion-rate-audit.md` | CTA, form, friction analysis |
| `10-brand-and-visual-credibility.md` | Visual design, consistency |
| `11-case-study-and-portfolio-audit.md` | Portfolio quality and authorship review |
| `12-competitive-benchmark.md` | vs. top product engineering agencies |
| `13-cmo-growth-strategy.md` | Marketing recommendations |
| `14-sales-pitch-readiness.md` | Sales enablement gaps |
| `15-analytics-and-tracking-plan.md` | GA4 setup plan |
| `16-security-and-trust-review.md` | Security header and trust audit |
| `17-prioritized-implementation-roadmap.md` | Full 90-day roadmap |
| `Mernify-Complete-Website-Audit.md` | Master consolidated report |
| `evidence/live-site-browser-findings.md` | Raw browser test results |

---

**Questions?** Review the master report first: `Mernify-Complete-Website-Audit.md`  
**Start here:** Fix #1 (nginx routing) — everything else depends on pages being reachable.
