import { SkillsComponent } from './Skills'
import type { SkillsGroupProps } from './types'

export const SkillsGroup = ({ label, skills }: SkillsGroupProps) => (
  <div className="group/skill-group" key={label}>
    {/* Label colors should change on parent hover */}
    <span
      className={`
        inline-block mb-2 text-[10px] font-black uppercase tracking-widest 
        text-muted-foreground border border-border px-2 py-0.5 
        group-hover/skill-group:text-accent group-hover/skill-group:border-accent transition-colors
      `}
    >
      {label}
    </span>
    <SkillsComponent skills={skills} />
  </div>
)
