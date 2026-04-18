import type { ReactNode } from 'react'

export type Lang = 'en' | 'es'

export interface ChildrenProps {
  readonly children: ReactNode
}

export interface MobileNavProps {
  activeSection: string
  onNavigate: (section: string) => void
  className?: string
}

export interface MobileHeaderProps {
  lang: Lang
  setLang: (lang: Lang) => void
  className?: string
}
