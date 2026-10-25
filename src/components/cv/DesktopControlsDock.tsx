'use client'

import type { ReactNode } from 'react'
import type { CvLocale } from '@/app/types'
import { cn } from '@/lib/utils'
import { DesktopControls } from './DesktopControls'

interface DesktopControlsDockProps {
  controlsLabel: string
  themeLabels: CvLocale['theme']
  className?: string
  placement?: 'floating' | 'header'
  children?: ReactNode
}

export const DesktopControlsDock = ({
  controlsLabel,
  themeLabels,
  className,
  placement = 'floating',
  children
}: DesktopControlsDockProps) => (
  <div
    className={cn(
      'desktop-controls-dock hidden h-17 items-center gap-3 border-4 border-border bg-card/95 px-3 py-2 shadow-normal backdrop-blur-sm lg:flex',
      placement === 'floating'
        ? 'fixed right-4 top-4 z-60'
        : 'pointer-events-auto ml-auto shrink-0 lg:wide:animate-none',
      className
    )}
  >
    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
      {controlsLabel}
    </span>
    <DesktopControls themeLabels={themeLabels}>{children}</DesktopControls>
  </div>
)
