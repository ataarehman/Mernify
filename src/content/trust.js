import {
  siDocker,
  siFlutter,
  siGraphql,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTypescript,
  siVercel,
} from 'simple-icons'

export const homeTrust = {
  eyebrow: 'Technology we build with',
  title: 'Built with modern technologies',
  support: 'Capability marks—not fabricated client endorsements.',
  partners: [
    { id: 'react', label: siReact.title, path: siReact.path },
    { id: 'nextjs', label: siNextdotjs.title, path: siNextdotjs.path },
    { id: 'typescript', label: siTypescript.title, path: siTypescript.path },
    { id: 'nodejs', label: siNodedotjs.title, path: siNodedotjs.path },
    { id: 'postgresql', label: siPostgresql.title, path: siPostgresql.path },
    { id: 'mongodb', label: siMongodb.title, path: siMongodb.path },
    { id: 'docker', label: siDocker.title, path: siDocker.path },
    { id: 'flutter', label: siFlutter.title, path: siFlutter.path },
  ],
}

export const technologyGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Accessible UI systems'],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: ['Node.js', 'API design', 'GraphQL where it fits', 'Auth & tenancy patterns'],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    items: ['React Native', 'Flutter', 'Store release workflows'],
  },
  {
    id: 'data',
    title: 'Data',
    items: ['PostgreSQL', 'MongoDB', 'Caching strategies', 'Analytics-ready events'],
  },
  {
    id: 'ai',
    title: 'AI',
    items: ['Model integrations', 'RAG patterns', 'Evaluation hooks', 'Guardrails'],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    items: ['AWS-oriented architectures', 'Managed services', 'Secure networking basics'],
  },
  {
    id: 'devops',
    title: 'DevOps',
    items: ['CI/CD', 'Docker', 'Infrastructure as code', 'Observability'],
  },
  {
    id: 'quality',
    title: 'Quality',
    items: ['Automated tests', 'Manual exploratory QA', 'Accessibility checks', 'Performance budgets'],
  },
]

/** Optional marks for denser technology section — keep visual weight low */
export const technologyMarks = [
  { id: 'react', label: siReact.title, path: siReact.path },
  { id: 'next', label: siNextdotjs.title, path: siNextdotjs.path },
  { id: 'ts', label: siTypescript.title, path: siTypescript.path },
  { id: 'js', label: siJavascript.title, path: siJavascript.path },
  { id: 'node', label: siNodedotjs.title, path: siNodedotjs.path },
  { id: 'pg', label: siPostgresql.title, path: siPostgresql.path },
  { id: 'mongo', label: siMongodb.title, path: siMongodb.path },
  { id: 'python', label: siPython.title, path: siPython.path },
  { id: 'graphql', label: siGraphql.title, path: siGraphql.path },
  { id: 'docker', label: siDocker.title, path: siDocker.path },
  { id: 'vercel', label: siVercel.title, path: siVercel.path },
  { id: 'flutter', label: siFlutter.title, path: siFlutter.path },
]
