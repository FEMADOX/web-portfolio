'use client'

import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion, useScroll } from 'motion/react'
import Link from 'next/link'
import { type ReactNode, useEffect, useRef, ViewTransition } from 'react'
import { getCvLocale } from '@/app/i18n'
import type { Lang } from '@/app/types'
import { BrandLogo } from '@/components/cv/BrandLogo'
import { DesktopControlsDock } from '@/components/cv/DesktopControlsDock'
import { Footer } from '@/components/cv/Footer'
import { LanguageButton } from '@/components/cv/LanguageButton'
import { DownloadCvButton } from '@/components/cv/sections/hero/DownloadCvButton'
import { ThemeToggle } from '@/components/cv/ThemeToggle'
import type { ProjectSlug } from '@/data/projects/types'
import { useProjectChapter } from '@/hooks/useProjectChapter'
import { getProjectLabels, PROJECT_CHAPTERS } from './labels'

export function ProjectShell({
  children,
  lang,
  slug,
  title,
  index
}: {
  children: ReactNode
  lang: Lang
  slug: ProjectSlug
  title: string
  index: number
}) {
  const labels = getProjectLabels(lang)
  const locale = getCvLocale(lang)
  const active = useProjectChapter(slug)
  const mobileNavRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()
  const backHref = `/${lang}#projects`

  useEffect(() => {
    const nav = mobileNavRef.current
    const link = nav?.querySelector<HTMLElement>(`[href="#${active}"]`)
    if (!nav?.clientWidth || !link) return
    nav.scrollTo({
      left: link.offsetLeft - (nav.clientWidth - link.clientWidth) / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
    })
  }, [active])

  const chapterLinks = PROJECT_CHAPTERS.map((id, i) => (
    <a
      key={id}
      href={`#${id}`}
      aria-current={active === id ? 'location' : undefined}
      className="project-chapter-link"
    >
      <span aria-hidden="true">0{i + 1}</span>
      <span>{labels.chapters[i]}</span>
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  ))

  return (
    <ViewTransition
      enter="project-page-enter"
      exit="project-page-exit"
      default="none"
    >
      <div className="project-detail" data-project={slug}>
        <a href="#case-study" className="project-skip-link">
          {labels.skip}
        </a>
        <aside className="project-sidebar">
          <Link
            href={`/${lang}`}
            className="project-brand"
            aria-label="Giancarlos Gonzalez · Portfolio"
          >
            <BrandLogo />
            <span>
              <strong>Giancarlos Gonzalez</strong>
              <small>{locale.sidebar.jobTitle}</small>
            </span>
          </Link>
          <Link
            href={backHref}
            transitionTypes={['project-back']}
            className="project-back"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {labels.back}
          </Link>
          <div className="project-sidebar-title">
            <span>
              {labels.caseStudy} / 0{index + 1}
            </span>
            <p>{title}</p>
          </div>
          <nav aria-label={labels.contents} className="project-chapters">
            {chapterLinks}
          </nav>
          <div className="project-sidebar-download">
            <DownloadCvButton
              {...locale.sidebar.downloadCv}
              animation={false}
            />
          </div>
        </aside>
        <header className="project-mobile-header">
          <Link
            href={backHref}
            transitionTypes={['project-back']}
            className="project-mobile-back"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            <span>{labels.back}</span>
          </Link>
          <div>
            <ThemeToggle labels={locale.theme} />
            <LanguageButton />
          </div>
        </header>
        <DesktopControlsDock
          controlsLabel={locale.controls}
          themeLabels={locale.theme}
        />
        <nav
          ref={mobileNavRef}
          className="project-mobile-chapters"
          aria-label={labels.contents}
        >
          {chapterLinks}
        </nav>
        <div className="project-reading-track" aria-hidden="true">
          <motion.div style={{ scaleX: scrollYProgress }} />
        </div>
        <div className="project-detail-main">
          <main id="case-study" tabIndex={-1}>
            {children}
          </main>
          <Footer source={locale.footer.source} />
        </div>
      </div>
    </ViewTransition>
  )
}
