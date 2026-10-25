import type { CvLocale, Lang } from '@/app/types'
import { getProjectLabels } from '@/components/projects/labels'
import { LazyProjects } from './LazyProjects'
import { ProjectsPreview } from './ProjectsPreview'
import type { ProjectProps } from './types'

interface Props {
  lang: Lang
  sectionTitle: CvLocale['sections']['projects']
  projects: readonly ProjectProps[]
  sectionCode: string
}

export const ProjectsSection = ({
  lang,
  sectionTitle,
  projects,
  sectionCode
}: Props) => {
  const { intro: introLabels, introBody: introBodyLabels } =
    getProjectLabels(lang)

  return (
    <section id="projects" className="my-20 group">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h2
          className={`
          inline-block border-2 border-border bg-blue-700 px-4 py-1 text-lg font-black uppercase tracking-wider text-white shadow-sm
          group-hover:bg-accent group-hover:text-accent-foreground transition-colors
        `}
        >
          {sectionTitle}
        </h2>
        <span className="text-xs text-accent font-mono hidden sm:block">
          {sectionCode}
        </span>
      </div>

      <div className="mb-8 max-w-184 text-muted-foreground">
        <h3 className="mb-[0.85rem] text-[clamp(1.65rem,3.5vw,2.7rem)] text-gray-200 leading-[1.08] font-black tracking-[-0.04em]">
          {introLabels}
        </h3>
        <p className="text-[0.95rem] leading-[1.8]">{introBodyLabels}</p>
      </div>
      <LazyProjects
        projects={projects}
        fallback={<ProjectsPreview projects={projects} lang={lang} />}
      />
    </section>
  )
}
