import { SkillsGroup } from './SkillsGroup'
import { skills } from './utils'

export const SkillGroups = () => (
  <div className="flex flex-col gap-5">
    {skills.map(group => (
      <SkillsGroup
        key={group.label}
        label={group.label}
        skills={group.skills}
      />
    ))}
  </div>
)
