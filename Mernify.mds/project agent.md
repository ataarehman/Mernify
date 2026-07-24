# Mernify Website Project Instructions

## Project Objective

Build Mernify as a premium product engineering company website for startups,
growing businesses, enterprises, digital agencies, product owners, and CTOs.

Mernify must not look like a low-cost outsourcing company or a generic software
agency. It should appear focused, credible, technically capable, modern, and
enterprise-ready.

## Authoritative Project Sources

Before designing or modifying the website, read:

1. Mernify Brand Guidelines.pdf
2. Competitor Analysis.txt
3. The approved Mernify website reference image in the project root
4. Existing source code, public assets, package.json, and README.md

The brand guideline and approved visual reference take priority over assumptions.

## Brand Position

Mernify is a Product Engineering Company that designs, develops, launches, and
scales web applications, mobile applications, SaaS platforms, AI-powered
software, and cloud-native products.

Primary brand message:

"We design, engineer and scale digital products."

Primary tagline:

"Build Modern. Scale Confidently."

Primary website headline:

"We Design, Engineer and Scale Digital Products."

## Competitive Direction

Use the competitor research to understand positioning and quality standards.

Learn from:

- tkxel: business-first messaging, case-study structure, and credibility.
- Narsun Studios: specialization, premium presentation, and visual storytelling.
- Elytra Studios: simple service communication and creative presentation.
- SSI Decisions: industry depth, enterprise trust, and solution expertise.
- Stripe: visual hierarchy and polished interactive product storytelling.
- Vercel: clarity, spacing, typography, and technical confidence.
- Linear: dark UI, precision, motion, and premium product presentation.
- Apple: disciplined spacing, simplicity, and product-focused storytelling.

Do not copy layouts, wording, illustrations, logos, or proprietary assets from
competitors.

## Brand Colors

- Primary Indigo: #4F46E5
- Electric Cyan: #06B6D4
- Dark Background: #07111F
- Dark Surface: #101B2E
- Midnight Navy: #0F172A
- Main Text: #1E293B
- Secondary Text: #64748B
- Light Background: #F8FAFC
- White: #FFFFFF
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444

Primary gradient:

#4F46E5 → #06B6D4

Use gradients selectively. Do not cover every section with gradients.

## Typography

Preferred:

- Headings: Satoshi, Space Grotesk, or a legally available close alternative.
- Body: Inter.

Do not download or bundle unlicensed font files.

## Visual Direction

The website must feel:

- Premium
- Product-focused
- Modern
- Spacious
- Technically credible
- Enterprise-ready
- Startup-friendly
- Minimal but not empty
- Visually rich without becoming decorative

Use:

- Dark hero section
- Light content sections
- Product dashboards
- Device mockups
- Subtle grid patterns
- Controlled gradient lighting
- Soft borders
- Rounded cards
- Strong typography
- Real product interface compositions
- Restrained glass effects
- Purposeful motion

Avoid:

- Generic stock photographs
- Random developers looking at screens
- Excessive glassmorphism
- Neon cyberpunk visuals
- Floating technology icons without meaning
- Huge areas of empty space
- Excessive gradients
- Template-style service cards
- Fake client logos
- Fake testimonials
- Fake company statistics
- Unverified awards or certifications
- Generic text such as "innovative solutions"



## Content Rules

Write content around business outcomes, not programming languages.

Do not lead with MERN, MEAN, React, Angular, MongoDB, or Node.js.

Lead with:

- Product Engineering
- SaaS Development
- Web Platforms
- Mobile Applications
- AI and Automation
- Cloud Engineering
- Product Strategy
- Dedicated Product Teams

Technology names may appear in the technology section and detailed service pages.

Never invent:

- Customers
- Testimonials
- Revenue figures
- Project numbers
- Employee numbers
- Certifications
- Ratings
- Case-study results

Where real data is unavailable, use clearly labeled content placeholders or omit
the section until verified data is available.

## Homepage Structure

1. Header and navigation
2. Premium hero
3. Credibility or technology strip
4. Core services
5. Industries
6. Why Mernify
7. Featured case studies
8. Development process
9. AI and automation
10. Technology ecosystem
11. Testimonials, only when real content exists
12. Frequently asked questions
13. Final call to action
14. Premium footer



## Required Pages

- Home
- Services
- Product Engineering
- SaaS Development
- Web Development
- Mobile App Development
- AI and Automation
- Cloud and DevOps
- Industries
- Case Studies
- About
- Contact
- Privacy Policy
- Terms of Service

Use reusable page templates where appropriate.

## Development Requirements

- Preserve the current framework unless a migration is technically justified.
- Inspect package.json before installing dependencies.
- Avoid unnecessary dependencies.
- Use reusable and composable React components.
- Use semantic HTML.
- Maintain consistent spacing tokens.
- Build a documented design-token system.
- Keep component files maintainable.
- Remove unused code and assets.
- Do not leave duplicated sections.
- Do not use lorem ipsum.
- Do not expose secrets.
- Do not modify unrelated repositories.



## Responsive Requirements

Test at minimum:

- 1440px desktop
- 1280px laptop
- 1024px tablet landscape
- 768px tablet
- 390px mobile
- 360px small mobile

No clipped text, horizontal overflow, overlapping cards, unreadable font sizes,
or broken menus are acceptable.

## Accessibility Requirements

- Keyboard-accessible navigation
- Visible focus states
- Semantic heading order
- Accessible form labels
- Sufficient contrast
- Meaningful alt text
- Reduced-motion support
- Accessible mobile menu
- No essential information conveyed through color alone



## Performance Requirements

Optimize:

- Image sizes
- Lazy loading
- Font loading
- Component rendering
- JavaScript bundle size
- Animation performance
- Layout stability

Animations must use transform and opacity where possible.

## SEO Requirements

Every public page must have:

- Unique title
- Meta description
- Canonical handling
- Open Graph metadata
- Semantic headings
- Internal linking
- Descriptive URLs
- Relevant structured data where appropriate
- Sitemap and robots configuration



## Testing Requirements

Before declaring completion:

1. Run linting.
2. Run the production build.
3. Start the application.
4. Use Playwright or Cursor Browser to visit every route.
5. Test every navigation link and CTA.
6. Test the contact form.
7. Test desktop, tablet, and mobile layouts.
8. Inspect browser console errors.
9. Check for missing assets.
10. Check accessibility basics.
11. Capture final screenshots.
12. Generate a final QA report.

Do not claim completion if any critical route, CTA, form, or layout is broken.