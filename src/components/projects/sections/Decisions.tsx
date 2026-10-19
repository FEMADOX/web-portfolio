import type { ProjectDetail } from '@/data/projects/types'
import ChapterTitle from '../ChapterTitle'
import { ProjectReveal } from '../Motion'
import type {
  chapterClassesType,
  chapterHeadingClassesType,
  chapterParagraphClassesType,
  decisionClassesType,
  ProjectLabels,
  smallNumberClassesType
} from '../types'

type Props = {
  project: Pick<ProjectDetail, 'decisions'>
  labels: ProjectLabels
  chapterClasses: chapterClassesType
  chapterHeadingClasses: chapterHeadingClassesType
  chapterParagraphClasses: chapterParagraphClassesType
  decisionClasses: decisionClassesType
  smallNumberClasses: smallNumberClassesType
}

const Decisions = ({
  project,
  labels,
  chapterClasses,
  chapterHeadingClasses,
  chapterParagraphClasses,
  decisionClasses,
  smallNumberClasses
}: Props) => (
  <section id="decisions" className={chapterClasses}>
    <ProjectReveal>
      <ChapterTitle
        number="04"
        label={labels.chapters[3]}
        title={labels.decisionsTitle}
      />
      <div className="border-t-2 border-border">
        {project.decisions.map((decision, i) => (
          <details
            key={decision.title}
            open={i === 0}
            className={decisionClasses}
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 py-6 transition-colors duration-180 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:bg-accent active:text-accent-foreground motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
              <span className={smallNumberClasses}>0{i + 1}</span>
              <h3 className={`${chapterHeadingClasses} flex-1`}>
                {decision.title}
              </h3>
              <span
                className="font-mono text-2xl leading-[normal] font-normal transition-transform duration-180 ease-[ease] group-open/decision:transform-[rotate(45deg)] motion-safe:group-active/decision:scale-90 motion-reduce:transition-none"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <div className="pb-[1.8rem]">
              <p className={`${chapterParagraphClasses} text-muted-foreground`}>
                {decision.description}
              </p>
              <div className="mt-4 border-l-3 border-foreground bg-card p-[1.1rem]">
                <h4 className="mb-[0.6rem] font-mono text-[0.65rem] leading-[normal] font-extrabold uppercase">
                  {labels.tradeoff}
                </h4>
                <p className="text-[0.8rem] leading-[1.85] text-muted-foreground">
                  {decision.tradeoff}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </ProjectReveal>
  </section>
)

export default Decisions
