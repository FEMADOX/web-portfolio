'use client'

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from 'motion/react'
import { type RefObject, useEffect, useRef, ViewTransition } from 'react'
import type {} from 'react/canary'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'
import { PROJECT_SLUGS, type ProjectSlug } from '@/data/projects/types'
import { ProjectReveal } from './Motion'
import { getProjectThemeClasses } from './theme'

const visuals = {
  'fastapi-ecosystem-lab': {
    name: 'FASTAPI',
    tag: 'FEATURE-ORIENTED BACKEND',
    nodes: ['CLIENT', 'API / V1', 'USE CASE', 'PORTS'],
    footer: 'PYTHON / SQLALCHEMY / REDIS'
  },
  'django-ecommerce': {
    name: 'E-COMMERCE',
    tag: 'FROM DISCOVERY TO CHECKOUT',
    nodes: ['CATALOG', 'CART', 'ORDER', 'STRIPE'],
    footer: 'DJANGO / SESSIONS / CHECKOUT'
  },
  'social-bookmarking': {
    name: 'BOOKMARKS',
    tag: 'SAVE. CONNECT. DISCOVER.',
    nodes: ['PROFILE', 'IMAGES', 'SOCIAL', 'FEED'],
    footer: 'DJANGO / AJAX / RELATIONSHIPS'
  },
  'dulces-flares': {
    name: 'PURO DOCE',
    tag: 'FROM SWEET DISCOVERY TO WHATSAPP',
    nodes: ['CATALOG', 'CART', 'PERSIST', 'WHATSAPP'],
    footer: 'NEXT.JS / ZUSTAND / CSS'
  }
} satisfies Record<ProjectSlug, object>

function HeroVisualDepth({
  code,
  target
}: {
  code: string
  target: RefObject<HTMLDivElement | null>
}) {
  const { motionEnabled } = useMotionPreferences()
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [-8, 8])

  return (
    <motion.span
      style={{ y: motionEnabled ? y : 0 }}
      className="pointer-events-none absolute -right-4 bottom-0 -z-1 text-(--project-color) opacity-[0.045] [font:900_17rem/1_sans-serif]"
    >
      {code}
    </motion.span>
  )
}

const ProjectVisual = ({
  slug,
  variant = 'card'
}: {
  slug: ProjectSlug
  variant?: 'card' | 'hero'
}) => {
  const visual = visuals[slug]
  const code = String(PROJECT_SLUGS.indexOf(slug) + 1).padStart(2, '0')
  const { motionEnabled } = useMotionPreferences()
  const ref = useRef<HTMLDivElement | null>(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 240, damping: 28 })
  const y = useSpring(pointerY, { stiffness: 240, damping: 28 })
  const rotateX = useTransform(y, [-4, 4], [3, -3])
  const rotateY = useTransform(x, [-4, 4], [-3, 3])

  useEffect(() => {
    if (!motionEnabled) {
      pointerX.jump(0)
      pointerY.jump(0)
      x.jump(0)
      y.jump(0)
    }
  }, [motionEnabled, pointerX, pointerY, x, y])

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
      share="project-morph"
      default="none"
    >
      <motion.div
        ref={ref}
        style={{
          x: motionEnabled ? x : 0,
          y: motionEnabled ? y : 0,
          rotateX: motionEnabled ? rotateX : 0,
          rotateY: motionEnabled ? rotateY : 0,
          transformPerspective: 900
        }}
        onPointerMove={event => {
          if (
            !motionEnabled ||
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
        className={[
          getProjectThemeClasses(slug),
          "group/project-visual @container relative isolate flex min-w-0 flex-col justify-between gap-4 overflow-hidden bg-(--project-surface) text-card-foreground [--project-surface:var(--project-surface-light)] [--project-tint:var(--project-tint-light)] [--project-panel:color-mix(in_srgb,var(--project-surface)_85%,var(--card))] [--project-muted:color-mix(in_srgb,var(--card-foreground)_88%,var(--project-surface))] [--project-ink:color-mix(in_srgb,var(--project-color)_35%,var(--foreground))] [--project-grid:color-mix(in_srgb,var(--foreground)_6%,transparent)] bg-[linear-gradient(var(--project-grid)_1px,transparent_1px),linear-gradient(90deg,var(--project-grid)_1px,transparent_1px),linear-gradient(135deg,var(--project-surface),var(--project-tint))] bg-size-[24px_24px,24px_24px,100%_100%] dark:[--project-surface:var(--project-surface-dark)] dark:[--project-tint:var(--project-tint-dark)] dark:[--project-ink:var(--project-color)] before:absolute before:inset-0 before:-z-1 before:bg-[radial-gradient(ellipse_at_100%_0%,color-mix(in_srgb,var(--project-color)_8%,transparent),transparent_65%)] before:content-['']",
          variant === 'hero'
            ? 'min-h-80 w-full border-2 border-border p-[clamp(1.25rem,3vw,2.5rem)] shadow-(--shadow) sm:aspect-[2.2] sm:min-h-88'
            : 'min-h-66 border-0 p-6 sm:min-h-76'
        ].join(' ')}
        data-project={slug}
        data-project-visual={slug}
        data-project-visual-variant={variant}
        aria-hidden="true"
      >
        <div className="z-1 flex items-center justify-between gap-[0.6rem] tracking-[0.08em] text-(--project-muted) [font:500_0.58rem_var(--font-mono)] @min-[500px]:text-[0.7rem]">
          <span>BUILD / {code}</span>
          <span className="size-[0.45rem] rounded-full bg-(--project-color) shadow-[0_0_0_4px_color-mix(in_srgb,var(--project-color)_13%,transparent)]" />
        </div>
        <ProjectReveal className="z-1 my-2 text-[clamp(1.4rem,12cqw,5.5rem)] leading-[0.95] font-black tracking-[-0.065em] text-(--project-ink)">
          {visual.name}
          <span className="mt-[0.9rem] block tracking-[0.12em] text-(--project-muted) [font:500_clamp(0.4rem,2.3cqw,0.7rem)_var(--font-mono)]">
            {visual.tag}
          </span>
        </ProjectReveal>
        <ProjectReveal
          variant="group"
          className="z-1 grid grid-cols-2 gap-[0.6rem] @min-[500px]:grid-cols-4 @min-[500px]:gap-4"
        >
          {visual.nodes.map((node, index) => (
            <div
              key={node}
              data-project-visual-node
              className="border border-[color-mix(in_srgb,var(--foreground)_40%,transparent)] bg-(--project-panel) px-[0.65rem] py-[0.8rem] [transition:transform_240ms_ease,border-color_240ms] nth-2:delay-35 nth-3:delay-70 nth-4:delay-105 group-hover/project-card:border-(--project-color) group-hover/project-card:transform-[translateY(-3px)] group-focus-within/project-card:border-(--project-color) group-focus-within/project-card:transform-[translateY(-3px)] group-active/project-card:border-(--project-color) group-active/project-card:transform-[translateY(-3px)] group-data-[pressed=true]/project-card:border-(--project-color) group-data-[pressed=true]/project-card:transform-[translateY(-3px)] motion-reduce:transition-none motion-reduce:group-hover/project-card:transform-none motion-reduce:group-focus-within/project-card:transform-none motion-reduce:group-active/project-card:transform-none motion-reduce:group-data-[pressed=true]/project-card:transform-none @min-[500px]:p-4"
            >
              <ProjectReveal variant="item">
                <span className="mb-[0.3rem] block text-(--project-ink) [font:0.5rem_var(--font-mono)]">
                  0{index + 1}
                </span>
                <strong className="[font:700_0.65rem_var(--font-mono)] @min-[500px]:text-[0.8rem]">
                  {node}
                </strong>
              </ProjectReveal>
            </div>
          ))}
        </ProjectReveal>
        <div className="z-1 flex items-center justify-between gap-[0.6rem] tracking-[0.08em] text-(--project-muted) [font:500_0.58rem_var(--font-mono)] @min-[500px]:text-[0.7rem]">
          <span>{visual.footer}</span>
          <span className="text-[1.1rem] text-(--project-ink)">↗</span>
        </div>
        {variant === 'hero' ? (
          <HeroVisualDepth code={code} target={ref} />
        ) : (
          <span className="absolute -right-4 bottom-0 -z-1 text-(--project-color) opacity-[0.045] [font:900_17rem/1_sans-serif]">
            {code}
          </span>
        )}
      </motion.div>
    </ViewTransition>
  )
}

export default ProjectVisual
