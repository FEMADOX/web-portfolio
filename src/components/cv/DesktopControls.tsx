'use client'

import type { CvLocale } from '@/app/types'
import { EffectsToggle } from '@/components/ambient/EffectsToggle'
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
  <div
    className={cn(
      'flex items-stretch gap-2 [&>button]:min-h-11 [&>button:not([role=combobox])]:w-11',
      className
    )}
  >
    <EffectsToggle />
    <ThemeToggle labels={themeLabels} />
    <LanguageButton />
  </div>
)
