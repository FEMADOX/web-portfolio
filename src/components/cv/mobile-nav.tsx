'use client'

import { Briefcase, Code, GraduationCap, Mail, User } from 'lucide-react'
import type { NavigationItem, SectionId } from '@/app/types'
import useScrollToSection from '@/hooks/useScrollToSection'
import { cn } from '@/lib/utils'
import { ScrollProgress } from './ScrollProgress'

interface MobileNavProps {
  activeSection: string
  navigation: Record<SectionId, string>
  className?: string
}

const navItems = [
  { id: 'summary', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail }
] satisfies NavigationItem[]

export const MobileNav = ({
  activeSection,
  className,
  navigation
}: MobileNavProps) => {
  const scrollToSection = useScrollToSection()

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-card border-t-4 border-border',
        className
      )}
    >
      <ScrollProgress />
      <div className="grid grid-cols-5 items-center py-2">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'flex flex-col items-center gap-1 py-1 transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('w-4 h-4', isActive && 'text-accent')} />
              <span className="text-[9px] font-bold uppercase tracking-wide">
                {navigation[item.id]}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
