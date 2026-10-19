import type { ProjectDetail } from '@/data/projects'
import ChapterTitle from '../ChapterTitle'
import { ProjectReveal } from '../Motion'
import type {
  chapterClassesType,
  chapterParagraphClassesType,
  ProjectLabels
} from '../types'

type Props = {
  project: Pick<ProjectDetail, 'problem' | 'solution'>
  labels: ProjectLabels
  chapterClasses: chapterClassesType
  chapterParagraphClasses: chapterParagraphClassesType
}

const Challenge = ({
  project,
  labels,
  chapterClasses,
  chapterParagraphClasses
}: Props) => (
  <section id="challenge" className={chapterClasses}>
    <ProjectReveal>
      <ChapterTitle
        number="01"
        label={labels.chapters[0]}
        title={labels.challengeTitle}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="border-2 border-border p-6">
          <h3 className="mb-4 font-mono text-[0.7rem] leading-[normal] font-extrabold uppercase">
            {labels.problem}
          </h3>
          <p className={`${chapterParagraphClasses} text-muted-foreground`}>
            {project.problem}
          </p>
        </div>
        <div className="border-2 border-t-4 border-border border-t-foreground bg-card p-6 shadow-(--shadow-sm)">
          <h3 className="mb-4 font-mono text-[0.7rem] leading-[normal] font-extrabold uppercase">
            {labels.solution}
          </h3>
          <p className={`${chapterParagraphClasses} text-muted-foreground`}>
            {project.solution}
          </p>
        </div>
      </div>
    </ProjectReveal>
  </section>
)

export default Challenge
