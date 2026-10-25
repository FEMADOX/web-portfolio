'use client'

import { ArrowUpRight } from 'lucide-react'
import { type MotionValue, useTransform } from 'motion/react'
import * as motion from 'motion/react-m'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'
import type { PROJECT_CHAPTERS } from './labels'

type Props = {
  id: (typeof PROJECT_CHAPTERS)[number]
  index: number
  label: string
  active: boolean
  progress: MotionValue<number>
  variant: 'mobile' | 'desktop' | 'dock'
}

const mobileLinkClasses = [
  'min-h-11 shrink-0 snap-center gap-2 bg-background px-6 py-[0.85rem] text-[0.6rem] whitespace-nowrap',
  '[--chapter-tip:0.85rem] ms-[calc(1px-var(--chapter-tip))] first:ms-0 first:pl-[0.85rem]',
  '[clip-path:polygon(0_0,calc(100%-var(--chapter-tip))_0,100%_50%,calc(100%-var(--chapter-tip))_100%,0_100%,var(--chapter-tip)_50%)]',
  'first:[clip-path:polygon(0_0,calc(100%-var(--chapter-tip))_0,100%_50%,calc(100%-var(--chapter-tip))_100%,0_100%)]',
  "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-(--chapter-tip) after:bg-border after:content-[''] after:[clip-path:polygon(0_0,1px_0,100%_50%,1px_100%,0_100%,calc(100%-1px)_50%)]",
  'focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-4'
].join(' ')

const linkClasses = {
  mobile: mobileLinkClasses,
  desktop: 'gap-3 border-2 border-border px-4 py-[0.9rem] text-xs',
  dock: 'h-11 shrink-0 gap-2 border-2 border-border px-3 text-[11px] whitespace-nowrap'
}

export default function ProjectChapterLink({
  id,
  index,
  label,
  active,
  progress,
  variant
}: Props) {
  const { canAnimate } = useMotionPreferences()
  const clipPath = useTransform(
    progress,
    value => `inset(0 ${100 - value}% 0 0)`
  )
  const content = (
    <>
      <span
        data-project-chapter-index
        className={`font-mono text-[0.65rem] leading-[normal] font-normal ${active ? 'text-inherit' : 'text-muted-foreground'}`}
        aria-hidden="true"
      >
        0{index + 1}
      </span>
      <span>{label}</span>
      {variant === 'desktop' ? (
        <ArrowUpRight
          size={15}
          className="ml-auto shrink-0"
          aria-hidden="true"
        />
      ) : null}
    </>
  )

  return (
    <motion.a
      href={`#${id}`}
      data-project-chapter={id}
      aria-current={active ? 'location' : undefined}
      className={`relative flex items-center overflow-hidden leading-normal font-extrabold uppercase transition-colors duration-180 ease-[ease] hover:bg-muted active:opacity-80 aria-[current=location]:bg-accent aria-[current=location]:text-accent-foreground motion-reduce:transition-none ${linkClasses[variant]}`}
      whileTap={
        variant === 'mobile' && canAnimate ? { scale: 0.97 } : undefined
      }
      transition={{ type: 'spring', stiffness: 650, damping: 35 }}
    >
      <span className="flex w-full min-w-0 items-center gap-[inherit]">
        {content}
      </span>
      <motion.span
        data-project-chapter-progress
        className="pointer-events-none absolute inset-0 flex w-full min-w-0 items-center gap-[inherit] bg-foreground p-[inherit] text-background **:data-project-chapter-index:text-inherit"
        aria-hidden="true"
        style={{ clipPath }}
      >
        {content}
      </motion.span>
    </motion.a>
  )
}
