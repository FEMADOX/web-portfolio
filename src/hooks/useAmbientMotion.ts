'use client'

import { useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import {
  PRECISE_POINTER_QUERY,
  startAutonomousLoop,
  startIntroductionChoreography,
  trackPrecisePointer
} from '@/components/ambient/motion'
import { useIntroductionStage } from '@/contexts/IntroductionContext'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'

const AMBIENT_SPRING_OPTIONS = { stiffness: 32, damping: 24, mass: 1.2 }

export default function useAmbientMotion() {
  const { canAnimate: effectsCanAnimate } = useMotionPreferences()
  const { stage } = useIntroductionStage()
  const [mounted, setMounted] = useState(false)
  // The provider may be ready before this Suspense subtree hydrates.
  const canAnimate = mounted && effectsCanAnimate
  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const x = useSpring(targetX, AMBIENT_SPRING_OPTIONS)
  const y = useSpring(targetY, AMBIENT_SPRING_OPTIONS)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!canAnimate) {
      x.jump(0)
      y.jump(0)
      targetX.set(0)
      targetY.set(0)
      return
    }

    const precisePointer = window.matchMedia(PRECISE_POINTER_QUERY)
    let stopMotion = () => {}

    const startMotion = () => {
      stopMotion()
      if (precisePointer.matches) {
        const stopEntrance = startIntroductionChoreography(
          targetX,
          targetY,
          stage
        )
        const stopPointer = trackPrecisePointer(targetX, targetY, stopEntrance)
        stopMotion = () => {
          stopEntrance()
          stopPointer()
        }
      } else {
        stopMotion = startAutonomousLoop(targetX, targetY)
      }
    }

    startMotion()
    precisePointer.addEventListener('change', startMotion)
    window.addEventListener('resize', startMotion)

    return () => {
      stopMotion()
      precisePointer.removeEventListener('change', startMotion)
      window.removeEventListener('resize', startMotion)
      x.stop()
      y.stop()
    }
  }, [canAnimate, stage, targetX, targetY, x, y])

  return { x, y, canAnimate }
}
