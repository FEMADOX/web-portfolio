'use client'

import {
  cancelFrame,
  frame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from 'motion/react'
import * as motion from 'motion/react-m'
import {
  type RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  ViewTransition
} from 'react'
import type {} from 'react/canary'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'
import { ProjectReveal } from './Motion'
import { HeroVisualAccent, HeroVisualNode } from './ProjectVisualMotion'
import {
  getProjectVisualClassName,
  getProjectVisualCode,
  ProjectVisualContent,
  type ProjectVisualProps
} from './StaticVisual'

function HeroVisualDepth({
  code,
  target
}: {
  code: string
  target: RefObject<HTMLDivElement | null>
}) {
  const { canAnimate } = useMotionPreferences()
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start']
  })
  const origin = useMotionValue(0)
  const [depthReady, setDepthReady] = useState(false)
  const y = useTransform<number, number>(
    [scrollYProgress, origin],
    ([progress, initial]) =>
      Math.max(-8, Math.min(8, (progress - initial) * 16))
  )

  useLayoutEffect(() => {
    // Scroll progress is measured in Motion's read/preUpdate phases. Capture
    // that first measurement before enabling depth so hydration keeps y at 0.
    const captureOrigin = () => {
      origin.set(scrollYProgress.get())
      setDepthReady(true)
    }
    frame.postRender(captureOrigin)
    return () => cancelFrame(captureOrigin)
  }, [origin, scrollYProgress])

  return (
    <motion.span
      style={{ y: depthReady && canAnimate ? y : 0 }}
      className="pointer-events-none absolute -right-4 bottom-0 -z-1 text-(--project-color) opacity-[0.045] [font:900_17rem/1_sans-serif]"
    >
      {code}
    </motion.span>
  )
}

const ProjectVisual = ({ slug, variant = 'card' }: ProjectVisualProps) => {
  const code = getProjectVisualCode(slug)
  const { motionEnabled, canAnimate } = useMotionPreferences()
  const visualMotionEnabled = variant === 'hero' ? canAnimate : motionEnabled
  const ref = useRef<HTMLDivElement | null>(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 240, damping: 28 })
  const y = useSpring(pointerY, { stiffness: 240, damping: 28 })
  const rotateX = useTransform(y, [-4, 4], [3, -3])
  const rotateY = useTransform(x, [-4, 4], [-3, 3])

  useEffect(() => {
    if (!visualMotionEnabled) {
      pointerX.jump(0)
      pointerY.jump(0)
      x.jump(0)
      y.jump(0)
    }
  }, [visualMotionEnabled, pointerX, pointerY, x, y])

  useEffect(() => {
    const reset = () => {
      pointerX.set(0)
      pointerY.set(0)
    }
    window.addEventListener('blur', reset)
    return () => window.removeEventListener('blur', reset)
  }, [pointerX, pointerY])

  const resetTilt = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <ViewTransition
      name={`project-visual-${slug}`}
      share={{
        default: 'none',
        'project-forward': 'project-morph',
        'project-back': 'project-morph'
      }}
      default="none"
    >
      <motion.div
        ref={ref}
        style={{
          x: visualMotionEnabled ? x : 0,
          y: visualMotionEnabled ? y : 0,
          rotateX: visualMotionEnabled ? rotateX : 0,
          rotateY: visualMotionEnabled ? rotateY : 0,
          transformPerspective: 900
        }}
        onPointerMove={event => {
          if (
            !visualMotionEnabled ||
            event.pointerType !== 'mouse' ||
            !window.matchMedia('(hover: hover) and (pointer: fine)').matches
          )
            return
          const bounds = event.currentTarget.getBoundingClientRect()
          pointerX.set(
            Math.max(
              -4,
              Math.min(
                4,
                ((event.clientX - bounds.left) / bounds.width - 0.5) * 8
              )
            )
          )
          pointerY.set(
            Math.max(
              -4,
              Math.min(
                4,
                ((event.clientY - bounds.top) / bounds.height - 0.5) * 8
              )
            )
          )
        }}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
        onBlur={resetTilt}
        className={getProjectVisualClassName(slug, variant)}
        data-project={slug}
        data-project-visual={slug}
        data-project-visual-variant={variant}
        aria-hidden="true"
      >
        <ProjectVisualContent
          slug={slug}
          Reveal={ProjectReveal}
          Node={variant === 'hero' ? HeroVisualNode : undefined}
          enter={variant === 'hero'}
          depth={
            variant === 'hero' ? (
              <HeroVisualDepth code={code} target={ref} />
            ) : undefined
          }
        />
        {variant === 'hero' && <HeroVisualAccent />}
      </motion.div>
    </ViewTransition>
  )
}

export default ProjectVisual
