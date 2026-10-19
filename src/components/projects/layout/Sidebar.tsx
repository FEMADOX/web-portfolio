import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { CvLocale } from '@/app/types'
import { BrandLogo } from '@/components/cv/BrandLogo'
import { DownloadCvButton } from '@/components/cv/sections/hero/DownloadCvButton'
import { useLanguageContext } from '@/contexts/LanguageContext'
import ProjectChaptersComponent from '../ChaptersComponent'
import type { ProjectLabels } from '../types'

type Props = {
  locale: CvLocale
  labels: ProjectLabels
  backHref: string
  index: number
  title: string
}

const ProjectSidebar = ({ locale, labels, backHref, index, title }: Props) => (
  <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-74 lg:flex-col lg:border-r-4 lg:border-border lg:bg-card">
    <Link
      href={`/${useLanguageContext()}`}
      className="flex items-center gap-3 border-b-4 border-border p-2"
      aria-label="Giancarlos Gonzalez · Portfolio"
    >
      <BrandLogo />

      <span>
        <strong className="block text-[0.9rem] leading-[1.1] font-black uppercase">
          Giancarlos Gonzalez
        </strong>

        <small className="mt-[0.3rem] block text-[0.62rem] font-black tracking-[0.04em] text-accent uppercase">
          {locale.sidebar.jobTitle}
        </small>
      </span>
    </Link>

    <Link
      href={backHref}
      transitionTypes={['project-back']}
      className="flex items-center gap-[0.65rem] px-[1.2rem] py-[1.4rem] text-[0.65rem] font-extrabold uppercase hover:underline hover:underline-offset-[0.3rem]"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      {labels.back}
    </Link>

    <div className="px-[1.2rem] pt-2 pb-6">
      <span className="font-mono text-[0.55rem] leading-[normal] tracking-[0.08em] text-muted-foreground uppercase">
        {labels.caseStudy} / 0{index + 1}
      </span>

      <p className="mt-3 text-[1.2rem] leading-[1.15] font-black tracking-[-0.035em]">
        {title}
      </p>
    </div>

    <ProjectChaptersComponent
      labels={labels}
      className="grid gap-2 overflow-y-auto px-4"
      dataProjectNavigation="desktop"
      chapterLinkVariant="desktop"
    />

    <div className="mt-auto border-t-4 border-border p-4 text-center">
      <DownloadCvButton {...locale.sidebar.downloadCv} animation={false} />
    </div>
  </aside>
)

export default ProjectSidebar
