import { ArrowUpRight, Check } from 'lucide-react'
import type { ProjectDetail } from '@/data/projects/types'
import ChapterTitle from '../ChapterTitle'
import { ProjectReveal } from '../Motion'
import ProjectPressLink from '../PressLink'
import type {
  chapterClassesType,
  chapterHeadingClassesType,
  chapterParagraphClassesType,
  ProjectLabels
} from '../types'

type Props = {
  project: Pick<ProjectDetail, 'outcomes' | 'learnings' | 'evidence'>
  labels: ProjectLabels
  chapterClasses: chapterClassesType
  chapterHeadingClasses: chapterHeadingClassesType
  chapterParagraphClasses: chapterParagraphClassesType
}

const Outcomes = ({
  project,
  labels,
  chapterClasses,
  chapterHeadingClasses,
  chapterParagraphClasses
}: Props) => (
  <section id="outcomes" className={chapterClasses}>
    <ProjectReveal>
      <ChapterTitle
        number="05"
        label={labels.chapters[4]}
        title={labels.outcomesTitle}
      />
      <ul className="grid gap-[0.9rem]">
        {project.outcomes.map(outcome => (
          <li
            key={outcome}
            className="flex items-start gap-4 border-2 border-border bg-card p-5"
          >
            <Check
              className="mt-[0.2rem] shrink-0"
              size={22}
              aria-hidden="true"
            />
            <p className={chapterParagraphClasses}>{outcome}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-b-2 border-border py-8">
        <p className="font-mono text-[0.9rem] leading-[1.85] font-bold tracking-[0.13em] uppercase">
          {labels.learning}
        </p>
        <p className="mt-4 text-[1.1rem] leading-[1.65] font-[650] text-pretty">
          {project.learnings}
        </p>
      </div>
      <div className="mt-10">
        <div>
          <h3 className={chapterHeadingClasses}>{labels.evidence}</h3>
          <p className="mt-2 text-[0.8rem] leading-[1.85] text-muted-foreground">
            {labels.evidenceHint}
          </p>
        </div>
        <ul className="mt-[1.2rem]">
          {project.evidence.map(source => (
            <li key={source.url}>
              <ProjectPressLink
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/evidence flex min-h-11 items-center justify-between gap-4 border-b border-border py-[0.9rem] text-[0.8rem] font-[650] transition-colors duration-180 hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:bg-accent active:text-accent-foreground active:underline active:underline-offset-4 data-[pressed=true]:bg-accent data-[pressed=true]:text-accent-foreground data-[pressed=true]:underline data-[pressed=true]:underline-offset-4 motion-reduce:transition-none"
              >
                {source.label}
                <ArrowUpRight
                  className="shrink-0 transition-transform duration-180 motion-safe:group-hover/evidence:transform-[translate(2px,-2px)] motion-safe:group-active/evidence:transform-[translate(2px,-2px)] motion-safe:group-data-[pressed=true]/evidence:transform-[translate(2px,-2px)] motion-reduce:transition-none"
                  size={16}
                  aria-hidden="true"
                />
              </ProjectPressLink>
            </li>
          ))}
        </ul>
      </div>
    </ProjectReveal>
  </section>
)

export default Outcomes
