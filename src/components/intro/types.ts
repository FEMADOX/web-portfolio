import type { Lang } from '@/app/types'
import type { IntroductionReplayRequest } from '@/contexts/IntroductionContext'
import type { SidebarMode } from '@/lib/sidebarPreference'

export type IntroTheme = 'system' | 'light' | 'dark'
export type IntroductionScene = 'identity' | 'settings'

export interface IntroductionPreferences {
  lang: Lang
  theme: IntroTheme
  effectsEnabled: boolean
  mode: SidebarMode
}

export interface IntroductionExperienceProps {
  lang: Lang
  active: boolean
  replay: IntroductionReplayRequest | null
  onComplete: () => void
  onHydrated: () => void
}

export interface IntroScenesProps {
  titleId?: string
  scene: IntroductionScene
  lang: Lang
  theme: IntroTheme
  sidebarMode: SidebarMode
  effectsEnabled: boolean
  reducedMotion: boolean
  animate: boolean
  onConfigure: () => void
  onSkip: () => void
  onEnter: () => void
  onLanguageChange: (lang: Lang) => void
  onThemeChange: (theme: IntroTheme) => void
  onEffectsChange: (enabled: boolean) => void
  onSidebarChange: (mode: SidebarMode) => void
  onBack: () => void
}
