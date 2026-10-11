'use client'

import type { CvLocale } from '@/app/types'
import { cn } from '@/lib/utils'
import { LanguageButton } from './LanguageButton'
import { ThemeToggle } from './ThemeToggle'

interface DesktopControlsProps {
  themeLabels: CvLocale['theme']
  className?: string
}

export const DesktopControls = ({
  themeLabels,
  className
}: DesktopControlsProps) => (
  <div className={cn('flex items-center gap-2', className)}>
    <ThemeToggle labels={themeLabels} />
    <LanguageButton />
  </div>
)
