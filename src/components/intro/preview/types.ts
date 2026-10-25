import type { CvLocale, Lang } from '@/app/types'
import type { SidebarMode } from '@/lib/sidebarPreference'
import type { IntroCopy } from '../copy'
import type { IntroTheme } from '../types'

export interface PreviewWindowProps {
  lang: Lang
  theme: IntroTheme
  sidebarMode: SidebarMode
  effectsEnabled: boolean
  animate: boolean
  copy: IntroCopy
  locale: CvLocale
}
