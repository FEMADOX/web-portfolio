import { ArrowDown } from 'lucide-react'
import type { ProjectDetail } from '@/data/projects/types'
import ChapterTitle from '../ChapterTitle'
import { ProjectReveal } from '../Motion'
import type {
  chapterClassesType,
  chapterHeadingClassesType,
  chapterParagraphClassesType,
  ProjectLabels
} from '../types'

type Props = {
  labels: ProjectLabels
  project: ProjectDetail
  chapterClasses: chapterClassesType
  chapterParagraphClasses: chapterParagraphClassesType
  chapterHeadingClasses: chapterHeadingClassesType
}

const Architecture = ({
  labels,
  project,
  chapterClasses,
  chapterParagraphClasses,
  chapterHeadingClasses
}: Props) => {
  return (
    <section id="architecture" className={chapterClasses}>
      <ProjectReveal preset="heading">
        <ChapterTitle
          number="03"
          label={labels.chapters[2]}
          title={labels.architectureTitle}
        />
      </ProjectReveal>
      <ProjectReveal
        as="p"
        preset="fade"
        className={`${chapterParagraphClasses} mb-8 max-w-184 text-muted-foreground`}
      >
        {project.architecture.summary}
      </ProjectReveal>
      <ProjectReveal
        as="ol"
        variant="group"
        className="mt-[1.7rem] grid gap-5 border-2 border-border bg-card p-6"
      >
        {project.architecture.steps.map((step, i) => (
          <ProjectReveal
            as="li"
            variant="item"
            preset="node"
            key={step.title}
            className="relative flex gap-4 border-b border-dashed border-border pb-6 last:border-0 last:pb-0"
          >
            <span
              className="grid size-[2.1rem] shrink-0 place-items-center bg-foreground font-mono text-[0.7rem] leading-[normal] font-extrabold text-background"
              aria-hidden="true"
            >
              0{i + 1}
            </span>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[1.05rem] left-[2.1rem] w-4"
            >
              <ProjectReveal
                preset="line"
                delay={Math.min((i + 1) * 0.06, 0.18)}
                className="h-px w-full bg-foreground/40"
              >
                {null}
              </ProjectReveal>
            </div>
            <div>
              <h3 className={`${chapterHeadingClasses} mt-[0.3rem]`}>
                {step.title}
              </h3>
              <p
                className={`${chapterParagraphClasses} mt-[0.6rem] text-muted-foreground`}
              >
                {step.description}
              </p>
            </div>
            {i < project.architecture.steps.length - 1 && (
              <ArrowDown
                className="absolute -bottom-2 left-2 bg-card"
                size={18}
                aria-hidden="true"
              />
            )}
          </ProjectReveal>
        ))}
      </ProjectReveal>
      <ProjectReveal className="mt-8" preset="fade">
        <h3
          className={`${chapterHeadingClasses} font-mono tracking-[0.13em] uppercase`}
        >
          {labels.stack}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <li
              key={tech}
              className="border border-border bg-muted px-[0.7rem] py-[0.55rem] font-mono text-[0.65rem] leading-[normal] font-bold"
            >
              {tech}
            </li>
          ))}
        </ul>
      </ProjectReveal>
    </section>
  )
}

export default Architecture
