import { skillGroups } from './data'

export const SkillGroupsFallback = () => (
  <div className="flex flex-col gap-5">
    {skillGroups.map(group => (
      <div key={group.key}>
        <span className="inline-block mb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5">
          {group.label}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {group.names.map(name => (
            <div
              key={name}
              className="flex items-center gap-2 px-3 py-2.5 border-2 border-border bg-card shadow-sm"
            >
              <span aria-hidden="true" className="size-7.5 shrink-0" />
              <span className="text-xs font-black text-foreground uppercase">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)
