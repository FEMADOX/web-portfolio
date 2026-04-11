"use client"

import { GraduationCap } from "lucide-react"

export function EducationSection() {
  return (
    <section id="education" className="py-12">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="inline-block border border-foreground text-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider">
          Education
        </h2>
      </div>

      {/* Education Item */}
      <div className="flex gap-4 p-4 bg-card rounded-lg">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm">BACHELOR IN IPU EDUARDO GARCIA DELGADO</h3>
          <p className="text-xs text-muted-foreground mt-1">JAN 2018 - JUN 2021</p>
        </div>
      </div>
    </section>
  )
}
