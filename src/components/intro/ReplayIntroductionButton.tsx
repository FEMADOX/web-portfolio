'use client'

import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIntroductionStage } from '@/contexts/IntroductionContext'
import { useLanguageContext } from '@/contexts/LanguageContext'

const labels = {
  en: 'Replay introduction',
  es: 'Volver a ver la intro',
  pt: 'Rever apresentação'
} as const

export default function ReplayIntroductionButton() {
  const lang = useLanguageContext()
  const { replayRequest, replayIntroduction } = useIntroductionStage()
  const label = labels[lang]

  return (
    <Button
      type="button"
      variant="control"
      size="icon"
      className="size-11"
      aria-label={label}
      aria-haspopup="dialog"
      aria-busy={replayRequest !== null}
      title={label}
      data-introduction-replay
      disabled={replayRequest !== null}
      onClick={event => replayIntroduction(event.currentTarget)}
    >
      <RotateCcw aria-hidden="true" />
    </Button>
  )
}
