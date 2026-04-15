import { SkillsGroup } from './SkillsGroup'
import { skills } from './utils'

export const SkillGroups = () => (
  <div className="flex flex-col gap-5">
    <SkillsGroup label="Backend" skills={skills.backend} />
    <SkillsGroup label="Frontend" skills={skills.frontend} />
    <SkillsGroup label="Extras" skills={skills.extras} />
  </div>
)
