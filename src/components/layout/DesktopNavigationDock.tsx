'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { type ReactNode, useRef } from 'react'
import { getCvLocale } from '@/app/i18n'
import { BrandLogo } from '@/components/cv/BrandLogo'
import { DownloadCvButton } from '@/components/cv/sections/hero/DownloadCvButton'
import { useLanguageContext } from '@/contexts/LanguageContext'
import useSidebarEntrance from '@/hooks/useSidebarEntrance'

type Props = {
  children: ReactNode
  backHref?: string
  backLabel?: string
}

export default function DesktopNavigationDock({
  children,
  backHref,
  backLabel
}: Props) {
  const lang = useLanguageContext()
  const locale = getCvLocale(lang)
  const dockRef = useRef<HTMLDivElement>(null)
  useSidebarEntrance(dockRef, 'dock')

  return (
    <div
      ref={dockRef}
      data-desktop-navigation-dock
      className="pointer-events-auto flex h-17 w-full max-w-fit min-w-0 items-center gap-2 border-4 border-border bg-card/95 px-3 shadow-normal backdrop-blur-sm"
    >
      <Link
        href={`/${lang}`}
        aria-label="Giancarlos Gonzalez · Portfolio"
        title="Giancarlos Gonzalez · Portfolio"
        className="flex size-11 shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <BrandLogo />
      </Link>
      {backHref && (
        <Link
          href={backHref}
          transitionTypes={['project-back']}
          title={backLabel}
          aria-label={backLabel}
          className="flex size-11 shrink-0 items-center justify-center border-2 border-border bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ArrowLeft size={17} aria-hidden="true" />
        </Link>
      )}
      {children}
      <DownloadCvButton
        {...locale.sidebar.downloadCv}
        variant="dock"
        animation={true}
      />
    </div>
  )
}
