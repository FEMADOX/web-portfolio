'use client'

import type { Lang } from '@/app/types'
import { cn } from '@/lib/utils'
import { LanguageButton } from './LanguageButton'
import { ThemeToggle } from './ThemeToggle'

interface DesktopControlsProps {
  lang: Lang
  setLang: (lang: Lang) => void
  className?: string
}

export const DesktopControls = ({
  lang,
  setLang,
  className
}: DesktopControlsProps) => (
  <div className={cn('flex items-center gap-2', className)}>
    <ThemeToggle />
    <LanguageButton lang={lang} setLang={setLang} />
  </div>
)
