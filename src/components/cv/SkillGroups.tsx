import { SkillGroup } from './SkillGroup'
import { skills } from './utils/skills'

export const SkillGroups = () => (
  <div className="flex flex-col gap-5">
    <SkillGroup label="Backend" skills={skills.backend} />
    <SkillGroup label="Frontend" skills={skills.frontend} />
    <SkillGroup label="Extras" skills={skills.extras} />
  </div>
)
