import * as motion from 'motion/react-m'
import { getCvLocale } from '@/app/i18n'
import type { Lang } from '@/app/types'
import type { SidebarMode } from '@/lib/sidebarPreference'
import { introCopy } from './copy'
import { introEntrance } from './introMotion'
import PreviewWindow from './preview/PreviewWindow'
import type { IntroTheme } from './types'

interface Props {
  lang: Lang
  theme: IntroTheme
  sidebarMode: SidebarMode
  effectsEnabled: boolean
  animate?: boolean
}

export default function IntroPreview({
  lang,
  theme,
  sidebarMode,
  effectsEnabled,
  animate = false
}: Props) {
  const copy = introCopy[lang]
  const locale = getCvLocale(lang)

  return (
    <motion.figure
      {...introEntrance(animate, 0.18, 'frame')}
      className="min-w-0 self-start"
      aria-label={copy.previewDescription}
    >
      <figcaption className="mb-2 flex items-center justify-between gap-2 font-mono text-[10px] font-bold uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 bg-secondary" />
          {copy.preview}
        </span>
        <span className="border border-foreground/50 bg-muted px-1.5 py-0.5 text-[8px] font-normal tracking-normal">
          {lang.toUpperCase()} · {copy[theme]}
        </span>
      </figcaption>
      <PreviewWindow
        animate={animate}
        copy={copy}
        effectsEnabled={effectsEnabled}
        lang={lang}
        locale={locale}
        sidebarMode={sidebarMode}
        theme={theme}
      />
    </motion.figure>
  )
}
