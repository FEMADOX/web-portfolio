"use client"

import { cn } from "@/lib/utils"

interface MobileHeaderProps {
  className?: string
}

export function MobileHeader({ className }: MobileHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-xs">GG</span>
          </div>
        </div>
        <div className="text-right">
          <h1 className="font-bold text-foreground text-xs tracking-wide">GIANCARLOS</h1>
          <p className="text-xs text-foreground tracking-wide">GONZALEZ</p>
        </div>
      </div>
    </header>
  )
}
