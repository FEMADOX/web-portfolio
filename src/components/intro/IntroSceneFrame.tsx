import type { ReactNode } from 'react'
import { introCopy } from './copy'
import SceneNavigation from './SceneNavigation'
import type { IntroScenesProps } from './types'

type Props = Pick<
  IntroScenesProps,
  'scene' | 'lang' | 'animate' | 'onConfigure' | 'onBack'
> & { children: ReactNode }

export default function IntroSceneFrame({
  scene,
  lang,
  animate: reveal,
  onConfigure,
  onBack,
  children
}: Props) {
  const copy = introCopy[lang]
  const settings = scene === 'settings'
  return (
    <div
      data-intro-motion={reveal}
      className="relative flex min-h-dvh flex-col text-foreground data-[intro-motion=false]:**:data-intro-entrance:transform-none! data-[intro-motion=false]:**:data-intro-entrance:opacity-100! data-[intro-motion=false]:**:data-intro-sheen:opacity-0!"
    >
      <header className="flex min-h-16 items-center justify-between gap-2 border-b-2 border-foreground bg-background/95 px-4 py-3 sm:px-8 lg:px-12">
        <div className="border-2 border-foreground bg-foreground px-2 py-1 font-mono text-[9px] font-bold uppercase text-background shadow-[2px_2px_0_var(--foreground)] sm:px-3 sm:text-xs">
          <span
            aria-hidden="true"
            className="mr-1.5 inline-block size-1.5 bg-accent"
          />
          GG {'//'} {copy.portfolio}
        </div>
        <SceneNavigation
          scene={scene}
          labels={copy}
          label={copy.dialogLabel}
          animate={reveal}
          onSelect={next => (next === 'settings' ? onConfigure() : onBack())}
        />
      </header>

      {children}

      <footer className="mt-auto flex items-center justify-between gap-3 border-t-2 border-foreground bg-background px-4 py-3 font-mono text-[9px] font-bold sm:px-8 sm:text-[10px] lg:px-12">
        <span>
          <span
            aria-hidden="true"
            className="mr-2 inline-block size-1.5 border border-foreground"
          />
          {copy.journey}
        </span>
        <span className="shrink-0 border border-foreground px-2 py-0.5">
          [ {settings ? '02' : '01'} / 02 ]
        </span>
      </footer>
    </div>
  )
}
