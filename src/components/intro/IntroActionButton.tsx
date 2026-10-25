import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const buttonClass =
  'group flex min-h-12 items-center justify-between gap-5 border-2 border-foreground px-5 py-3 font-mono text-xs font-bold uppercase tracking-wide shadow-[3px_3px_0_var(--foreground)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--foreground)] active:translate-y-px active:shadow-none focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0 in-data-[visual-effects=paused]:transition-none in-data-[visual-effects=paused]:hover:translate-y-0 sm:text-sm'

type Props = Pick<
  ComponentProps<'button'>,
  'children' | 'onClick' | 'className'
> & {
  variant?: 'accent' | 'surface'
}

export default function IntroActionButton({
  variant = 'accent',
  className,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cn(
        buttonClass,
        variant === 'accent'
          ? 'bg-accent text-accent-foreground'
          : 'bg-background text-foreground',
        className
      )}
      {...props}
    />
  )
}
