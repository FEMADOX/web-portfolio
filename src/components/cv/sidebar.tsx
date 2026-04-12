'use client'

import {
  Briefcase,
  Code,
  Download,
  GraduationCap,
  Mail,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeSection: string
  onNavigate: (section: string) => void
  className?: string
}

const navItems = [
  { id: 'summary', label: 'Summary', icon: User },
  { id: 'skills', label: 'Technical Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail }
]

export const Sidebar = ({
  activeSection,
  onNavigate,
  className
}: SidebarProps) => (
  <aside
    className={cn(
      'fixed left-0 top-0 h-screen w-72 bg-card border-r-4 border-border flex flex-col z-50',
      className
    )}
  >
    {/* Profile Section */}
    <div className="p-6 border-b-4 border-border">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 overflow-hidden bg-muted border-2 border-border">
          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-black text-lg">
            GG
          </div>
        </div>
        <div>
          <h2 className="font-black uppercase text-foreground leading-none">
            Giancarlos Gonzalez
          </h2>
          <p className="text-xs text-accent font-black tracking-wider mt-1">
            WEB DEVELOPER
          </p>
        </div>
      </div>
    </div>

    {/* Navigation */}
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
                    ? 'bg-accent text-accent-foreground shadow-[2px_2px_0_0_#000]'
                    : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>

    {/* Download CV Button */}
    <div className="p-4 border-t-4 border-border">
      <Button className="w-full rounded-none border-2 border-border bg-accent hover:bg-accent/95 text-accent-foreground font-black uppercase tracking-widest">
        <Download className="w-4 h-4 mr-2" />
        Download CV
      </Button>
    </div>
  </aside>
)
