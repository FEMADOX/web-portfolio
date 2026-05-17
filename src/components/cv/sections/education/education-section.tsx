'use client'

import type { CvLocale, Lang } from '@/app/types'
import { Educations } from './Educations'
import { Languages } from './Languages'

interface EducationSectionProps {
  sectionTitle: CvLocale['sections']['education']
  lang: Lang
}

export const EducationSection = ({
  sectionTitle,
  lang
}: EducationSectionProps) => (
  <section id="education" className="my-20 group">
    {/* Section Header */}
    <div className="flex items-center justify-between mb-5">
      <h2
        className={`
          inline-block border-2 border-border bg-card px-4 py-1 text-lg font-black uppercase tracking-wider text-foreground shadow-sm
          group-hover:bg-accent group-hover:text-accent-foreground transition-colors
        `}
      >
        {sectionTitle}
      </h2>
      <span className="text-xs text-accent font-mono hidden sm:block">
        EDUCATION.03
      </span>
    </div>

    {/* Education List */}
    <Educations lang={lang} />

    {/* Languages */}
    <Languages lang={lang} />
  </section>
)
