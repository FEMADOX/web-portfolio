import * as motion from 'motion/react-m'
import { useId } from 'react'
import { cn } from '@/lib/utils'
import { introEntrance } from './introMotion'

interface Props<T extends string> {
  name: string
  number: string
  label: string
  value: T
  options: readonly { value: T; label: string; lang?: string }[]
  onChange: (value: T) => void
  className?: string
  detail?: string
  animate?: boolean
  delay?: number
}

export default function IntroChoices<T extends string>({
  name,
  number,
  label,
  value,
  options,
  onChange,
  className,
  detail,
  animate = false,
  delay = 0
}: Props<T>) {
  const groupId = useId()

  return (
    <motion.fieldset
      {...introEntrance(animate, delay)}
      className={cn(
        'min-w-0 border-2 border-foreground bg-background p-2.5 sm:p-3',
        className
      )}
    >
      <legend className="px-1.5 font-mono text-[10px] font-bold uppercase tracking-wider sm:text-xs">
        [ {number} {'//'} {label} ]
      </legend>
      {detail && (
        <p className="mb-2 hidden text-right font-mono text-[9px] uppercase text-muted-foreground xl:block">
          {detail}
        </p>
      )}
      <div className="flex gap-1.5 sm:gap-2">
        {options.map(option => (
          <label
            key={option.value}
            htmlFor={`${groupId}-${option.value}`}
            className={cn(
              'relative flex min-h-11 min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 border-2 border-foreground px-1.5 py-2 text-center font-mono text-[10px] font-bold leading-tight transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none in-data-[visual-effects=paused]:transition-none sm:px-2 sm:text-xs',
              'has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-ring',
              value === option.value
                ? 'bg-accent text-accent-foreground shadow-[2px_2px_0_var(--foreground)]'
                : 'bg-muted text-foreground hover:bg-card'
            )}
          >
            <input
              id={`${groupId}-${option.value}`}
              className="sr-only"
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span
              aria-hidden="true"
              className={value === option.value ? '' : 'invisible'}
            >
              ●
            </span>
            <span lang={option.lang}>{option.label}</span>
          </label>
        ))}
      </div>
    </motion.fieldset>
  )
}
