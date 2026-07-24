import {
  siDocker,
  siFlutter,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siTypescript,
} from 'simple-icons'

/**
 * Trust strip uses technology capability marks (not fabricated client logos).
 * Icons: Simple Icons (CC0 1.0).
 */
export const homeTrust = {
  eyebrow: 'Technology we build with',
  title: 'Modern platforms. Production-grade foundations.',
  partners: [
    { id: 'react', label: siReact.title, path: siReact.path },
    { id: 'nextjs', label: siNextdotjs.title, path: siNextdotjs.path },
    { id: 'nodejs', label: siNodedotjs.title, path: siNodedotjs.path },
    { id: 'typescript', label: siTypescript.title, path: siTypescript.path },
    { id: 'mongodb', label: siMongodb.title, path: siMongodb.path },
    { id: 'postgresql', label: siPostgresql.title, path: siPostgresql.path },
    { id: 'docker', label: siDocker.title, path: siDocker.path },
    { id: 'flutter', label: siFlutter.title, path: siFlutter.path },
  ],
}
