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
