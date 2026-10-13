import { Briefcase, Code, GraduationCap, Mail, User } from 'lucide-react'
import { type MotionValue, motion, useTransform } from 'motion/react'
import type { ChildrenProps, NavigationItem, SectionId } from '@/app/types'
import useScrollToSection from '@/hooks/useScrollToSection'
import useSectionProgress from '@/hooks/useSectionProgess'
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
        'pointer-events-none absolute inset-0 flex items-center gap-3 bg-foreground px-4 py-3 text-background'
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

type NavItemConfig = (typeof navItems)[number]
type NavItemId = NavItemConfig['id']
type NavLabels = Record<NavItemId, string>

interface SidebarProps {
  activeSection: string
  navLabels: NavLabels
}

type NavItemProps = {
  item: NavigationItem
  activeSection: string
  scrollToSection: (id: SectionId) => void
  sectionProgress: Record<SectionId, MotionValue<number>>
  navLabel: string
}

const NavItem = ({
  item,
  activeSection,
  scrollToSection,
  sectionProgress,
  navLabel
}: NavItemProps) => {
  const Icon = item.icon
  const isActive = activeSection === item.id
  const progress = sectionProgress[item.id]

  return (
    <li key={item.id}>
      <button
        type="button"
        onClick={() => scrollToSection(item.id)}
        aria-current={isActive ? 'location' : undefined}
        className={cn(
          'relative w-full flex items-center gap-3 overflow-hidden border-2 border-border px-4 py-3 text-sm font-black uppercase',
          isActive
            ? 'bg-accent text-accent-foreground'
            : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <span className="flex items-center gap-3">
          <Icon className="h-4 w-4" />
          {navLabel}
        </span>

        <ProgressLayer progress={progress}>
          <Icon className="h-4 w-4" />
          {navLabel}
        </ProgressLayer>
      </button>
    </li>
  )
}

export const NavItems = ({ activeSection, navLabels }: SidebarProps) => {
  const scrollToSection = useScrollToSection()
  const sectionProgress = useSectionProgress()

  return (
    <nav className="flex-1 p-4">
      <ul className="space-y-2">
        {navItems.map(item => (
          <NavItem
            key={item.id}
            item={item}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            sectionProgress={sectionProgress}
            navLabel={navLabels[item.id]}
          />
        ))}
      </ul>
    </nav>
  )
}
