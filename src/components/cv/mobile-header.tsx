'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface MobileHeaderProps {
  className?: string
}

export function MobileHeader({ className }: MobileHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              EN
            </span>
          </div>
          <div>
            <h1 className="font-bold text-foreground text-sm">GIANCARLOS</h1>
            <p className="text-xs text-muted-foreground">GONZALEZ</p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
