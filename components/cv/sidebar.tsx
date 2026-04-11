"use client"

import { cn } from "@/lib/utils"
import { User, Code, Briefcase, GraduationCap, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface SidebarProps {
  activeSection: string
  onNavigate: (section: string) => void
  className?: string
}

const navItems = [
  { id: "summary", label: "Summary", icon: User },
  { id: "skills", label: "Technical Skills", icon: Code },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
]

export function Sidebar({ activeSection, onNavigate, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50",
        className
      )}
    >
      {/* Profile Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
              GG
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Giancarlos Gonzalez</h2>
            <p className="text-sm text-accent">WEB DEVELOPER</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
      <div className="p-4 border-t border-border">
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Download className="w-4 h-4 mr-2" />
          Download CV
        </Button>
      </div>
    </aside>
  )
}
