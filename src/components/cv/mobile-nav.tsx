'use client'

import { Briefcase, Code, Mail, User } from 'lucide-react'
import type { MobileNavProps } from '@/app/types'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'summary', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail }
]

export const MobileNav = ({
  activeSection,
  onNavigate,
  className
}: MobileNavProps) => (
  <nav
    className={cn(
      'fixed bottom-0 left-0 right-0 z-50 bg-card border-t-4 border-border',
      className
    )}
  >
    <div className="grid grid-cols-4 items-center py-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeSection === item.id
        return (
          <button
            type="button"
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              'flex flex-col items-center gap-1 py-1 transition-colors',
              isActive ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            <Icon className={cn('w-4 h-4', isActive && 'text-accent')} />
            <span className="text-[9px] font-bold uppercase tracking-wide">
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  </nav>
)
