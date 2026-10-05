export const skillGroups = [
  {
    key: 'backend',
    label: 'Backend',
    names: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'MySQL']
  },
  {
    key: 'frontend',
    label: 'Frontend',
    names: [
      'JavaScript',
      'TypeScript',
      'React',
      'NextJS',
      'TailwindCSS',
      'Bootstrap'
    ]
  },
  {
    key: 'extras',
    label: 'Extras',
    names: ['Docker', 'Git', 'Github']
  }
] as const

export type SkillName = (typeof skillGroups)[number]['names'][number]
