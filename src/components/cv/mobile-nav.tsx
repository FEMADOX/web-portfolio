'use client'

import { cn } from '@/lib/utils'
import { User, Briefcase, Code, Mail } from 'lucide-react'

interface MobileNavProps {
  activeSection: string
  onNavigate: (section: string) => void
  className?: string
}

const navItems = [
  { id: 'summary', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'contact', label: 'Contact', icon: Mail }
]

export function MobileNav({
  activeSection,
  onNavigate,
  className
}: MobileNavProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border',
        className
      )}
    >
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-[60px]',
                isActive ? 'text-accent' : 'text-muted-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium uppercase">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
