export interface ProjectProps {
  title: string
  period: string
  description: string
  technologies: readonly string[]
  links: {
    github?: string
    website?: string
  }
}

export interface AccentsProps {
  key: string
  badge: string
  line: string
  hoverText: string
  hoverLine: string
}

export interface ProjectsComponentProps {
  project: ProjectProps
  accent: AccentsProps
  isLeftLine: boolean
}

export interface TechnologiesProps {
  technologies: readonly string[]
  accent: AccentsProps
}
