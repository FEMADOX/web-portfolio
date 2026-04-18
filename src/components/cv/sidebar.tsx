import Image from 'next/image'
import type { CvLocale } from '@/app/i18n'
import { cn } from '@/lib/utils'
import { LanguageButton, type LanguageButtonProps } from './LanguageButton'
import { NavItems } from './NavItems'
import { DownloadCvButton } from './sections/hero/DownloadCvButton'

interface SidebarProps {
  activeSection: string
  onNavigate: (section: string) => void
  className?: string
  sidebar: CvLocale['sidebar']
  languageButtonProps: LanguageButtonProps
}

export const Sidebar = ({
  activeSection,
  onNavigate,
  className,
  sidebar: {
    jobTitle,
    navLabels,
    downloadCv: { cvLangUrl, downloadName, buttonText }
  },
  languageButtonProps: { lang, setLang }
}: SidebarProps) => (
  <aside
    className={cn(
      'fixed left-0 top-0 h-screen w-72 bg-card border-r-4 border-border flex flex-col z-50',
      className
    )}
  >
    <div className="p-2 border-b-4 border-border">
      <div className="flex items-center gap-3">
        <div className="relative w-12 overflow-hidden bg-muted border-2 border-border h-full">
          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-black text-lg">
            {/* Ligh mode Logo */}
            <Image
              src="/api/logo/black"
              alt="Logo"
              width={10}
              height={10}
              className="object-contain h-full w-full dark:hidden"
              priority
            />
            {/* Dark mode Logo */}
            <Image
              src="/api/logo/white"
              alt="Logo"
              width={10}
              height={10}
              className="object-contain h-full w-full hidden dark:block"
              priority
            />
          </div>
        </div>
        <div>
          <h2 className="font-black uppercase text-foreground leading-none">
            Giancarlos Gonzalez
          </h2>
          <p className="text-xs text-accent font-black tracking-wider mt-1 uppercase">
            {jobTitle}
          </p>
        </div>
        <LanguageButton lang={lang} setLang={setLang} />
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
