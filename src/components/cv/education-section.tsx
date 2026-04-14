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
    name: 'Spanish',
    level: 'Native'
  },
  {
    name: 'English',
    level: 'B2 Advanced Intermediate'
  }
]

export const EducationSection = () => (
  // TODO (FENYXZ): Refactor this component to have a more structured layout.
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
    <div className="space-y-5">
      {education.map((item) => (
        <div
          key={item.degree}
          className="flex gap-4 p-4 bg-card border-2 border-border shadow-normal elevation-animation"
        >
          <div className="shrink-0">
            <div className="w-10 h-10 flex items-center justify-center">
              <GraduationCap stroke="currentColor" size={30} />
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
      <div className="flex flex-wrap flex-col gap-3 w-max">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="flex items-center gap-2 px-3 py-2 bg-muted border border-border shadow-sm elevation-animation"
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
