'use client'

import type { CvLocale } from '@/app/types'
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
      'sticky top-0 z-50 bg-card border-b-4 border-border px-3 py-3 shadow-normal',
      className
    )}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BrandLogo />
        <div>
          <h1 className="font-black text-foreground text-xl leading-none tracking-wide font-sans">
            GIANCARLOS
          </h1>
          <p className="text-xl text-foreground leading-none tracking-wide font-sans">
            GONZALEZ
          </p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle labels={themeLabels} />
        <LanguageButton />
      </div>
    </div>
  </header>
)
