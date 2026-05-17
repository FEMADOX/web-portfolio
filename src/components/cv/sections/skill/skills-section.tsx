'use client'

import type { CvLocale } from '@/app/types'
import { SkillGroups } from './SkillsGroups'

interface SkillSectionProps {
  sectionTitle: CvLocale['sections']['skills']
}

export const SkillsSection = ({ sectionTitle }: SkillSectionProps) => (
  <section id="skills" className="group/skills-section my-20">
    <div className="flex items-center justify-between mb-5">
      <h2 className="inline-block border-2 border-border bg-red-700 px-4 py-1 text-lg font-black uppercase tracking-wider text-white shadow-sm transition-colors group-hover/skills-section:bg-accent group-hover/skills-section:text-accent-foreground">
        {sectionTitle}
      </h2>
      <span className="text-xs text-accent font-mono hidden sm:block">
        STACK.01
      </span>
    </div>

    <SkillGroups />
  </section>
)
