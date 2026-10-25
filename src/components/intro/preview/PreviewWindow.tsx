import * as motion from 'motion/react-m'
import PreviewCodeBlock from './PreviewCodeBlock'
import PreviewSidebar from './PreviewSidebar'
import { previewThemes } from './themes'
import type { PreviewWindowProps } from './types'

export default function PreviewWindow({
  animate,
  copy,
  effectsEnabled,
  lang,
  locale,
  sidebarMode,
  theme
}: PreviewWindowProps) {
  return (
    <div
      style={theme === 'system' ? undefined : previewThemes[theme]}
      className="relative overflow-hidden border-2 border-foreground bg-background text-foreground shadow-[3px_3px_0_var(--foreground)]"
    >
      <motion.div
        key={`${lang}-${theme}-${sidebarMode}`}
        aria-hidden="true"
        data-intro-sheen
        className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-transparent via-accent/15 to-transparent"
        initial={animate ? { x: '-100%', opacity: 0 } : false}
        animate={
          animate
            ? { x: '100%', opacity: [0, 0.5, 0] }
            : { x: '100%', opacity: 0 }
        }
        transition={{ duration: animate ? 0.8 : 0, ease: 'easeOut' }}
      />
      <div
        aria-hidden="true"
        className="flex items-center justify-between border-b-2 border-foreground bg-muted px-2 py-2"
      >
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full border border-foreground bg-red-400" />
          <span className="size-1.5 rounded-full border border-foreground bg-amber-300" />
          <span className="size-1.5 rounded-full border border-foreground bg-green-400" />
        </div>
        <span className="font-mono text-[8px]">
          GG {'//'} {copy.portfolio.toUpperCase()}
        </span>
        <span className="border border-foreground bg-accent px-1 font-mono text-[8px] text-accent-foreground">
          {lang.toUpperCase()}
        </span>
      </div>
      <div aria-hidden="true" className="flex min-h-55 sm:min-h-65 xl:min-h-70">
        {sidebarMode === 'expanded' && (
          <PreviewSidebar locale={locale} role={copy.role} />
        )}
        <div className="min-w-0 flex-1 p-2.5">
          <div className="mb-2 flex items-center justify-between border-b border-foreground pb-2 lg:hidden">
            <span className="font-mono text-[8px] font-black">
              GG GIANCARLOS
            </span>
            <span className="font-mono text-[7px]">{lang.toUpperCase()}</span>
          </div>
          <div className="border-2 border-foreground bg-card p-2.5 shadow-[2px_2px_0_var(--foreground)]">
            <p className="mb-1 font-mono text-[6px] uppercase text-muted-foreground">
              {copy.technicalProfile}
            </p>
            <div className="text-[13px] font-black uppercase leading-none tracking-tight sm:text-[15px]">
              {locale.hero.titleLineOne}
              <br />
              {locale.hero.titleLineTwo}
            </div>
            <div className="mt-2 h-px bg-foreground" />
            <p className="mt-2 line-clamp-3 text-[7px] leading-relaxed text-muted-foreground">
              {locale.hero.description}
            </p>
          </div>
          <PreviewCodeBlock effectsEnabled={effectsEnabled} />
          <div className="mt-2 grid grid-cols-2 gap-2">
            {[locale.sections.skills, locale.sections.projects].map(
              (label, index) => (
                <div
                  key={label}
                  className="min-w-0 border border-foreground bg-card p-2 font-mono text-[7px] font-bold uppercase"
                >
                  <span className="text-[6px] text-muted-foreground">
                    0{index + 1} {'//'}
                  </span>
                  <br />
                  {label}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 border-t-2 border-foreground bg-muted px-2 py-1.5 font-mono text-[7px]">
        <span className="flex items-center gap-1">
          <span aria-hidden="true" className="size-1.5 bg-accent" />
          {copy.preview}
        </span>
        <span>
          {copy.animations}: {effectsEnabled ? copy.enabled : copy.disabled}
        </span>
      </div>
    </div>
  )
}
