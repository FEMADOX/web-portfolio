'use client'

import { type RefObject, useEffect, useRef } from 'react'
import type { IntroductionStage } from '@/contexts/IntroductionContext'

const INTERACTIVE =
  'button, a[href], input, select, textarea, [contenteditable]'
const WHEEL_GESTURE_GAP = 300
const WHEEL_THRESHOLD = 48
const TOUCH_THRESHOLD = 36

type WheelGesture = {
  lastAt: number
  direction: number
  distance: number
  startedAtTop: boolean
  consumed: boolean
}

type TouchGesture = {
  identifier: number
  x: number
  y: number
  lastX: number
  lastY: number
  direction: number
  startedAtTop: boolean
  consumed: boolean
}

export default function useIntroductionScroll(
  dialogRef: RefObject<HTMLDialogElement | null>,
  stage: IntroductionStage,
  advance: () => void,
  retreat: () => void
) {
  // Keep the current gesture through the scene change, including its inertia.
  const wheelRef = useRef<WheelGesture>({
    lastAt: 0,
    direction: 0,
    distance: 0,
    startedAtTop: false,
    consumed: false
  })
  const touchRef = useRef<TouchGesture | null>(null)
  const previousStageRef = useRef(stage)

  useEffect(() => {
    if (previousStageRef.current !== stage) {
      previousStageRef.current = stage
      const wheel = wheelRef.current
      wheel.distance = 0
      if (performance.now() - wheel.lastAt < WHEEL_GESTURE_GAP) {
        wheel.consumed = true
      }
      if (touchRef.current) touchRef.current.consumed = true
    }
    if (stage === 'closed') return
    const dialog = dialogRef.current
    if (!dialog) return

    const changeScene = () => {
      if (stage === 'identity') advance()
      else retreat()
    }

    const onWheel = (event: WheelEvent) => {
      const wheel = wheelRef.current
      if (
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        event.deltaY === 0
      ) {
        wheel.distance = 0
        return
      }
      const now = performance.now()
      const direction = Math.sign(event.deltaY)
      if (now - wheel.lastAt > WHEEL_GESTURE_GAP || wheel.lastAt === 0) {
        wheel.distance = 0
        wheel.consumed = false
        // Reaching the top during a gesture does not make that gesture eligible.
        wheel.startedAtTop = dialog.scrollTop <= 1
      }
      wheel.lastAt = now
      if (wheel.direction !== direction) wheel.distance = 0
      wheel.direction = direction
      if (wheel.consumed) {
        event.preventDefault()
        return
      }
      if (stage === 'settings' && (direction > 0 || dialog.scrollTop > 1)) {
        wheel.startedAtTop = false
      }
      const eligible =
        stage === 'identity'
          ? direction > 0
          : direction < 0 && wheel.startedAtTop && dialog.scrollTop <= 1
      if (!eligible) {
        wheel.distance = 0
        return
      }
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? dialog.clientHeight
            : 1
      wheel.distance += Math.abs(event.deltaY) * unit
      event.preventDefault()
      if (wheel.distance >= WHEEL_THRESHOLD) {
        wheel.consumed = true
        changeScene()
      }
    }

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches.length === 1 ? event.touches[0] : null
      touchRef.current = touch
        ? {
            x: touch.clientX,
            y: touch.clientY,
            lastX: touch.clientX,
            lastY: touch.clientY,
            identifier: touch.identifier,
            direction: 0,
            startedAtTop: dialog.scrollTop <= 1,
            consumed: false
          }
        : null
    }

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches.length === 1 ? event.touches[0] : null
      const gesture = touchRef.current
      if (!gesture || !touch || touch.identifier !== gesture.identifier) {
        touchRef.current = null
        return
      }
      if (gesture.consumed) {
        if (event.cancelable) event.preventDefault()
        return
      }
      const direction = Math.sign(gesture.lastY - touch.clientY)
      if (direction !== 0 && direction !== gesture.direction) {
        gesture.x = gesture.lastX
        gesture.y = gesture.lastY
        gesture.direction = direction
      }
      gesture.lastX = touch.clientX
      gesture.lastY = touch.clientY
      const distance = gesture.y - touch.clientY
      if (Math.abs(distance) <= Math.abs(gesture.x - touch.clientX)) return
      if (stage === 'settings' && (distance > 0 || dialog.scrollTop > 1)) {
        gesture.startedAtTop = false
      }
      const eligible =
        stage === 'identity'
          ? distance > 0
          : distance < 0 && gesture.startedAtTop && dialog.scrollTop <= 1
      if (!eligible) return
      // Claim a top-edge swipe before native overscroll takes over the gesture.
      if (event.cancelable) event.preventDefault()
      if (Math.abs(distance) < TOUCH_THRESHOLD) return
      gesture.consumed = true
      changeScene()
    }

    const clearTouch = () => {
      touchRef.current = null
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return
      const target = event.target
      if (!(target instanceof Element) || target.closest(INTERACTIVE)) return
      if (target !== dialog && !target.closest('h1, h2, h3, h4, h5, h6')) return
      if (event.shiftKey && event.key !== ' ') return
      const eligible =
        stage === 'identity'
          ? !event.shiftKey &&
            ['ArrowDown', 'PageDown', ' '].includes(event.key)
          : dialog.scrollTop <= 1 &&
            (['ArrowUp', 'PageUp', 'Home'].includes(event.key) ||
              (event.key === ' ' && event.shiftKey))
      if (!eligible) return
      event.preventDefault()
      changeScene()
    }

    dialog.addEventListener('wheel', onWheel, { passive: false })
    dialog.addEventListener('touchstart', onTouchStart, { passive: true })
    dialog.addEventListener('touchmove', onTouchMove, { passive: false })
    dialog.addEventListener('touchend', clearTouch)
    dialog.addEventListener('touchcancel', clearTouch)
    dialog.addEventListener('keydown', onKeyDown)
    return () => {
      dialog.removeEventListener('wheel', onWheel)
      dialog.removeEventListener('touchstart', onTouchStart)
      dialog.removeEventListener('touchmove', onTouchMove)
      dialog.removeEventListener('touchend', clearTouch)
      dialog.removeEventListener('touchcancel', clearTouch)
      dialog.removeEventListener('keydown', onKeyDown)
    }
  }, [dialogRef, stage, advance, retreat])
}
