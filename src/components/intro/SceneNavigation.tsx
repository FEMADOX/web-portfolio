'use client'

import { animate as animateValue, useMotionValue } from 'motion/react'
import * as motion from 'motion/react-m'
import { useEffect } from 'react'
import type { IntroductionScene } from './types'

type SceneNavigationProps = {
  scene: IntroductionScene
  labels: {
    identity: string
    settings: string
  }
  label: string
  animate: boolean
  onSelect: (scene: IntroductionScene) => void
}

const scenes = ['identity', 'settings'] as const

export default function SceneNavigation({
  scene,
  labels,
  label,
  animate,
  onSelect
}: SceneNavigationProps) {
  const position = useMotionValue(scene === 'identity' ? '0%' : '100%')

  useEffect(() => {
    const target = scene === 'identity' ? '0%' : '100%'
    if (!animate) {
      position.jump(target)
      return
    }
    const animation = animateValue(position, target, {
      type: 'spring',
      stiffness: 360,
      damping: 36,
      mass: 0.8
    })
    return () => animation.stop()
  }, [animate, scene, position])

  return (
    <fieldset className="m-0 min-w-0 shrink-0 border-2 border-foreground bg-background p-0.5 font-mono text-[8px] font-bold uppercase tracking-wide sm:text-[10px]">
      <legend className="sr-only">{label}</legend>
      <div className="relative isolate grid grid-cols-2">
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block w-1/2 bg-accent"
          initial={false}
          style={{ x: position }}
        />
        {scenes.map((option, index) => {
          const active = scene === option

          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => {
                if (!active) onSelect(option)
              }}
              className={`relative z-10 flex min-h-10 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap px-2 text-center uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:min-h-8 sm:px-3 ${
                active ? 'text-accent-foreground' : 'text-muted-foreground'
              }`}
            >
              <span aria-hidden="true">0{index + 1}</span>
              {labels[option]}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
