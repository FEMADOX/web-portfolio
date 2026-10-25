import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Lang } from '@/app/types'
import { getProjectLabels } from '@/components/projects/labels'
import { StaticProjectVisual } from '@/components/projects/StaticVisual'
import { getProjectPath } from '@/lib/projectPaths'
import { Technologies } from './Technologies'
import type { ProjectsComponentProps } from './types'

export interface ProjectCardFrameProps extends ProjectsComponentProps {
  lang: Lang
  links: ReactNode
}

export const PROJECT_CARD_CLASS_NAME =
  'group/project-card h-full border-2 border-border bg-card shadow-sm [transition:transform_180ms,border-color_180ms,box-shadow_180ms] hover:border-foreground hover:shadow-[6px_6px_0_var(--border)] focus-within:border-foreground focus-within:shadow-[6px_6px_0_var(--border)] active:border-foreground active:shadow-[3px_3px_0_var(--border)] active:transform-[scale(0.992)] data-[pressed=true]:border-foreground data-[pressed=true]:shadow-[3px_3px_0_var(--border)] data-[pressed=true]:transform-[scale(0.992)] motion-reduce:transition-none motion-reduce:active:transform-none motion-reduce:data-[pressed=true]:transform-none'

export const ProjectCardContent = ({
  project: { slug, title, period, description, technologies },
  accent,
  lang,
  links,
  visual
}: ProjectCardFrameProps & { visual: ReactNode }) => {
  const { explore: exploreLabels, cardHint: cardHintLabels } =
    getProjectLabels(lang)

  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b-2 border-border px-[1.2rem] py-[0.8rem]">
        <span className="tracking-[0.06em] uppercase [font:700_0.65rem_var(--font-mono)]">
          {period}
        </span>
        {links}
      </div>
      <Link
        href={getProjectPath(lang, slug)}
        transitionTypes={['project-forward']}
        className="group/project-card-body grid grid-cols-[minmax(0,1fr)] focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
        aria-label={`${exploreLabels}: ${title}`}
      >
        {visual}
        <div className="flex min-w-0 flex-col border-t-2 border-border p-[1.3rem] sm:border-t-0 sm:border-l-2 sm:p-[1.6rem]">
          <h3 className="text-[clamp(1.3rem,2vw,1.8rem)] leading-[1.12] font-black tracking-[-0.03em] text-balance">
            {title}
          </h3>
          <p className="my-4 text-[0.85rem] leading-[1.7] text-muted-foreground">
            {description}
          </p>
          <Technologies technologies={technologies} accent={accent} />
          <div className="mt-auto flex items-center justify-between gap-3 pt-[1.4rem]">
            <span>
              <strong className="block text-[0.8rem] tracking-[0.04em] uppercase">
                {exploreLabels}
              </strong>
              <small className="mt-[0.35rem] block text-[0.65rem] text-muted-foreground">
                {cardHintLabels}
              </small>
            </span>
            <span className="grid size-[2.7rem] shrink-0 place-items-center border-2 border-border bg-accent text-accent-foreground [transition:transform_200ms] group-hover/project-card-body:transform-[translate(3px,-3px)] group-active/project-card-body:transform-[translate(3px,-3px)] group-data-[pressed=true]/project-card:transform-[translate(3px,-3px)] motion-reduce:transition-none motion-reduce:group-hover/project-card-body:transform-none motion-reduce:group-active/project-card-body:transform-none motion-reduce:group-data-[pressed=true]/project-card:transform-none">
              <ArrowUpRight size={22} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </>
  )
}

export const ProjectCardFrame = (props: ProjectCardFrameProps) => (
  <div className="h-full">
    <article
      className={PROJECT_CARD_CLASS_NAME}
      data-project={props.project.slug}
      data-project-card={props.project.slug}
      data-pressed={false}
      tabIndex={-1}
    >
      <ProjectCardContent
        {...props}
        visual={<StaticProjectVisual slug={props.project.slug} />}
      />
    </article>
  </div>
)
