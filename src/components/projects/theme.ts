import type { ProjectSlug } from '@/data/projects/types'

const projectThemeClasses = {
  'fastapi-ecosystem-lab':
    '[--project-color:#ff4b4b] [--project-surface-light:#ffffff] [--project-tint-light:#f0f2f6] [--project-surface-dark:#0e1117] [--project-tint-dark:#262730]',
  'django-ecommerce':
    '[--project-color:#a78bfa] [--project-surface-light:#faf5ff] [--project-tint-light:#eff6ff] [--project-surface-dark:#1e1b4b] [--project-tint-dark:#1e3a8a]',
  'social-bookmarking':
    '[--project-color:#12c064] [--project-surface-light:#e7f8ef] [--project-tint-light:#bfe9d1] [--project-surface-dark:#1c1b22] [--project-tint-dark:#14432e]',
  'dulces-flares':
    '[--project-color:#e3a455] [--project-surface-light:#f7ecdd] [--project-tint-light:#f4e6d2] [--project-surface-dark:#2a1810] [--project-tint-dark:#7a4517]'
} satisfies Record<ProjectSlug, string>

const getProjectThemeClasses = (slug: ProjectSlug): string =>
  projectThemeClasses[slug]

export default getProjectThemeClasses
