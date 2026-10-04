'use client'

import type { CvLocale, Lang } from '@/app/types'
import { cn } from '@/lib/utils'
import { LanguageButton } from './LanguageButton'
import { ThemeToggle } from './ThemeToggle'

interface DesktopControlsProps {
  lang: Lang
  setLang: (lang: Lang) => void
  themeLabels: CvLocale['theme']
  className?: string
}

export const DesktopControls = ({
  lang,
  setLang,
  themeLabels,
  className
}: DesktopControlsProps) => (
  <div className={cn('flex items-center gap-2', className)}>
    <ThemeToggle labels={themeLabels} />
    <LanguageButton lang={lang} setLang={setLang} />
  </div>
)
