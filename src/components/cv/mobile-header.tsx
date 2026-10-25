'use client'

import type { CvLocale } from '@/app/types'
import { EffectsToggle } from '@/components/ambient/EffectsToggle'
import ReplayIntroductionButton from '@/components/intro/ReplayIntroductionButton'
import { cn } from '@/lib/utils'
import { BrandLogo } from './BrandLogo'
import { LanguageButton } from './LanguageButton'
import { ThemeToggle } from './ThemeToggle'

interface MobileHeaderProps {
  themeLabels: CvLocale['theme']
  className?: string
}

export const MobileHeader = ({ themeLabels, className }: MobileHeaderProps) => (
  <header
    className={cn(
      'sticky top-0 z-50 bg-card border-b-4 border-border px-3 py-3 shadow-normal [&_button]:min-h-11 [&_button]:min-w-11',
      className
    )}
  >
    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-2">
      <div className="flex shrink-0 items-center gap-2">
        <BrandLogo />
        <div>
          <h1 className="font-black text-foreground text-base leading-none tracking-wide font-sans min-[375px]:text-lg">
            GIANCARLOS
          </h1>
          <p className="text-base text-foreground leading-none tracking-wide font-sans min-[375px]:text-lg">
            GONZALEZ
          </p>
        </div>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-1.5 min-[375px]:gap-2">
        <ReplayIntroductionButton />
        <EffectsToggle />
        <ThemeToggle labels={themeLabels} />
        <LanguageButton />
      </div>
    </div>
  </header>
)
