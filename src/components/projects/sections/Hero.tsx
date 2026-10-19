import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Code2,
  ExternalLink
} from 'lucide-react'
import type { Lang } from '@/app/types'
import { PROJECT_SLUGS, type ProjectDetail } from '@/data/projects/types'
import ProjectPressLink from '../PressLink'
import type {
  eyebrowClassesType,
  ProjectLabels,
  projectButtonClassesType,
  textLinkClassesType
} from '../types'
import ProjectVisual from '../Visual'

const readingProjectTextTime = (project: ProjectDetail) => {
  const {
    intro: projectIntro,
    problem,
    solution,
    contributions,
    architecture: { summary: architectureSummary, steps: architectureSteps },
    decisions,
    outcomes,
    learnings
  } = project

  const readingText = [
    projectIntro,
    problem,
    solution,
    ...contributions.map(x => x.description),
    architectureSummary,
    ...architectureSteps.map(x => x.description),
    ...decisions.map(x => `${x.description} ${x.tradeoff}`),
    ...outcomes,
    learnings
  ].join(' ')

  return Math.max(1, Math.ceil(readingText.split(/\s+/).length / 200))
}

type ProjectMetadataProps = {
  labels: ProjectLabels
  project: ProjectDetail
}

const ProjectMetadata = ({ labels, project }: ProjectMetadataProps) => {
  const [
    {
      role: labelsRole,
      context: labelsContext,
      status: labelsStatus,
      period: labelsPeriod
    },
    {
      role: projectRole,
      context: projectContext,
      status: projectStatus,
      period: projectPeriod
    }
  ] = [labels, project]
  const items = [
    [labelsRole, projectRole],
    [labelsContext, projectContext],
    [labelsStatus, projectStatus],
    [labelsPeriod, projectPeriod]
  ]

  return (
    <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 border-b-2 border-border py-8 sm:grid-cols-4">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt className="mb-[0.7rem] font-mono text-[0.6rem] leading-[normal] font-normal tracking-[0.06em] text-muted-foreground uppercase">
            {label}
          </dt>
          <dd className="text-[0.82rem] leading-normal font-[750]">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

type Props = {
  labels: ProjectLabels
  project: ProjectDetail
  eyebrowClasses: eyebrowClassesType
  projectButtonClasses: projectButtonClassesType
  textLinkClasses: textLinkClassesType
  index: number
  lang: Lang
}

const Hero = ({
  labels,
  project,
  eyebrowClasses,
  projectButtonClasses,
  textLinkClasses,
  index,
  lang
}: Props) => {
  const {
    schematic: labelsSchematic,
    selected: labelsSelected,
    minRead: labelsMinRead,
    explore: labelsExplore,
    source: labelsSource,
    demo: labelsDemo,
    caseStudy: labelsCaseStudy
  } = labels
  const {
    intro: projectIntro,
    slug: projectSlug,
    title: projectTitle,
    headline: projectHeadline,
    links: projectLinks
  } = project

  const minutes = readingProjectTextTime(project)

  return (
    <header data-project-hero>
      <div className="mb-10 flex items-center justify-between gap-4 font-mono text-[0.6rem] leading-[normal] font-normal text-muted-foreground">
        <ProjectPressLink
          href={`/${lang}#projects`}
          transitionTypes={['project-back']}
          className="group/back flex items-center gap-[0.6rem] font-bold text-foreground uppercase transition-colors duration-180 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:bg-accent active:text-accent-foreground data-[pressed=true]:bg-accent data-[pressed=true]:text-accent-foreground pointer-coarse:min-h-11 motion-reduce:transition-none"
        >
          <ArrowLeft
            className="transition-transform duration-180 motion-safe:group-hover/back:-translate-x-1 motion-safe:group-active/back:-translate-x-1 motion-safe:group-data-[pressed=true]/back:-translate-x-1 motion-reduce:transition-none"
            size={15}
            aria-hidden="true"
          />
          {labelsSelected}
        </ProjectPressLink>
        <span className="[@media(max-width:639px)]:max-w-32 [@media(max-width:639px)]:text-right [@media(max-width:639px)]:leading-[1.6]">
          {String(index + 1).padStart(2, '0')} /{' '}
          {String(PROJECT_SLUGS.length).padStart(2, '0')} · {minutes}{' '}
          {labelsMinRead}
        </span>
      </div>

      <p
        className={`${eyebrowClasses} mb-[1.2rem] flex items-center gap-4 text-muted-foreground`}
      >
        {labelsCaseStudy}{' '}
        <span className="text-[1.3rem] text-foreground">↘</span>
      </p>
      <h1 className="max-w-262.5 text-[clamp(2.9rem,6vw,6.7rem)] leading-[0.98] font-black tracking-[-0.06em] text-balance wrap-anywhere">
        {projectTitle}
      </h1>
      <p className="mt-6 max-w-180 text-[clamp(1.15rem,2.3vw,1.7rem)] leading-[1.35] font-[650] text-balance">
        {projectHeadline}
      </p>
      <p className="mt-4 max-w-172 text-[0.95rem] leading-[1.8] text-muted-foreground">
        {projectIntro}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <ProjectPressLink className={projectButtonClasses} href="#challenge">
          {labelsExplore}
          <ArrowDown size={17} aria-hidden="true" />
        </ProjectPressLink>
        <ProjectPressLink
          className={textLinkClasses}
          href={projectLinks.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Code2 size={17} aria-hidden="true" />
          {labelsSource}
          <ArrowUpRight size={15} aria-hidden="true" />
        </ProjectPressLink>
        {projectLinks.website && (
          <ProjectPressLink
            className={textLinkClasses}
            href={projectLinks.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labelsDemo}
            <ExternalLink size={15} aria-hidden="true" />
          </ProjectPressLink>
        )}
      </div>

      <figure data-project-hero-figure className="mt-12">
        <ProjectVisual variant="hero" slug={projectSlug} />
        <figcaption className="mt-[0.8rem] font-mono text-[0.55rem] leading-[1.6] font-normal text-muted-foreground">
          {labelsSchematic}
        </figcaption>
      </figure>

      <ProjectMetadata {...{ labels, project }} />
    </header>
  )
}

export default Hero
