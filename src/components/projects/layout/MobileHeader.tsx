import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { CvLocale } from '@/app/types'
import { LanguageButton } from '@/components/cv/LanguageButton'
import { ThemeToggle } from '@/components/cv/ThemeToggle'
import type { ProjectLabels } from '../types'

type Props = {
  locale: CvLocale
  labels: ProjectLabels
  backHref: string
}

const ProjectMobileHeader = ({ locale, labels, backHref }: Props) => (
  <header
    data-project-mobile-header
    className="sticky top-0 z-55 flex min-h-16 items-center justify-between border-b-2 border-border bg-card px-4 py-2 lg:hidden [&_button]:min-h-11 [&_button]:min-w-11"
  >
    <Link
      href={backHref}
      transitionTypes={['project-back']}
      className="flex min-h-11 items-center gap-2 text-[0.7rem] font-extrabold uppercase active:opacity-70"
    >
      <ArrowLeft size={17} aria-hidden="true" />
      <span>{labels.back}</span>
    </Link>
    <div className="flex items-center gap-2">
      <ThemeToggle labels={locale.theme} />
      <LanguageButton />
    </div>
  </header>
)

export default ProjectMobileHeader
