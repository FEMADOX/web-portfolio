import type { ReactNode } from 'react'

export type Lang = 'en' | 'es'

export type DesktopControlsPlacement = 'sidebar' | 'topbar'

export interface ChildrenProps {
  readonly children: ReactNode
}

export interface MobileNavProps {
  activeSection: string
  onNavigate: (section: string) => void
  navigation: Record<SectionId, string>
  className?: string
}

export interface MobileHeaderProps {
  lang: Lang
  setLang: (lang: Lang) => void
  className?: string
}

export interface DesktopControlsVariantProps {
  placement: DesktopControlsPlacement
  setPlacement: (placement: DesktopControlsPlacement) => void
  className?: string
}

export type SectionId =
  | 'summary'
  | 'skills'
  | 'projects'
  | 'education'
  | 'contact'

export type CvLocale = {
  mobileHeader: {
    firstName: string
    lastName: string
  }
  navigation: Record<SectionId, string>
  sections: {
    summary: string
    skills: string
    projects: string
    education: string
    contact: string
  }
  hero: {
    titleLineOne: string
    titleLineTwo: string
    description: string
    downloadCv: {
      cvLangUrl: string
      downloadName: string
      buttonText: string
    }
  }
  sidebar: {
    jobTitle: string
    navLabels: Record<SectionId, string>
    downloadCv: {
      cvLangUrl: string
      downloadName: string
      buttonText: string
    }
  }
  contactForm: {
    title: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submit: string
    submitting: string
    toasts: {
      alreadySending: {
        title: string
        description: string
      }
      invalidEmail: {
        title: string
        description: string
      }
      success: {
        title: string
        description: string
      }
      error: {
        title: string
        description: string
      }
    }
  }
  footer: {
    source: string
  }
}
