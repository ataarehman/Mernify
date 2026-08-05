/**
 * Team / leadership content.
 * Set `published: true` only after real names, roles, and photo rights are confirmed.
 * Components hide unpublished entries — no invented people on the live site.
 */

export const teamContent = {
  eyebrow: 'Leadership',
  title: 'Who you will work with',
  support:
    'Engagements are senior-led. You speak with the people shaping architecture and delivery — not a rotating account layer.',
  /** Replace placeholders with real bios before setting published: true */
  members: [
    {
      id: 'founder',
      published: false,
      name: '',
      role: 'Founder',
      bio: '',
      photo: '/assets/images/thumbs/team-ip-thumb1.webp',
      linkedin: '',
    },
    {
      id: 'engineering-lead',
      published: false,
      name: '',
      role: 'Engineering Lead',
      bio: '',
      photo: '/assets/images/thumbs/team-ip-thumb2.webp',
      linkedin: '',
    },
    {
      id: 'design-lead',
      published: false,
      name: '',
      role: 'Design Lead',
      bio: '',
      photo: '/assets/images/thumbs/team-ip-thumb3.webp',
      linkedin: '',
    },
  ],
}

export function getPublishedTeam() {
  return teamContent.members.filter((m) => m.published && m.name?.trim())
}
