'use client'

import type { MobileHeaderProps } from '@/app/types'
import { cn } from '@/lib/utils'
import { BrandLogo } from './BrandLogo'
import { LanguageButton } from './LanguageButton'
import { ThemeToggle } from './ThemeToggle'

export const MobileHeader = ({
  lang,
  setLang,
  className
}: MobileHeaderProps) => (
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
          <h1 className="font-black text-foreground text-xl leading-none tracking-wide font-['Space_Grotesk']">
            GIANCARLOS
          </h1>
          <p className="text-xl text-foreground leading-none tracking-wide font-['Space_Grotesk']">
            GONZALEZ
          </p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <LanguageButton lang={lang} setLang={setLang} />
      </div>
    </div>
  </header>
)
