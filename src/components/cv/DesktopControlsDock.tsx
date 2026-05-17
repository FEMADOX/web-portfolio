'use client'

import type { Lang } from '@/app/types'
import { cn } from '@/lib/utils'
import { DesktopControls } from './DesktopControls'

interface DesktopControlsDockProps {
  lang: Lang
  setLang: (lang: Lang) => void
  className?: string
}

export const DesktopControlsDock = ({
  lang,
  setLang,
  className
}: DesktopControlsDockProps) => (
  <div
    className={cn(
      `
        desktop-controls-dock hidden lg:flex fixed right-4 top-4 z-60 items-center gap-3 border-4 border-border bg-card/95
        px-3 py-2 shadow-normal backdrop-blur-sm
      `,
      className
    )}
  >
    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
      Controls
    </span>
    <DesktopControls lang={lang} setLang={setLang} />
  </div>
)
