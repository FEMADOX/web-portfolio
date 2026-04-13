'use client'

import { SkillGroups } from './SkillGroups'

export const SkillsSection = () => (
  <section id="skills" className="py-10">
    <div className="flex items-center justify-between mb-5">
      <h2 className="inline-block border-2 border-border bg-secondary px-4 py-1 text-lg font-black uppercase tracking-wider text-white shadow-sm">
        Technical Skills
      </h2>
      <span className="text-xs text-accent font-mono hidden sm:block">
        STACK.01
      </span>
    </div>

    <SkillGroups />
  </section>
)
