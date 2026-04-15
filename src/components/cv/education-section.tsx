'use client'

import { Educations } from './sections/education/Educations'
import { Languages } from './sections/education/Languages'

export const EducationSection = () => (
  <section id="education" className="my-20 group">
    {/* Section Header */}
    <div className="flex items-center justify-between mb-5">
      <h2
        className={`
          inline-block border-2 border-border bg-card px-4 py-1 text-lg font-black uppercase tracking-wider text-foreground shadow-sm
          group-hover:bg-accent group-hover:text-accent-foreground transition-colors
        `}
      >
        Education
      </h2>
    </div>

    {/* Education List */}
    <Educations />

    {/* Languages */}
    <Languages />
  </section>
)
