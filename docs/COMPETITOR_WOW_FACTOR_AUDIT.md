# Competitor Wow Factor Audit
*Captured 2026-07-24 · Desktop @ 1440px · Mobile @ 390px*

Screenshots: `docs/screenshots/competitor-audit/`

---

## 1. Narsun Studios — narsunstudios.com/en

### Above the fold (desktop)
Dark nearly-black background with a large circular GSAP/SVG progress element forming in the center. Bold left-aligned headline at enormous scale. Trust badge (Clutch 4.8/5) immediately below the primary CTA. Secondary CTA on the far right.

### What works
- **Signature visual moment**: Animated circle forming on load — feels like the interface initialising. Creates immediate intrigue.
- **Trust in the hero**: Clutch badge + review count is below the fold fold and visible without scrolling. Hard evidence, not generic logos.
- **Typography scale**: Headline fills ~55% of viewport width — commanding presence.
- **Layout asymmetry**: Copy left-heavy, animation right-center. Not a centred SaaS template.
- **Mobile**: Headline remains enormous. Body copy below, then full-width CTA button. Very clean.

### Signature interaction
Circular arc drawing animation on load, likely SVG `stroke-dashoffset` or GSAP `drawSVG`. Mouse parallax shifts the circle slightly.

### Storytelling method
Immediate bold claim — "The AI + Digital Twin Studio Built For The World's Most Ambitious Markets." Then proof: client types, geographies, Clutch reviews. Aspiration → evidence.

### Trust-building
Clutch badge with stars directly below the primary CTA. No fake stat counters. Real review aggregator.

### Emotional effect
Commands attention. "These people are serious" is the instant impression. Not approachable-startup, but premium-powerful.

### Technical implementation
- SVG stroke animation with GSAP DrawSVG or CSS `stroke-dashoffset` transition
- GSAP ScrollTrigger for section reveals
- Lenis or native smooth scroll
- Probable use of GSAP SplitText for heading reveals

### What Mernify can learn
- Hero animations work best when they reinforce the brand metaphor (formation, connection, assembly)
- Clutch/G2 badge placement is a conversion pattern worth adopting when earned
- Left-heavy asymmetric hero feels premium vs centred SaaS
- Giant typography is readable and memorable

### What Mernify must not copy
- The specific circle animation (their trademark visual)
- "AI + Digital Twin" positioning
- Identical dark-navy + blue-CTA palette (too similar to current Mernify)

---

## 2. Elytra Studios — elytrastudios.com

### Above the fold (desktop)
Full-black screen with a loading experience: name in spaced caps, percentage counter. The site requires ~2s loading before anything appears. After load, likely transitions into a creative studio showcase.

### What works
- **Premium positioning**: A loading screen tells users "this is worth waiting for." Experimental creative studios can get away with this.
- **Restraint**: Nothing competes with the name during load. Single-minded.

### What doesn't work (Mernify lesson)
- **Fatal for a product engineering company**: Client-facing B2B buyers have zero patience for a loading screen. The Elytra model works for an experimental studio seeking creative clients — catastrophic for enterprise software buyers.
- **No above-fold content strategy**: A CEO evaluating SaaS development partners will leave before the page loads.
- **Mobile**: The loading bar is fine but if mobile connectivity is poor, the user sees a black screen indefinitely.

### Signature interaction
Likely WebGL or Canvas scene that transitions from the loading reveal. Probably a minimal, kinetic typographic or 3D object experience.

### Storytelling method
Experience-first, information later. Mood-setting before message.

### Trust-building
None visible in the loading state. Presumably portfolio-forward after load.

### Emotional effect
Mystique. Intrigue. "These are serious creatives." — but not engineers, not enterprise partners.

### What Mernify can learn
- Premium loading transitions add perceived quality — but must be fast (<1s) and skippable
- Minimal typographic reveals create elegance when pacing is right
- Black + white + one accent is a clean foundation

### What Mernify must not copy
- The loading screen approach (kills B2B conversion)
- The experimental/art-direction positioning
- Content-behind-load patterns

---

## 3. Tkxel — tkxel.com

### Above the fold (mobile @ 390)
Bright indigo-to-blue gradient background. Bold headline with "AI." highlighted in gradient. Clean body copy. A single full-width outlined CTA. Below: pill/tag row of AI service categories (Discovery, Automation, Agents, Ops).

### What works
- **Immediate commercial clarity**: You know exactly what they do in 3 seconds.
- **Category pills**: Service labels as interactive pills rather than cards — scannable, space-efficient.
- **Mobile-first feel**: Text is large, button is full-width, very clean.
- **Business-outcome messaging**: "connect AI to real workflows" — benefits, not features.

### What doesn't work
- **Generic gradient**: Blue gradient hero is extremely common in the tech space. Not ownable.
- **Desktop (from audit context)**: Section transitions feel template-like. Card grids are predictable.
- **Photography**: Stock photography in case studies undermines credibility.

### Signature interaction
Pill/tag filtering on service categories. Smooth hover states. Likely GSAP or CSS transitions on section reveals.

### Storytelling method
Problem → solution → proof. Structured like a pitch deck.

### Trust-building
Client logos, case studies, award badges. Standard but credible.

### Emotional effect
Professional. Trustworthy. Slightly generic at the section level.

### What Mernify can learn
- Category/pill navigation pattern is good for services — users scan and self-select
- Commercial clarity and outcome-focused copy converts better than atmospheric copy
- Full-width CTAs on mobile are effective

### What Mernify must not copy
- Blue gradient hero (too generic, too similar)
- Card-grid service layout
- Stock case study photography

---

## 4. SSI Decisions — ssidecisions.com

### Above the fold (desktop)
Light background (almost white/grey). 3D glass + metal modular blocks floating in a rendered space — like a data center or enterprise architecture visualization. Bold headline, standard nav. Red CTA button.

### What works
- **3D modular environment**: The floating glass blocks create immediate architectural/enterprise credibility. Tells you "complex systems" without saying it.
- **Light theme**: Stands out strongly from the dark-hero crowd. Immediately different.
- **Spatial depth**: 3D scene gives the page a sense of scale.

### What doesn't work
- **Corporate/dated**: The overall feel is heavy enterprise, not modern product engineering.
- **3D style**: The glass block aesthetic looks like a 2018 enterprise tech website. Not cutting-edge.
- **Navigation**: No mega menu, no services preview. Basic nav feels like a missed opportunity.
- **Typography**: Competent but not distinguished.

### Signature interaction
3D rendered video/WebGL background with floating architectural elements. Parallax on scroll.

### Storytelling method
Architecture visualization → credibility claim → case evidence. Enterprise proof-first.

### Trust-building
Enterprise partner logos (healthcare system), case study featured in hero.

### Emotional effect
"Serious enterprise company." But cold. No approachability.

### What Mernify can learn
- Architectural 3D can communicate engineering credibility powerfully
- Light sections provide contrast when surrounded by dark UI
- Modular/connected geometry communicates "systems thinking"
- Featured partnership in hero is powerful when real

### What Mernify must not copy
- The glass block 3D aesthetic (dated)
- The cold enterprise tone
- Light-only hero (Mernify's dark is more premium for its audience)

---

## Summary Matrix

| Dimension | Narsun | Elytra | Tkxel | SSI |
|---|---|---|---|---|
| First impression | Powerful | Mystifying | Clear | Corporate |
| Load experience | Fast + engaging | Slow (loading screen) | Fast | Fast |
| Hero animation | Strong (SVG arc) | Blocking loader | Gradient only | 3D blocks |
| Commercial clarity | Medium | Low | High | Medium |
| Trust building | Clutch badge | None visible | Client logos | Case + partner |
| Mobile quality | Excellent | Unknown | Excellent | Adequate |
| Template feel | Low | Low | Medium | High |
| Memorability | High | High | Low | Medium |
| B2B conversion focus | Medium | Low | High | High |

**The gap Mernify can own**: Premium visual experience (Narsun/Elytra level) + commercial B2B clarity (Tkxel level) + architectural credibility (SSI level). No competitor occupies all three simultaneously.
