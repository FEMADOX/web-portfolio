import type { ReactNode } from 'react'

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

export type Skill = {
  name: string
  icon: React.ElementType
}
