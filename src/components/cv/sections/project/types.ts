export interface ProjectProps {
  title: string
  period: string
  description: string
  technologies: string[]
  links: {
    github?: string
    website?: string
  }
}

interface AccentsProps {
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
  technologies: string[]
  accent: AccentsProps
}
