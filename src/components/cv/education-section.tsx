'use client'

import { GraduationCap } from 'lucide-react'

const education = [
  {
    degree: 'Bachelor in IPU Eduardo Garcia Delgado',
    period: 'Jan 2018 - Jun 2021',
    description:
      'Relevant coursework in programming, mathematics and design. Participation in informatic competitions that have posed great challenges to develop my skills as a programmer.'
  }
]

const languages = [
  {
    name: 'English',
    level: 'B2 Advanced Intermediate'
  }
]

export const EducationSection = () => (
  <section id="education" className="py-10">
    {/* Section Header */}
    <div className="flex items-center justify-between mb-5">
      <h2 className="inline-block border-2 border-border bg-card px-4 py-1 text-lg font-black uppercase tracking-wider text-foreground shadow-sm">
        Education
      </h2>
    </div>

    {/* Education List */}
    <div className="space-y-5">
      {education.map((item) => (
        <div
          key={item.degree}
          className="flex gap-4 p-4 bg-card border-2 border-border shadow-[3px_3px_0_0_#000]"
        >
          <div className="shrink-0">
            <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <h3 className="font-black uppercase leading-tight text-foreground">
              {item.degree}
            </h3>
            <p className="text-xs font-bold uppercase text-muted-foreground mt-2">
              {item.period}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Languages */}
    <div className="mt-6">
      <h3 className="text-xs font-black text-foreground uppercase tracking-wider mb-3">
        Languages
      </h3>
      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="flex items-center gap-2 px-3 py-2 bg-muted border border-border"
          >
            <span className="text-xs font-bold uppercase text-foreground">
              {lang.name}
            </span>
            <span className="text-xs text-muted-foreground">
              ({lang.level})
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
)
