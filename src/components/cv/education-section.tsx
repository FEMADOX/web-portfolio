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
  <section id="education" className="py-16">
    {/* Section Header */}
    <div className="flex items-center justify-between mb-8">
      <h2 className="inline-block bg-accent text-accent-foreground px-4 py-2 text-lg font-bold uppercase tracking-wider">
        Education
      </h2>
    </div>

    {/* Education List */}
    <div className="space-y-6">
      {education.map((item) => (
        <div
          key={item.degree}
          className="flex gap-4 p-4 bg-card border border-border rounded-lg"
        >
          <div className="shrink-0">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{item.degree}</h3>
            <p className="text-sm text-muted-foreground mb-2">{item.period}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Languages */}
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
        Languages
      </h3>
      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg"
          >
            <span className="text-sm font-medium text-foreground">
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
