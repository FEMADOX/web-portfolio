import { ArrowUpRight } from 'lucide-react'
import type { Lang } from '@/app/types'
import type { ProjectDetail } from '@/data/projects/types'
import { getProjectPath } from '@/lib/projectPaths'
import ProjectPressLink from '../PressLink'
import type {
  eyebrowClassesType,
  ProjectLabels,
  projectButtonClassesType
} from '../types'

type Props = {
  lang: Lang
  nextProject: Pick<ProjectDetail, 'slug' | 'title' | 'headline'>
  labels: ProjectLabels
  eyebrowClasses: eyebrowClassesType
  projectButtonClasses: projectButtonClassesType
}

const NextProject = ({
  lang,
  nextProject,
  labels,
  eyebrowClasses,
  projectButtonClasses
}: Props) => (
  <section
    data-project-next
    className="mt-20 border-t-4 border-border pt-8"
    aria-labelledby="next-project-heading"
  >
    <p className={`${eyebrowClasses} text-muted-foreground`}>{labels.next}</p>
    <ProjectPressLink
      data-project-next-link
      href={getProjectPath(lang, nextProject.slug)}
      transitionTypes={['project-forward']}
      className="group/next flex min-h-11 items-center justify-between gap-4 py-8 transition-[background-color,transform] duration-180 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:bg-muted data-[pressed=true]:bg-muted motion-safe:active:translate-y-px motion-safe:data-[pressed=true]:translate-y-px motion-reduce:transition-none"
    >
      <div className="min-w-0">
        <span className="font-mono text-[0.6rem] leading-[normal] font-normal text-muted-foreground uppercase">
          {labels.nextProject}
        </span>
        <h2
          id="next-project-heading"
          className="mt-3 text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.04] font-black tracking-tighter"
        >
          {nextProject.title}
        </h2>
        <p className="mt-4 max-w-152 text-[0.85rem] text-muted-foreground">
          {nextProject.headline}
        </p>
      </div>
      <ArrowUpRight
        className="shrink-0 transition-transform duration-200 ease-[ease] motion-safe:group-hover/next:transform-[translate(4px,-4px)] motion-safe:group-active/next:transform-[translate(4px,-4px)] motion-safe:group-data-[pressed=true]/next:transform-[translate(4px,-4px)] motion-reduce:transition-none"
        size={48}
        aria-hidden="true"
      />
    </ProjectPressLink>
    <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8 pb-4">
      <p className="text-[1.2rem] font-extrabold tracking-tight">
        {labels.contact}
      </p>
      <ProjectPressLink
        href={`/${lang}#contact`}
        className={projectButtonClasses}
        transitionTypes={['project-back']}
      >
        {labels.contactAction}
        <ArrowUpRight size={17} aria-hidden="true" />
      </ProjectPressLink>
    </div>
  </section>
)

export default NextProject
