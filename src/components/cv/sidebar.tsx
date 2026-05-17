import type { CvLocale } from '@/app/types'
import { cn } from '@/lib/utils'
import { BrandLogo } from './BrandLogo'
import { NavItems } from './NavItems'
import { DownloadCvButton } from './sections/hero/DownloadCvButton'

interface SidebarProps {
  activeSection: string
  onNavigate: (section: string) => void
  className?: string
  sidebar: CvLocale['sidebar']
}

export const Sidebar = ({
  activeSection,
  onNavigate,
  className,
  sidebar: {
    jobTitle,
    navLabels,
    downloadCv: { cvLangUrl, downloadName, buttonText }
  }
}: SidebarProps) => (
  <aside
    className={cn(
      'fixed left-0 top-0 h-screen w-74 bg-card border-r-4 border-border flex flex-col z-50',
      className
    )}
  >
    <div className="p-2 border-b-4 border-border">
      <div className="flex items-center gap-3">
        <BrandLogo />
        <div className="min-w-0 flex-1">
          <h2 className="font-black uppercase text-foreground leading-none">
            Giancarlos Gonzalez
          </h2>
          <p className="text-xs text-accent font-black tracking-wider mt-1 uppercase">
            {jobTitle}
          </p>
        </div>
      </div>
    </div>

    <NavItems
      activeSection={activeSection}
      onNavigate={onNavigate}
      navLabels={navLabels}
    />

    <div className="p-4 border-t-4 border-border mx-0 text-center">
      <DownloadCvButton
        cvLangUrl={cvLangUrl}
        downloadName={downloadName}
        buttonText={buttonText}
        animation={false}
      />
    </div>
  </aside>
)
