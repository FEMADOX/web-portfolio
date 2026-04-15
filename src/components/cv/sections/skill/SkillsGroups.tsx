import { skills } from '@/components/cv/utils/skills'
import { SkillsGroup } from './SkillsGroup'

export const SkillGroups = () => (
  <div className="flex flex-col gap-5">
    <SkillsGroup label="Backend" skills={skills.backend} />
    <SkillsGroup label="Frontend" skills={skills.frontend} />
    <SkillsGroup label="Extras" skills={skills.extras} />
  </div>
)
