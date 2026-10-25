'use client'

import type { ReactNode } from 'react'
import type { CvLocale } from '@/app/types'
import { EffectsToggle } from '@/components/ambient/EffectsToggle'
import ReplayIntroductionButton from '@/components/intro/ReplayIntroductionButton'
import { cn } from '@/lib/utils'
import { LanguageButton } from './LanguageButton'
import { ThemeToggle } from './ThemeToggle'

interface DesktopControlsProps {
  themeLabels: CvLocale['theme']
  className?: string
  children?: ReactNode
}

export const DesktopControls = ({
  themeLabels,
  className,
  children
}: DesktopControlsProps) => (
  <div
    className={cn(
      'flex items-stretch gap-2 [&>button]:min-h-11 [&>button:not([role=combobox])]:w-11',
      className
    )}
  >
    {children}
    <ReplayIntroductionButton />
    <EffectsToggle />
    <ThemeToggle labels={themeLabels} />
    <LanguageButton />
  </div>
)
