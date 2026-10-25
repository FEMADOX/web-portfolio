'use client'

import { Briefcase, Code, GraduationCap, Mail, User } from 'lucide-react'
import { type MotionValue, useTransform } from 'motion/react'
import * as motion from 'motion/react-m'
import { useRef } from 'react'
import type { ChildrenProps, NavigationItem, SectionId } from '@/app/types'
import { useCvNavigation } from '@/contexts/CvNavigationContext'
import useActiveNavScroll from '@/hooks/useActiveNavScroll'
import { cn } from '@/lib/utils'

interface ProgressLayerProps extends ChildrenProps {
  progress: MotionValue<number>
}

const ProgressLayer = ({ progress, children }: ProgressLayerProps) => {
  const clipPath = useTransform(
    progress,
    value => `inset(0 ${100 - value}% 0 0)`
  )

  return (
    <motion.span
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center gap-[inherit] bg-foreground p-[inherit] text-background'
      )}
      aria-hidden="true"
      style={{ clipPath }}
    >
      {children}
    </motion.span>
  )
}

const navItems = [
  { id: 'summary', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail }
] as const satisfies readonly NavigationItem[]

interface NavItemsProps {
  navLabels: Record<SectionId, string>
  variant?: 'sidebar' | 'dock'
}

type NavItemProps = {
  item: NavigationItem
  activeSection: string
  scrollToSection: (id: SectionId) => void
  sectionProgress: Record<SectionId, MotionValue<number>>
  navLabel: string
  variant: 'sidebar' | 'dock'
}

const NavItem = ({
  item,
  activeSection,
  scrollToSection,
  sectionProgress,
  navLabel,
  variant
}: NavItemProps) => {
  const Icon = item.icon
  const isActive = activeSection === item.id
  const progress = sectionProgress[item.id]

  return (
    <li key={item.id} className={variant === 'dock' ? 'shrink-0' : undefined}>
      <button
        type="button"
        data-navigation-item={item.id}
        onClick={() => scrollToSection(item.id)}
        aria-current={isActive ? 'location' : undefined}
        className={cn(
          'relative flex items-center overflow-hidden border-2 border-border font-black uppercase',
          variant === 'dock'
            ? 'h-11 shrink-0 gap-2 px-3 py-2 text-[11px]'
            : 'w-full gap-3 px-4 py-3 text-sm',
          isActive
            ? 'bg-accent text-accent-foreground'
            : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <span
          className={cn(
            'flex items-center gap-[inherit]',
            variant === 'dock' && 'whitespace-nowrap'
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {navLabel}
        </span>

        <ProgressLayer progress={progress}>
          <Icon className="h-4 w-4 shrink-0" />
          {navLabel}
        </ProgressLayer>
      </button>
    </li>
  )
}

export const NavItems = ({ navLabels, variant = 'sidebar' }: NavItemsProps) => {
  const { activeSection, sectionProgress, scrollToSection } = useCvNavigation()
  const navRef = useRef<HTMLDivElement | null>(null)
  useActiveNavScroll(navRef, activeSection, variant === 'dock')

  return (
    <nav
      ref={navRef}
      className={
        variant === 'dock'
          ? 'min-w-0 flex-1 overflow-x-auto scrollbar-none'
          : 'flex-1 p-4'
      }
    >
      <ul className={variant === 'dock' ? 'flex gap-1' : 'space-y-2'}>
        {navItems.map(item => (
          <NavItem
            key={item.id}
            item={item}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            sectionProgress={sectionProgress}
            navLabel={navLabels[item.id]}
            variant={variant}
          />
        ))}
      </ul>
    </nav>
  )
}
