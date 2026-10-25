import { animate, type MotionValue } from 'motion/react'
import type { IntroductionStage } from '@/contexts/IntroductionContext'

const AUTONOMOUS_DURATION = 18

export const PRECISE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

export const startIntroductionChoreography = (
  targetX: MotionValue<number>,
  targetY: MotionValue<number>,
  stage: IntroductionStage
) => {
  if (stage === 'closed') return () => {}

  const width = window.innerWidth
  const height = window.innerHeight
  const desktop = width >= 1024
  const destinationX = desktop ? -width * 0.27 : width * 0.15
  const destinationY = desktop ? -height * 0.05 : -height * 0.2
  const identity = stage === 'identity'
  const horizontal = animate(
    targetX,
    identity ? [width * 0.2, -width * 0.08, destinationX] : destinationX,
    { duration: identity ? 1.9 : 0.45, ease: 'easeInOut' }
  )
  const vertical = animate(
    targetY,
    identity ? [-height * 0.12, height * 0.06, destinationY] : destinationY,
    { duration: identity ? 1.9 : 0.45, ease: 'easeInOut' }
  )

  return () => {
    horizontal.stop()
    vertical.stop()
  }
}

export const trackPrecisePointer = (
  targetX: MotionValue<number>,
  targetY: MotionValue<number>,
  stopEntrance: () => void
) => {
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
    stopEntrance()
    targetX.set(event.clientX - window.innerWidth / 2)
    targetY.set(event.clientY - window.innerHeight / 2)
  }
  const recenter = () => {
    stopEntrance()
    targetX.set(0)
    targetY.set(0)
  }

  window.addEventListener('pointermove', move, { passive: true })
  document.documentElement.addEventListener('pointerleave', recenter)
  window.addEventListener('blur', recenter)

  return () => {
    window.removeEventListener('pointermove', move)
    document.documentElement.removeEventListener('pointerleave', recenter)
    window.removeEventListener('blur', recenter)
  }
}

export const startAutonomousLoop = (
  targetX: MotionValue<number>,
  targetY: MotionValue<number>
) => {
  const width = Math.min(window.innerWidth * 0.25, 150)
  const height = Math.min(window.innerHeight * 0.2, 180)
  const options = {
    duration: AUTONOMOUS_DURATION,
    repeat: Infinity,
    ease: 'easeInOut' as const
  }
  const horizontal = animate(targetX, [0, width, -width, 0], options)
  const vertical = animate(targetY, [0, -height, height, 0], options)

  return () => {
    horizontal.stop()
    vertical.stop()
  }
}
