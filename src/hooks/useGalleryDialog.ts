import {
  type RefObject,
  type SyntheticEvent,
  useId,
  useLayoutEffect,
  useRef
} from 'react'
import { useIntroductionStage } from '@/contexts/IntroductionContext'

type Options = {
  triggerRef: RefObject<HTMLButtonElement | null>
  onDismiss: () => void
}

export function useGalleryDialog({ triggerRef, onDismiss }: Options) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  const { setCursorTarget } = useIntroductionStage()

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const root = document.documentElement
    const overflow = root.style.overflow
    const pathname = window.location.pathname
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    dialog.showModal()
    root.style.overflow = 'hidden'
    setCursorTarget(dialog)
    titleRef.current?.focus({ preventScroll: true })

    return () => {
      setCursorTarget(null)
      dialog.close()
      root.style.overflow = overflow
      // Route navigation owns its new focus/scroll. Closing on the portfolio
      // restores the trigger after the card list is visible again.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (window.location.pathname !== pathname) return
          window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' })
          if (triggerRef.current?.isConnected)
            triggerRef.current.focus({ preventScroll: true })
        })
      })
    }
  }, [setCursorTarget, triggerRef])

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault()
    onDismiss()
  }

  return {
    dialogRef,
    titleRef,
    titleId,
    descriptionId,
    handleCancel
  }
}
