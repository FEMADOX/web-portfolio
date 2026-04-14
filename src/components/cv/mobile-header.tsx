'use client'

import { SquareTerminal } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MobileHeaderProps } from '@/types/root'

export const MobileHeader = ({ className }: MobileHeaderProps) => (
  <header
    className={cn(
      'sticky top-0 z-50 bg-card border-b-4 border-border px-3 py-3 shadow-normal',
      className
    )}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SquareTerminal className='text-primary' height={30} width={30} />
        <div>
          <h1 className="font-black text-foreground text-xl leading-none tracking-wide font-['Space_Grotesk']">
            GIANCARLOS
          </h1>
          <p className="text-xl text-foreground leading-none tracking-wide font-['Space_Grotesk']">
            GONZALEZ
          </p>
        </div>
      </div>
    </div>
  </header>
)
