'use client'

import { animate, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'

const PRECISE_POINTER = '(hover: hover) and (pointer: fine)'
const FRAME_SPRING = { stiffness: 500, damping: 38, mass: 0.5 }
const ACTIVE_FRAME_ROTATION = 45
const NATIVE_TARGETS = [
  'input',
  'textarea',
  'select',
  'iframe',
  '[contenteditable]:not([contenteditable="false"])',
  '[data-native-cursor]',
  ':disabled',
  '[aria-disabled="true"]',
  '[inert]',
  'video[controls]',
  'audio[controls]'
].join(',')
const INTERACTIVE_TARGETS = [
  'a[href]',
  'button',
  'summary',
  'label[for]',
  '[role="button"]',
  '[role="link"]',
  '[role="combobox"]',
  '[role="option"]',
  '[role="menuitem"]'
].join(',')

export default function useTechnicalCursor() {
  const { canAnimate } = useMotionPreferences()
  const cursorRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const frameX = useSpring(x, FRAME_SPRING)
  const frameY = useSpring(y, FRAME_SPRING)
  const size = useSpring(26, FRAME_SPRING)
  const reticleOffset = useMotionValue(0)
  const frameRotation = useMotionValue(0)

  useEffect(() => {
    const cursor = cursorRef.current
    // Transition snapshots must be able to exclude the decorative cursor.
    if (
      !canAnimate ||
      !cursor ||
      !CSS.supports('selector(:active-view-transition)')
    ) {
      return
    }

    const root = document.documentElement
    const pointer = window.matchMedia(PRECISE_POINTER)
    let tracking = false
    let visible = false
    let interactive = false
    let pressed = false
    let stopReticleAnimation: (() => void) | undefined
    let stopFrameRotation: (() => void) | undefined

    const hide = () => {
      stopReticleAnimation?.()
      stopReticleAnimation = undefined
      reticleOffset.set(0)
      stopFrameRotation?.()
      stopFrameRotation = undefined
      frameRotation.set(0)
      cursor.dataset.visible = 'false'
      delete root.dataset.technicalCursor
      visible = false
    }

    const reset = () => {
      tracking = false
      pressed = false
      hide()
      frameX.stop()
      frameY.stop()
      size.stop()
    }

    const updateTarget = (target: EventTarget | null) => {
      if (!tracking || !pointer.matches) return
      const element = target instanceof Element ? target : null
      if (!element || element.closest(NATIVE_TARGETS)) {
        hide()
        return
      }

      const nextInteractive = Boolean(element.closest(INTERACTIVE_TARGETS))
      if (!visible) {
        frameX.jump(x.get())
        frameY.jump(y.get())
        cursor.dataset.visible = 'true'
        root.dataset.technicalCursor = 'active'
      }
      if (!visible || interactive !== nextInteractive) {
        interactive = nextInteractive
        cursor.dataset.interactive = String(interactive)
        stopReticleAnimation?.()
        stopReticleAnimation = undefined
        stopFrameRotation?.()
        stopFrameRotation = undefined

        const targetRotation = interactive
          ? (Math.random() < 0.5 ? -1 : 1) * ACTIVE_FRAME_ROTATION
          : 0

        if (frameRotation.get() !== targetRotation) {
          const rotation = animate(frameRotation, targetRotation, {
            duration: interactive ? 0.45 : 0.3,
            ease: 'easeInOut'
          })
          stopFrameRotation = () => rotation.stop()
        }

        if (interactive) {
          reticleOffset.set(0)
          const animation = animate(reticleOffset, [0, 4, 0], {
            delay: 0.3,
            duration: 1.8,
            ease: 'easeInOut',
            repeat: Infinity
          })
          stopReticleAnimation = () => animation.stop()
        } else if (reticleOffset.get() !== 0) {
          const animation = animate(reticleOffset, 0, {
            duration: 0.18,
            ease: 'easeOut'
          })
          stopReticleAnimation = () => animation.stop()
        }
      }
      size.set(pressed ? 20 : interactive ? 38 : 26)
      visible = true
    }

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !pointer.matches) {
        reset()
        return
      }
      tracking = true
      x.set(event.clientX)
      y.set(event.clientY)
      updateTarget(event.target)
    }

    const over = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') updateTarget(event.target)
    }

    const press = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        reset()
        return
      }
      pressed = event.buttons !== 0
      updateTarget(event.target)
    }

    const refreshTarget = () => {
      if (tracking) {
        updateTarget(document.elementFromPoint(x.get(), y.get()))
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' || event.key === 'Escape') reset()
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', press, { passive: true })
    window.addEventListener('pointerup', press, { passive: true })
    window.addEventListener('pointercancel', reset)
    window.addEventListener('blur', reset)
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('scroll', refreshTarget, {
      passive: true,
      capture: true
    })
    document.addEventListener('dragstart', reset)
    root.addEventListener('pointerleave', reset)
    pointer.addEventListener('change', reset)

    return () => {
      reset()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', press)
      window.removeEventListener('pointercancel', reset)
      window.removeEventListener('blur', reset)
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('scroll', refreshTarget, true)
      document.removeEventListener('dragstart', reset)
      root.removeEventListener('pointerleave', reset)
      pointer.removeEventListener('change', reset)
    }
  }, [canAnimate, x, y, frameX, frameY, size, reticleOffset, frameRotation])

  return { cursorRef, x, y, frameX, frameY, size, reticleOffset, frameRotation }
}
