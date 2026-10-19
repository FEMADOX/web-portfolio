import type { ComponentProps } from 'react'
import type { Lang } from '@/app/types'
import type { ProjectDetail } from '@/data/projects/types'
import {
  chapterClasses,
  chapterHeadingClasses,
  chapterParagraphClasses,
  decisionClasses,
  eyebrowClasses,
  projectButtonClasses,
  smallNumberClasses,
  textLinkClasses
} from './detailStyles'
import { getProjectLabels } from './labels'
import ProjectShell from './Shell'
import Architecture from './sections/Architecture'
import Challenge from './sections/Challenge'
import Contribution from './sections/Contribution'
import Decisions from './sections/Decisions'
import Hero from './sections/Hero'
import NextProject from './sections/NextProject'
import Outcomes from './sections/Outcomes'

type ProjectDetailPageProps = {
  lang: Lang
  project: ProjectDetail
  nextProject: ProjectDetail
  index: number
}

export function ProjectDetailPage({
  lang,
  project,
  nextProject,
  index
}: ProjectDetailPageProps) {
  const labels = getProjectLabels(lang)
  const [
    { chapters: labelsChapters, contributionTitle: labelsContributionTitle },
    {
      contributions: projectContributions,
      slug: projectSlug,
      title: projectTitle
    }
  ] = [labels, project]

  const heroProps = {
    project,
    labels,
    index,
    lang,
    eyebrowClasses,
    projectButtonClasses,
    textLinkClasses
  } satisfies ComponentProps<typeof Hero>

  const challengeProps = {
    project,
    labels,
    chapterClasses,
    chapterParagraphClasses
  } satisfies ComponentProps<typeof Challenge>

  const contributionProps = {
    projectContributions,
    labelsChapters,
    labelsContributionTitle,
    chapterClasses,
    chapterHeadingClasses,
    chapterParagraphClasses,
    smallNumberClasses
  } satisfies ComponentProps<typeof Contribution>

  const architectureProps = {
    labels,
    project,
    chapterClasses,
    chapterParagraphClasses,
    chapterHeadingClasses
  } satisfies ComponentProps<typeof Architecture>

  const decisionsProps = {
    project,
    labels,
    chapterClasses,
    chapterHeadingClasses,
    chapterParagraphClasses,
    decisionClasses,
    smallNumberClasses
  } satisfies ComponentProps<typeof Decisions>

  const outcomesProps = {
    project,
    labels,
    chapterClasses,
    chapterHeadingClasses,
    chapterParagraphClasses
  } satisfies ComponentProps<typeof Outcomes>

  const nextProjectProps = {
    lang,
    nextProject,
    labels,
    eyebrowClasses,
    projectButtonClasses
  } satisfies ComponentProps<typeof NextProject>

  return (
    <ProjectShell
      key={projectSlug}
      slug={projectSlug}
      title={projectTitle}
      index={index}
    >
      <div
        data-project-content
        className="mx-auto max-w-300 px-5 pt-[1.7rem] sm:px-8 lg:px-12 lg:pt-24"
      >
        <Hero {...heroProps} />

        <Challenge {...challengeProps} />

        <Contribution {...contributionProps} />

        <Architecture {...architectureProps} />

        <Decisions {...decisionsProps} />

        <Outcomes {...outcomesProps} />

        <NextProject {...nextProjectProps} />
      </div>
    </ProjectShell>
  )
}
