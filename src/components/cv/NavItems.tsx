import { Briefcase, Code, GraduationCap, Mail, User } from 'lucide-react'
import type { SectionId } from '@/app/i18n'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'summary', label: 'Summary', icon: User },
  { id: 'skills', label: 'Technical Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail }
]

interface SidebarProps {
  activeSection: string
  onNavigate: (section: string) => void
  navLabels: Record<SectionId, string>
}

export const NavItems = ({
  activeSection,
  onNavigate,
  navLabels
}: SidebarProps) => (
  <nav className="flex-1 p-4">
    <ul className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeSection === item.id
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onNavigate(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 border-2 border-border text-sm font-black uppercase transition-all',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted hover:opacity-60 hover:text-foreground'
              )}
            >
              <Icon className="w-4 h-4" />
              {navLabels[item.id as keyof typeof navLabels]}
            </button>
          </li>
        )
      })}
    </ul>
  </nav>
)
