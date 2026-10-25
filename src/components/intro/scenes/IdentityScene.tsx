import { ArrowDown } from 'lucide-react'
import * as motion from 'motion/react-m'
import { introCopy } from '../copy'
import IntroActionButton from '../IntroActionButton'
import { introEntrance } from '../introMotion'
import type { IntroScenesProps } from '../types'

type Props = Pick<
  IntroScenesProps,
  'titleId' | 'lang' | 'animate' | 'onConfigure' | 'onSkip'
>

export default function IdentityScene({
  titleId = 'portfolio-intro-title',
  lang,
  animate: reveal,
  onConfigure,
  onSkip
}: Props) {
  const copy = introCopy[lang]
  return (
    <main
      key="identity"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-12 sm:px-10 lg:px-16 lg:py-20"
    >
      <div className="relative border-2 border-foreground bg-background/90 p-5 shadow-[4px_4px_0_var(--foreground)] sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
        <motion.p
          {...introEntrance(reveal)}
          className="mb-6 inline-flex items-center gap-2 border border-foreground bg-background px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
        >
          <span aria-hidden="true">⌘</span> 01 · {copy.identity}
        </motion.p>
        <h1
          id={titleId}
          tabIndex={-1}
          className="break-normal text-[clamp(2.4rem,8vw,7rem)] font-black uppercase leading-[0.91] tracking-[-0.065em] outline-none"
        >
          <span className="my-[-0.08em] block overflow-clip py-[0.08em]">
            <motion.span
              {...introEntrance(reveal, 0.04, 'line')}
              className="block"
            >
              Giancarlos
            </motion.span>
          </span>{' '}
          <span className="my-[-0.08em] block overflow-clip py-[0.08em]">
            <motion.span
              {...introEntrance(reveal, 0.1, 'line')}
              className="block"
            >
              González
            </motion.span>
          </span>
        </h1>
        <motion.p
          {...introEntrance(reveal, 0.16)}
          className="mt-6 inline-block border-2 border-foreground bg-accent px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-[2px_2px_0_var(--foreground)] sm:text-sm"
        >
          {copy.role}
        </motion.p>
        <motion.p
          {...introEntrance(reveal, 0.22)}
          className="mt-5 max-w-2xl text-sm leading-relaxed sm:text-xl"
        >
          {copy.statement}
        </motion.p>
      </div>
      <motion.div
        {...introEntrance(reveal, 0.28)}
        className="mt-12 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5"
      >
        <IntroActionButton onClick={onConfigure}>
          {copy.configure}
          <span
            aria-hidden="true"
            className="text-xl transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none in-data-[visual-effects=paused]:transition-none"
          >
            →
          </span>
        </IntroActionButton>
        <IntroActionButton onClick={onSkip} variant="surface">
          {copy.skip}
          <span aria-hidden="true" className="text-lg">
            ›
          </span>
        </IntroActionButton>
        <p className="mt-2 flex items-center justify-center gap-2 font-mono text-[10px] text-muted-foreground sm:mt-0">
          <motion.span
            aria-hidden="true"
            className="text-base text-accent"
            initial={false}
            animate={reveal ? { y: [0, 6, 0] } : { y: 0 }}
            transition={{
              duration: reveal ? 1.4 : 0,
              repeat: reveal ? Number.POSITIVE_INFINITY : 0,
              ease: 'easeInOut'
            }}
          >
            <ArrowDown />
          </motion.span>
          {copy.scrollToSettings}
        </p>
      </motion.div>
    </main>
  )
}
