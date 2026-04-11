'use client'

import { Badge } from '@/components/ui/badge'
import { Code, Database, Server, Globe, GitBranch, Box } from 'lucide-react'

const skills = [
  { name: 'Python', icon: Code, filled: true },
  { name: 'Django', icon: Server, filled: true },
  { name: 'FastAPI', icon: Server, filled: true },
  { name: 'JS/TS', icon: Code, filled: false },
  { name: 'React', icon: Globe, filled: false },
  { name: 'NextJS', icon: Globe, filled: false },
  { name: 'PostgreSQL', icon: Database, filled: true },
  { name: 'MySQL', icon: Database, filled: true },
  { name: 'Docker', icon: Box, filled: true },
  { name: 'Git', icon: GitBranch, filled: true },
  { name: 'Tailwind', icon: Code, filled: false },
  { name: 'Bootstrap', icon: Code, filled: false }
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="inline-block bg-accent text-accent-foreground px-4 py-2 text-lg font-bold uppercase tracking-wider">
          Technical Skills
        </h2>
        <span className="text-xs text-accent font-mono hidden sm:block">
          STACK.01
        </span>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((skill) => {
          const Icon = skill.icon
          return (
            <div
              key={skill.name}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all hover:scale-105 ${
                skill.filled
                  ? 'bg-muted border-border'
                  : 'bg-transparent border-border'
              }`}
            >
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {skill.name}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
