# Creative Directions
*Three concepts evaluated · 2026-07-24*

---

## Concept A — "Modular Product Universe"

**Central metaphor**: The Mernify website *is* the product universe. Every section is a planet or node in a connected system. The visitor navigates through the universe.

**Hero description**: A Three.js scene with navigable 3D space. Floating product nodes (web, mobile, AI, cloud) orbit a central Mernify geometry. Cursor tilts the camera. Scroll zooms into the first node.

**Signature interaction**: Camera movement through a product graph. Clicking a node navigates to the service page.

**Homepage journey**: Universe → zoom into web product → zoom into mobile → zoom into AI → zoom out to full system.

**Advantages**:
- Extremely memorable and ownable
- Technically impressive
- Reinforces the "connected systems" brand message

**Risks**:
- High WebGL dependency — performance risk on mobile and low-end devices
- Easy to feel like a tech demo rather than a service company
- Navigation might confuse users unfamiliar with 3D space
- Accessibility is very difficult — keyboard navigation of 3D space is non-trivial
- Build time: 2–3× higher than other concepts

**Performance impact**: High. Full Three.js scene for entire homepage.

**Mobile adaptation**: Degraded to a 2D representation — poor mobile experience.

**Why it may not be ownable**: Space/universe metaphors are common in SaaS marketing. Linear, Vercel, and others have used similar 3D canvas approaches.

**Score: 6/10** — Too risky for a commercial product engineering site.

---

## Concept B — "Digital Product Assembly Line" ✓ SELECTED

**Central metaphor**: A product doesn't appear — it is assembled. The homepage shows the assembly in progress. By the time the visitor reaches the CTA, they have watched a product be built.

**Hero description**: Three isolated geometric modules (derived from the Mernify M-form) orbit slowly on load. A GSAP timeline assembles them into the Mernify mark, which then expands into four product-layer panels. Cursor movement creates subtle perspective depth via CSS `perspective` + `transform`. On scroll, the panels begin to separate and flow into the next section.

**Signature interaction**: The assembly sequence. Cursor depth. Scroll-triggered panel evolution.

**Homepage journey**:
1. Hero: Modules assemble → product universe opens
2. Scroll story: Product builds through 4 stages
3. Industry: One environment transforms for 10 industries
4. AI: Workflow animates step by step
5. Architecture: Layers stack and connect
6. Human: Calm editorial contrast
7. CTA: Modules reassemble — the cycle completes

**Advantages**:
- Directly extends Mernify's own logo geometry — fully ownable
- Story is commercially clear: "we assemble your product"
- Performance feasible: hero uses lightweight Three.js or SVG; rest uses CSS + GSAP
- Degrades gracefully: each section has a meaningful static state
- Mobile: simplified assembly with CSS transforms (no WebGL required below hero)
- Accessibility: all interactive content has keyboard equivalents and static fallbacks

**Risks**:
- Hero animation requires careful choreography to avoid looking like "random shapes moving"
- The assembly metaphor can feel mechanical if copy doesn't humanize it
- Scroll story section needs careful performance management on scroll

**Performance impact**: Medium. Hero: ~60KB Three.js scene (or SVG fallback). Remaining sections: CSS + GSAP only.

**Mobile adaptation**: Hero uses CSS/SVG assembly. Scroll story becomes vertical narrative. Industry uses swipe/tap. Architecture uses tap-to-reveal.

**Why it is ownable**: No competitor uses a logo-derived modular assembly as their primary visual language. Narsun has a circular arc; SSI has floating glass blocks; neither is connected to their logo's actual geometry.

**Score: 9/10** — Best balance of wow factor, feasibility, and brand ownership.

---

## Concept C — "Connected Intelligence"

**Central metaphor**: Everything Mernify builds is connected. The homepage is a live visualization of connections forming — between people, systems, data, and products.

**Hero description**: Animated graph/network of nodes and edges. As the page loads, nodes appear and connections form. Copy appears at intersections. The network slowly breathes and pulses.

**Signature interaction**: Hovering a node reveals a service or technology label. Clicking connects the visitor to the relevant section.

**Homepage journey**: Sparse network → connections form → dense connected product system → narrative sections explaining each connection type.

**Advantages**:
- "Connected" is a strong engineering metaphor
- Network visualization is technically achievable with Canvas/SVG
- Can communicate the breadth of Mernify's capabilities elegantly

**Risks**:
- Network/graph visualizations are extremely common in AI and data companies
- The metaphor doesn't differentiate between Mernify and any connected-data business
- Navigating by clicking network nodes is confusing UX
- The aesthetic can easily look like a generic tech conference slide

**Performance impact**: Medium-low. Canvas-based network is lightweight.

**Mobile adaptation**: Static network image with narrative text. Loses the "connected" effect.

**Why it may not be ownable**: Network/connection visualizations are used by virtually every AI platform, data company, and enterprise integration business. Not distinctive enough for a product engineering company.

**Score: 6/10** — Technically feasible but not ownable.

---

## Selection Rationale

**Concept B** is selected.

The assembly metaphor is the only concept that:
1. Directly derives from Mernify's own logo geometry
2. Tells the product engineering story ("we build your product") without abstraction
3. Is technically feasible within the current stack (Three.js + GSAP + CSS)
4. Produces strong static states if animation fails
5. Adapts to mobile without a degraded experience
6. Cannot be reasonably attributed to any competitor
7. Scales across all 8 homepage sections without feeling forced
