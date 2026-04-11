"use client"

const skills = [
  { name: "Python", icon: "<>" },
  { name: "Django", icon: "□" },
  { name: "FastAPI", icon: "⚡" },
  { name: "JS/TS", icon: "⌘" },
  { name: "React", icon: "◇" },
  { name: "NextJS", icon: "#" },
  { name: "Postgres", icon: "▢" },
  { name: "Docker", icon: "◈" },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-12">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="inline-block bg-accent text-accent-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider">
          Technical Skills
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-3 px-4 py-3 rounded-md border border-border bg-transparent hover:border-muted-foreground transition-colors"
          >
            <span className="text-muted-foreground text-sm">{skill.icon}</span>
            <span className="text-sm font-medium text-foreground uppercase tracking-wide">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
