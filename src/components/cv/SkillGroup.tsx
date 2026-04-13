import type { Skill } from '@/types/root'
import { SkillComponent } from './Skill'

type SkillGroup = {
  label: string
  skills: Skill[]
}

export const SkillGroup = ({ label, skills }: SkillGroup) => (
  <div className="group" key={label}>
    {/* Label colors should change on parent hover */}
    <span
      className={`
        inline-block mb-2 text-[10px] font-black uppercase tracking-widest 
        text-muted-foreground border border-border px-2 py-0.5 
        group-hover:text-accent group-hover:border-accent transition-colors
      `}
    >
      {label}
    </span>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {skills.map(({ name, icon }) => (
        <SkillComponent key={name} name={name} icon={icon} />
      ))}
    </div>
  </div>
)
