'use client'

import { Box, Code, Database, GitBranch, Globe, Server } from 'lucide-react'

const skills = [
  { name: 'Python', icon: Code },
  { name: 'Django', icon: Server },
  { name: 'FastAPI', icon: Server },
  { name: 'JS/TS', icon: Code },
  { name: 'React', icon: Globe },
  { name: 'NextJS', icon: Globe },
  { name: 'PostgreSQL', icon: Database },
  { name: 'MySQL', icon: Database },
  { name: 'Docker', icon: Box },
  { name: 'Git', icon: GitBranch },
  { name: 'Tailwind', icon: Code },
  { name: 'Bootstrap', icon: Code }
]

export const SkillsSection = () => (
  <section id="skills" className="py-10">
    {/* Section Header */}
    <div className="flex items-center justify-between mb-5">
      <h2 className="inline-block border-2 border-border bg-secondary px-4 py-1 text-lg font-black uppercase tracking-wider text-white shadow-sm">
        Technical Skills
      </h2>
      <span className="text-xs text-accent font-mono hidden sm:block">
        STACK.01
      </span>
    </div>

    {/* Skills Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {skills.map((skill) => {
        const Icon = skill.icon
        return (
          <div
            key={skill.name}
            className={`
              flex items-center gap-2 px-3 py-3 border-2 border-border bg-card transition-all
              hover:-translate-y-0.5 shadow-sm
            `}
          >
            <Icon className="w-3.5 h-3.5 text-blue-700" />
            <span className="text-xs sm:text-sm font-black text-foreground uppercase">
              {skill.name}
            </span>
          </div>
        )
      })}
    </div>
  </section>
)
