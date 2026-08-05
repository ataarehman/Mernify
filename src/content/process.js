export const processSteps = [
  {
    id: 'discover',
    title: 'Discover',
    summary: 'Understand business goals, users, constraints, and success metrics.',
    outputs: ['Problem framing', 'Stakeholder map', 'Success criteria', 'Risk notes'],
  },
  {
    id: 'plan',
    title: 'Plan',
    summary: 'Define scope, architecture direction, timeline, and delivery model.',
    outputs: ['MVP scope', 'Architecture outline', 'Delivery plan', 'Estimate ranges'],
  },
  {
    id: 'design',
    title: 'Design',
    summary: 'Shape journeys, interfaces, and prototypes before expensive build cycles.',
    outputs: ['User flows', 'UI system direction', 'Prototypes', 'Build-ready specs'],
  },
  {
    id: 'develop',
    title: 'Develop',
    summary: 'Implement with clean architecture, secure defaults, and reviewable increments.',
    outputs: ['Working increments', 'API contracts', 'Code reviews', 'Environment setup'],
  },
  {
    id: 'test',
    title: 'Test',
    summary: 'Verify quality, performance, accessibility, and release readiness.',
    outputs: ['QA reports', 'Defect triage', 'Performance checks', 'Release checklist'],
  },
  {
    id: 'launch',
    title: 'Launch',
    summary: 'Deploy with monitoring, rollback readiness, and clear ownership.',
    outputs: ['Production release', 'Monitoring baseline', 'Runbooks', 'Handover notes'],
  },
  {
    id: 'improve',
    title: 'Improve',
    summary: 'Measure, support, and iterate so the product keeps creating value.',
    outputs: ['Backlog of improvements', 'Support cadence', 'Metric reviews', 'Roadmap updates'],
  },
]

export const homeProcess = {
  eyebrow: 'How we work',
  title: 'A clear path from discovery to continuous improvement',
  support:
    'Every stage produces tangible artifacts—so stakeholders always know what was decided, built, and verified.',
  steps: processSteps,
}

/**
 * Long-form stage detail for /process. Each entry deepens the shared
 * `processSteps` entry above and names the handoff into the next stage, so the
 * journey reads as one continuous loop rather than seven isolated boxes.
 */
const STAGE_DETAIL = {
  discover: {
    lead: 'Pin down the outcome',
    summary:
      'We establish the business outcome, the people who depend on it, and the constraints around it—before a single line of code is justified.',
    duration: '1–2 weeks',
    activities: [
      'Stakeholder and end-user interviews',
      'Audit of current systems, data, and integrations',
      'Constraint, compliance, and risk mapping',
      'Success metrics everyone signs off on',
    ],
    outputs: ['Problem statement', 'Stakeholder map', 'Success criteria', 'Risk register'],
    handoff: 'A validated problem definition moves into Plan.',
  },
  plan: {
    lead: 'Shape the route',
    summary:
      'The problem becomes a scoped, sequenced, and estimated delivery plan, with an architecture chosen to fit it rather than the other way around.',
    duration: '1–2 weeks',
    activities: [
      'MVP scoping and ruthless prioritisation',
      'Architecture and stack decision records',
      'Team shape, cadence, and delivery model',
      'Estimate ranges with named assumptions',
    ],
    outputs: ['MVP scope', 'Architecture outline', 'Delivery roadmap', 'Estimate ranges'],
    handoff: 'An agreed scope and architecture move into Design.',
  },
  design: {
    lead: 'Prove the experience',
    summary:
      'We resolve the experience in flows, interfaces, and clickable prototypes while changes still cost hours instead of sprints.',
    duration: '2–4 weeks',
    activities: [
      'Journey mapping and information architecture',
      'Interface system and component direction',
      'Clickable prototypes validated with real users',
      'Build-ready specs including edge-case states',
    ],
    outputs: ['User flows', 'UI system', 'Interactive prototype', 'Build-ready specs'],
    handoff: 'Validated designs and specs move into Develop.',
  },
  develop: {
    lead: 'Build in the open',
    summary:
      'Engineering runs in reviewable increments with clean architecture, typed contracts, secure defaults, and CI from the first commit.',
    duration: '2-week sprints',
    activities: [
      'Vertical slices shipped to staging each sprint',
      'Typed API contracts and clean architecture',
      'Peer review and static analysis on every change',
      'CI/CD pipelines with environment parity',
    ],
    outputs: ['Working increments', 'API contracts', 'Reviewed codebase', 'Live environments'],
    handoff: 'Every increment moves straight into Test.',
  },
  test: {
    lead: 'Verify continuously',
    summary:
      'Behaviour, performance, accessibility, and security are verified as the product is built—never rushed into the week before launch.',
    duration: 'Continuous',
    activities: [
      'Automated unit, integration, and end-to-end coverage',
      'Exploratory and cross-device testing',
      'Performance budgets and accessibility audits',
      'Severity-ranked defect triage',
    ],
    outputs: ['Coverage reports', 'Defect log', 'Performance results', 'Release checklist'],
    handoff: 'A signed-off release candidate moves into Launch.',
  },
  launch: {
    lead: 'Ship with control',
    summary:
      'Release happens with monitoring, rollback, and ownership agreed in advance, so going live is a routine step instead of an event.',
    duration: '1 week',
    activities: [
      'Staged rollout with a tested rollback path',
      'Monitoring, logging, and alerting baseline',
      'Runbooks and named on-call ownership',
      'Team walkthrough and formal handover',
    ],
    outputs: ['Production release', 'Monitoring baseline', 'Runbooks', 'Handover pack'],
    handoff: 'A live, observable product moves into Improve.',
  },
  improve: {
    lead: 'Compound the value',
    summary:
      'We measure against the criteria agreed in Discover, then iterate on what the data shows rather than what anyone assumed.',
    duration: 'Ongoing',
    activities: [
      'Metric reviews against the original success criteria',
      'Usage analysis and structured feedback loops',
      'Backlog ranked by measured impact',
      'Dependency, security, and performance upkeep',
    ],
    outputs: ['Metric reviews', 'Ranked backlog', 'Support cadence', 'Roadmap updates'],
    handoff: 'What we learn opens the next Discover cycle.',
  },
}

export const processPage = {
  hero: {
    title: 'Process',
    supportLead: 'From first conversation to production—with reviewable proof at every',
    supportAccent: 'stage',
  },
  philosophy: {
    eyebrow: 'Operating principles',
    title: 'Delivery works when every decision is visible',
    support:
      'We run the same operating system on every engagement: frame the problem, agree the plan, then ship in slices you can open and challenge. No black boxes, no status theatre, no milestone that only makes sense to us.',
    principles: [
      {
        id: 'evidence',
        title: 'Evidence over opinion',
        text: 'Scope, architecture, and priorities are settled with research, prototypes, and measurements—not by whoever is most senior in the room.',
      },
      {
        id: 'increments',
        title: 'Reviewable increments',
        text: 'Work lands in slices you can run, test, and reject. Risk surfaces within days instead of arriving at the end of a quarter.',
      },
      {
        id: 'artifacts',
        title: 'Artifacts that outlive us',
        text: 'Specs, decision records, runbooks, and test suites ship alongside the code, so your team fully owns the system at handover.',
      },
    ],
  },
  journey: {
    eyebrow: 'The delivery journey',
    title: 'Seven stages, one continuous loop',
    support:
      'The same sequence runs on every engagement. Durations flex with scope—the discipline does not. Each stage ends with artifacts you approve before the next one starts.',
    panelLabel: 'Current stage',
    progressLabel: 'Journey progress',
    note: 'Stage durations are typical ranges for a mid-sized product build and are confirmed during Plan.',
    items: processSteps.map((step) => ({
      id: step.id,
      title: step.title,
      ...STAGE_DETAIL[step.id],
    })),
  },
  difference: {
    eyebrow: 'Why it works',
    title: 'What teams notice once we start',
    support:
      'Most agencies have a process deck. The difference is whether you can watch it run—and steer it—while the work is still happening.',
    points: [
      {
        id: 'visible',
        title: 'Nothing happens off-screen',
        text: 'Roadmaps, blockers, and trade-offs live in shared tools you can open at any hour, so progress never depends on a weekly summary.',
      },
      {
        id: 'sector',
        title: 'Sector-aware defaults',
        text: 'Healthcare, fintech, logistics, and field operations each change how we scope, secure, and sequence the build from day one.',
      },
      {
        id: 'quality',
        title: 'Quality runs in parallel',
        text: 'Tests, accessibility, and performance budgets are part of the sprint—not a phase that quietly gets cut when the timeline tightens.',
      },
      {
        id: 'ownership',
        title: 'You own everything',
        text: 'Code, designs, infrastructure, and documentation are yours from the first commit. No lock-in, no proprietary layer to license later.',
      },
    ],
  },
  quality: {
    eyebrow: 'Quality assurance',
    title: 'Quality is never a launch-week problem',
    support:
      'Testing is layered and continuous. Every layer has an owner, a trigger, and an artifact you can actually read.',
    pillars: [
      {
        id: 'automated',
        title: 'Automated coverage',
        text: 'Unit, integration, and end-to-end suites run on every pull request, so regressions fail the build long before they reach a user.',
      },
      {
        id: 'exploratory',
        title: 'Exploratory & acceptance',
        text: 'Testers probe the edges automation cannot predict, then stakeholders sign off against the acceptance criteria agreed in Plan.',
      },
      {
        id: 'a11y',
        title: 'Accessibility & performance',
        text: 'WCAG 2.2 AA reviews, Core Web Vitals budgets, and real-device checks are completed before anything is described as done.',
      },
      {
        id: 'security',
        title: 'Security & release gates',
        text: 'Dependency scanning, secret detection, and a release checklist covering monitoring, rollback, and ownership guard every deploy.',
      },
    ],
  },
  collaboration: {
    eyebrow: 'Working together',
    title: 'A rhythm that keeps decisions moving',
    support:
      'Delivery stalls when people wait for answers. We agree the cadence in week one so nobody is ever blocked in silence.',
    channels: [
      {
        id: 'sync',
        title: 'Weekly delivery sync',
        text: 'Thirty focused minutes on what shipped, what you need to decide, and the next slice heading into build.',
      },
      {
        id: 'async',
        title: 'Async by default',
        text: 'Written updates, recorded demos, and a live board keep progress visible without adding another standing meeting.',
      },
      {
        id: 'review',
        title: 'Stage reviews',
        text: 'A formal checkpoint closes every stage. Artifacts are approved before the next block of investment begins.',
      },
      {
        id: 'access',
        title: 'Direct engineer access',
        text: 'A named delivery lead plus a shared channel with the people actually writing the code—no account-manager relay.',
      },
    ],
  },
  methods: {
    eyebrow: 'Methods & tooling',
    title: 'How we work, and what we build with',
    support:
      'Practices come first and tooling follows. Every technology below earns its place by cutting risk, shortening feedback loops, or making the codebase easier for the next team to pick up.',
    practices: {
      id: 'practices',
      title: 'Ways of working',
      why: 'The habits stay fixed while the stack flexes. These six keep delivery predictable no matter which technologies an engagement runs on.',
      items: [
        {
          id: 'agile',
          name: 'Agile delivery',
          note: 'Two-week sprints that end in a working demo, so priorities can shift without resetting the plan.',
        },
        {
          id: 'trunk',
          name: 'Trunk-based development',
          note: 'Short-lived branches merged behind feature flags keep integration continuous and releases uneventful.',
        },
        {
          id: 'review',
          name: 'Review on every change',
          note: 'Nothing reaches main until a second engineer and automated static analysis have both signed off.',
        },
        {
          id: 'tests',
          name: 'Test-first on core logic',
          note: 'Business rules are written as tests before implementation, so behaviour is pinned down before it drifts.',
        },
        {
          id: 'cd',
          name: 'Continuous delivery',
          note: 'Every merge builds, tests, and ships to staging automatically. Production is one reviewed step away.',
        },
        {
          id: 'adr',
          name: 'Decisions in writing',
          note: 'Architecture decision records capture the reasoning, so settled questions stay settled.',
        },
      ],
    },
    categories: [
      {
        id: 'frontend',
        title: 'Frontend',
        why: 'Typed React with server rendering where it earns its keep, so interfaces load fast and stay cheap to change.',
        span: 3,
      },
      {
        id: 'backend',
        title: 'Backend & APIs',
        why: 'Typed services behind explicit contracts, so integrations stay predictable and teams can build in parallel.',
        span: 3,
      },
      {
        id: 'mobile',
        title: 'Mobile',
        why: 'A shared codebase when the product allows it, native when performance or platform APIs demand it.',
        span: 2,
      },
      {
        id: 'data',
        title: 'Data & storage',
        why: 'Relational by default for integrity, with caching and document stores added only where access patterns justify them.',
        span: 2,
      },
      {
        id: 'cloud',
        title: 'Cloud & DevOps',
        why: 'Infrastructure defined in code and shipped by pipeline, so environments match and releases stop being events.',
        span: 2,
      },
      {
        id: 'quality',
        title: 'Quality & testing',
        why: 'Layered coverage that runs on every commit, catching regressions in CI rather than in front of your users.',
        span: 3,
      },
      {
        id: 'design',
        title: 'Design & prototyping',
        why: 'Design systems instead of one-off screens, validated as prototypes before engineering commits to a build.',
        span: 3,
      },
      {
        id: 'delivery',
        title: 'Delivery & collaboration',
        why: 'Shared boards and written context, so anyone can check status without having to ask for an update.',
        span: 3,
      },
      {
        id: 'ai',
        title: 'AI & automation',
        why: 'Applied where it removes measurable manual effort, never bolted on as a feature for its own sake.',
        span: 3,
      },
    ],
    note: 'Stack decisions are made during Plan and recorded as architecture decision records. Where your team already runs a toolchain that works, we adopt it rather than replace it.',
  },
  faq: {
    eyebrow: 'Common questions',
    title: 'What teams ask before we start',
    items: [
      {
        q: 'How long does a typical engagement take?',
        a: 'Discover and Plan usually take two to four weeks combined. Design and build depend on scope—we publish estimate ranges with named assumptions once the MVP is framed, then tighten them as real increments land.',
      },
      {
        q: 'Do we have to run all seven stages?',
        a: 'The seven stages describe how we think, not a mandatory invoice. If you arrive with validated research or an existing design system, we compress the early stages and spend the time where genuine risk still sits.',
      },
      {
        q: 'How much of our time will this take?',
        a: 'Expect a weekly thirty-minute sync, async updates you can read when convenient, and a stage review at each checkpoint. Decision-makers need to be reachable for approvals so the team is never blocked waiting on clarity.',
      },
      {
        q: 'What do we own at the end?',
        a: 'Everything. The codebase, design files, infrastructure definitions, and documentation are yours from the first commit. Handover includes runbooks, environment access, and a walkthrough with your team.',
      },
      {
        q: 'Can you work alongside our in-house team?',
        a: 'Regularly. We embed with existing engineers and designers, adopt your branching, review, and release conventions, and agree ownership boundaries up front so collaboration stays clean.',
      },
      {
        q: 'What happens if requirements change mid-build?',
        a: 'They usually do. Because work ships in small slices, changing direction costs a sprint rather than a project. We re-prioritise the backlog together and make any impact on scope, timeline, or cost explicit before it happens.',
      },
    ],
  },
  cta: {
    title: 'Ready to see this process applied to your product?',
    support:
      'Book a discovery call and we will map the first two stages against your goals, constraints, and timeline—no obligation beyond the conversation.',
    accentWords: ['process', 'product'],
  },
}
