import type { ProjectDetail } from '@/data/projects/types'
import ChapterTitle from '../ChapterTitle'
import { ProjectReveal } from '../Motion'
import type {
  chapterClassesType,
  chapterHeadingClassesType,
  chapterParagraphClassesType,
  ProjectLabels,
  smallNumberClassesType
} from '../types'

type Props = {
  projectContributions: ProjectDetail['contributions']
  labelsChapters: ProjectLabels['chapters']
  labelsContributionTitle: ProjectLabels['contributionTitle']
  chapterClasses: chapterClassesType
  chapterHeadingClasses: chapterHeadingClassesType
  chapterParagraphClasses: chapterParagraphClassesType
  smallNumberClasses: smallNumberClassesType
}

const Contribution = ({
  projectContributions,
  labelsChapters,
  labelsContributionTitle,
  chapterClasses,
  chapterHeadingClasses,
  chapterParagraphClasses,
  smallNumberClasses
}: Props) => (
  <section id="contribution" className={chapterClasses}>
    <div>
      <ProjectReveal>
        <ChapterTitle
          number="02"
          label={labelsChapters[1]}
          title={labelsContributionTitle}
        />
      </ProjectReveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:has-[>:nth-child(4)]:grid-cols-2">
        {projectContributions.map((item, i) => (
          <ProjectReveal
            key={item.title}
            delay={i * 0.06}
            className="border-2 border-border bg-card p-6 sm:[&:last-child:nth-child(odd)]:col-span-full lg:[&:last-child:nth-child(odd)]:col-auto"
          >
            <span className={smallNumberClasses}>0{i + 1} /</span>
            <h3 className={`${chapterHeadingClasses} mt-[1.2rem] mb-[0.8rem]`}>
              {item.title}
            </h3>
            <p className={`${chapterParagraphClasses} text-muted-foreground`}>
              {item.description}
            </p>
          </ProjectReveal>
        ))}
      </div>
    </div>
  </section>
)

export default Contribution
