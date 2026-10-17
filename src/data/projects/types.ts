export const PROJECT_SLUGS = [
  'dulces-flares',
  'fastapi-ecosystem-lab',
  'django-ecommerce',
  'social-bookmarking'
] as const

export type ProjectSlug = (typeof PROJECT_SLUGS)[number]

export interface ProjectDetail {
  slug: ProjectSlug
  title: string
  headline: string
  summary: string
  intro: string
  role: string
  context: string
  status: string
  period: string
  technologies: readonly string[]
  links: { github: string; website?: string }
  problem: string
  solution: string
  contributions: readonly { title: string; description: string }[]
  architecture: {
    summary: string
    steps: readonly { title: string; description: string }[]
  }
  decisions: readonly {
    title: string
    description: string
    tradeoff: string
  }[]
  outcomes: readonly string[]
  learnings: string
  evidence: readonly { label: string; url: string }[]
}
