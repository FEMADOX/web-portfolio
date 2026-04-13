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
} from '../icons'
import { SkillGroup } from './SkillGroup'

export const SkillGroups = () => (
  <div className="flex flex-col gap-5">
    <SkillGroup
      label="Backend"
      skills={[
        { name: 'Python', icon: PythonIcon },
        { name: 'Django', icon: DjangoIcon },
        { name: 'FastAPI', icon: FastAPIIcon },
        { name: 'PostgreSQL', icon: PostgreSQLIcon },
        { name: 'MySQL', icon: MySQLIcon }
      ]}
    />
    <SkillGroup
      label="Frontend"
      skills={[
        { name: 'JavaScript', icon: JavascriptIcon },
        { name: 'TypeScript', icon: TypescriptIcon },
        { name: 'React', icon: ReactIcon },
        { name: 'NextJS', icon: NextJSIcon },
        { name: 'TailwindCSS', icon: TailwindIcon },
        { name: 'Bootstrap', icon: BootstrapIcon }
      ]}
    />
    <SkillGroup
      label="Extras"
      skills={[
        { name: 'Docker', icon: DockerIcon },
        { name: 'Git', icon: GitIcon },
        { name: 'Github', icon: GithubIcon }
      ]}
    />
  </div>
)
