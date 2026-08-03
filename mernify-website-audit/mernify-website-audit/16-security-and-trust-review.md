# Phase 16: Security and Trust Review

**Audit Date:** 2026-07-30  
**Method:** Source code analysis, public HTTP inspection  
**Note:** This is a non-destructive review only. No penetration testing, exploitation, or credential attacks were performed.

---

## 16.1 Security Checklist

| Check | Status | Notes |
|-------|--------|-------|
| HTTPS enforced | ✅ Expected | Live site at `https://mernify.co/` |
| Mixed content | Unknown | Requires live browser inspection |
| Exposed environment variables | ✅ Not found in code | `VITE_CONTACT_ENDPOINT` is a runtime env var, not hardcoded |
| Public API keys | ✅ Not found | No API keys visible in source |
| Secrets committed to frontend | ✅ Not found | No passwords or tokens in source |
| Source maps exposed | ❌ **Critical Risk** | `sourcemap: true` in `vite.config.js` |
| Form input sanitization | ⚠️ Unknown | Client-side validation present; server-side depends on endpoint |
| Unsafe external links | ⚠️ Review needed | External links need `rel="noopener noreferrer"` |
| Missing `rel="noopener"` | ⚠️ Risk | External links in case studies need verification |
| Dependency vulnerabilities | ⚠️ Unknown | `npm audit` not run — should be checked |
| Error messages revealing tech | ⚠️ Verify | 404 page should not reveal framework details |
| Security headers | ❌ Unknown | Cannot verify without HTTP response inspection |
| Privacy handling | ⚠️ Partial | Privacy policy exists but Google Maps loads without consent |
| Cookie handling | ❌ No consent | No cookie consent mechanism |
| Form spam protection | ❌ Missing | No CAPTCHA or honeypot |

---

## 16.2 Critical Security Issues

### Issue SEC-001 (P0): Source Maps Exposed in Production

**Evidence:** `vite.config.js`:
```js
build: {
  target: 'es2020',
  cssCodeSplit: true,
  sourcemap: true,  // ← EXPOSES FULL SOURCE CODE
}
```

**Description:** When `sourcemap: true` is set in a production Vite build, the bundled JavaScript files include references to `.map` files that contain the complete, human-readable source code. Any person who opens browser DevTools → Sources can navigate the full React component tree, read all content data files, and see the complete application structure.

**Specific risks:**
- Competitors can read exact component implementations and content strategy
- Case study content (including pending/private entries) is readable
- Form handling logic is fully exposed
- Any future environment variables embedded at build time would be visible

**Fix:** `sourcemap: false` in `vite.config.js` for production, or use `sourcemap: 'hidden'` for internal debugging only.  
**Effort:** XS (10 minutes)  
**Priority:** P0

### Issue SEC-002 (P1): No Content Security Policy

**Description:** Without a Content Security Policy (CSP) header, the website is vulnerable to:
- Cross-site scripting (XSS) injection
- Clickjacking (embedding the site in an iframe)
- Data injection attacks

**Recommended CSP (minimal):**
```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  frame-src https://www.google.com/maps/;
  connect-src 'self';
  font-src 'self';
```

**Implementation:** Server/hosting level (not React code).  
**Effort:** S  
**Priority:** P1

### Issue SEC-003 (P1): No X-Frame-Options Header

**Description:** Without `X-Frame-Options: DENY` (or `SAMEORIGIN`) header, the Mernify website can be embedded in an iframe on any third-party website. This enables:
- Clickjacking attacks (tricking users into clicking hidden elements)
- Brand reputation damage from embedding in inappropriate contexts

**Fix:** Add `X-Frame-Options: DENY` at the server level.  
**Effort:** XS  
**Priority:** P1

### Issue SEC-004 (P2): Google Maps Iframe Without Consent

**Evidence:** `ContactPage.jsx`:
```jsx
<iframe
  title="Mernify remote delivery map"
  src="https://www.google.com/maps/embed?pb=..."
/>
```

**Description:** The Google Maps embed loads when the contact page is visited, regardless of whether the user has given consent for third-party cookies. Google Maps sets cookies and tracking pixels from Google's advertising network.

**GDPR Impact:** Under GDPR and PECR, non-essential cookies (including Google Maps tracking) require explicit user consent before loading. Operating without this consent exposes Mernify to potential regulatory risk if serving EU-based users.

**Fix:** Load the map only after cookie consent is given, using a consent-gated embed approach.  
**Effort:** S  
**Priority:** P2

### Issue SEC-005 (P2): No Contact Form Spam Protection

**Evidence:** `ContactForm.jsx` — no CAPTCHA, no honeypot, no rate limiting  
**Description:** The contact form has no protection against automated submission. A bot can flood the form (and any connected inbox/CRM) with spam at high volume.

**Fix options:**
1. Add Google reCAPTCHA v3 (invisible, no user friction)
2. Add a honeypot hidden field
3. Add server-side rate limiting on the form endpoint
4. Use Cloudflare Turnstile (privacy-respecting CAPTCHA alternative)

**Effort:** XS–S  
**Priority:** P2

---

## 16.3 External Link Security

All external links should include `rel="noopener noreferrer"` to prevent:
- The target page accessing `window.opener` (tabnapping attack)
- The target page receiving the HTTP Referer header (privacy leak)

**Observed in case studies:**
- `liveUrl: 'https://tailorize.sa/en'` — if rendered as `<a href="..." target="_blank">`, needs `rel="noopener noreferrer"`

**Recommendation:** Verify all external links (especially case study live URLs) have correct `rel` attributes.

---

## 16.4 Dependency Vulnerability Assessment

**Command to run:** `cd "C:\Users\MT\Projects\mernify" && npm audit`

*This was not run during the audit. It should be run by the development team.*

**Known risk areas:**
- `gsap` — animation library, typically low vulnerability risk
- `three` — WebGL library; periodic security updates
- `react` and `react-dom` — React 19 is current; typically low risk
- `lenis` — smaller library; verify last security update
- `vite` — build tool; major security updates occasionally

**Recommendation:** Run `npm audit` and address any `high` or `critical` severity vulnerabilities before launching paid marketing campaigns.

---

## 16.5 Trust Signals for B2B Buyers

| Trust Element | Status | Notes |
|--------------|--------|-------|
| HTTPS certificate | ✅ Expected | Standard TLS |
| Privacy policy | ✅ Present | `/privacy` route |
| Terms of service | ✅ Present | `/terms` route |
| Professional email domain | ✅ `info@mernify.co` | Not `@gmail.com` |
| Company registration | Unknown | Not mentioned on website |
| Physical address | ❌ Not stated | "Remote-first" noted |
| Phone number | ❌ Not present | Email only |
| Social media presence | ❌ Not linked | No LinkedIn, Twitter/X |
| Client references | ⚠️ Partial | Tailorize (unverified authorship) |

---

## 16.6 Privacy Policy Assessment

The website has a privacy policy at `/privacy`. Without reading the full document, key questions to verify:

- [ ] Does it accurately describe data collection (form submissions, cookies)?
- [ ] Is there a section about Google Maps data collection?
- [ ] Is there contact information for data subject requests?
- [ ] Has it been reviewed by legal counsel?
- [ ] Does it reference GDPR compliance?
- [ ] Does it have a "last updated" date?
- [ ] Is it written in plain language (not pure legalese)?

**Recommendation:** Have the privacy policy reviewed by a lawyer familiar with GDPR and PECR before any EU-targeted marketing campaigns.

---

## 16.7 Security Score

| Dimension | Score | Notes |
|-----------|-------|-------|
| HTTPS | 9/10 | Expected correct |
| Source code protection | 1/10 | Source maps exposed in production |
| Input security | 5/10 | Client validation OK; server-side unknown |
| Third-party security | 4/10 | Maps without consent; no CSP |
| Spam protection | 2/10 | No CAPTCHA or honeypot |
| Security headers | Unknown | Cannot assess without live inspection |
| Privacy compliance | 4/10 | Policy exists; Maps consent missing |
| Dependency security | Unknown | `npm audit` not run |
| **Overall security score** | **4/10** | Source maps + no CSP are the critical risks |
