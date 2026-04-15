import type { skills } from './utils'

export type Skills = typeof skills

export interface SkillsComponentProps {
  skills: Skills
}
