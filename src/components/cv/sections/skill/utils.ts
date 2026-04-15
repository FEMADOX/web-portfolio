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

export const skills = {
  backend: [
    { name: 'Python', icon: PythonIcon },
    { name: 'Django', icon: DjangoIcon },
    { name: 'FastAPI', icon: FastAPIIcon },
    { name: 'PostgreSQL', icon: PostgreSQLIcon },
    { name: 'MySQL', icon: MySQLIcon }
  ],
  frontend: [
    { name: 'JavaScript', icon: JavascriptIcon },
    { name: 'TypeScript', icon: TypescriptIcon },
    { name: 'React', icon: ReactIcon },
    { name: 'NextJS', icon: NextJSIcon },
    { name: 'TailwindCSS', icon: TailwindIcon },
    { name: 'Bootstrap', icon: BootstrapIcon }
  ],
  extras: [
    { name: 'Docker', icon: DockerIcon },
    { name: 'Git', icon: GitIcon },
    { name: 'Github', icon: GithubIcon }
  ]
} as const
