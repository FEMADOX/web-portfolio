'use client'

import { Pause, Play } from 'lucide-react'
import type { Lang } from '@/app/types'
import { Button } from '@/components/ui/button'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'

const EFFECTS_LABELS: Record<
  Lang,
  { label: string; pause: string; resume: string }
> = {
  en: {
    label: 'Visual effects',
    pause: 'Pause visual effects',
    resume: 'Resume visual effects'
  },
  es: {
    label: 'Efectos visuales',
    pause: 'Pausar efectos visuales',
    resume: 'Reanudar efectos visuales'
  },
  pt: {
    label: 'Efeitos visuais',
    pause: 'Pausar efeitos visuais',
    resume: 'Retomar efeitos visuais'
  }
}

export const EffectsToggle = () => {
  const lang = useLanguageContext()
  const { effectsEnabled, toggleEffects } = useMotionPreferences()
  const labels = EFFECTS_LABELS[lang]

  return (
    <Button
      aria-label={labels.label}
      aria-pressed={effectsEnabled}
      className="size-11 border-2 border-border bg-background p-2 text-foreground hover:cursor-pointer hover:bg-primary hover:text-primary-foreground dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground"
      data-effects-toggle=""
      onClick={toggleEffects}
      title={effectsEnabled ? labels.pause : labels.resume}
      type="button"
      variant="ghost"
    >
      {effectsEnabled ? (
        <Pause aria-hidden="true" className="size-5" strokeWidth={2.8} />
      ) : (
        <Play aria-hidden="true" className="size-5" strokeWidth={2.8} />
      )}
    </Button>
  )
}
