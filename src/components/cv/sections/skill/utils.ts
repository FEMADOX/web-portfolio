import {
  BootstrapIcon,
  DjangoIcon,
  DockerIcon,
  FastAPIIcon,
  GithubIcon,
  GitIcon,
  JavascriptIcon,
  MySQLIcon,
  NextJSIcon,
  PostgreSQLIcon,
  PythonIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon
} from '@/components/icons'
import { type SkillName, skillGroups } from './data'
import type { SkillItem } from './types'

const skillIcons = {
  Python: PythonIcon,
  Django: DjangoIcon,
  FastAPI: FastAPIIcon,
  PostgreSQL: PostgreSQLIcon,
  MySQL: MySQLIcon,
  JavaScript: JavascriptIcon,
  TypeScript: TypescriptIcon,
  React: ReactIcon,
  NextJS: NextJSIcon,
  TailwindCSS: TailwindIcon,
  Bootstrap: BootstrapIcon,
  Docker: DockerIcon,
  Git: GitIcon,
  Github: GithubIcon
} satisfies Record<SkillName, SkillItem['icon']>

export const skills = skillGroups.map(group => ({
  label: group.label,
  skills: group.names.map(name => ({ name, icon: skillIcons[name] }))
}))
