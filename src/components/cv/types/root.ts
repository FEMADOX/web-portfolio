import type { ElementType, ReactNode } from 'react'

export interface ChildrenProps {
  readonly children: ReactNode
}

export interface MobileNavProps {
  activeSection: string
  onNavigate: (section: string) => void
  className?: string
}

export interface MobileHeaderProps {
  className?: string
}

type Skill = {
  name: string
  icon: ElementType
}

export type Skills = Skill[]

export interface SkillsComponentProps {
  skills: Skills
}

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
