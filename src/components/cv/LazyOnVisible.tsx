'use client'

import {
  type ComponentType,
  lazy,
  type ReactNode,
  Suspense,
  useCallback,
  useLayoutEffect,
  useRef
} from 'react'
import { useNearViewport } from '@/hooks/useNearViewport'

interface LazyOnVisibleProps {
  children: ReactNode
  fallback: ReactNode
  className?: string
  rootMargin?: string
}

const LoadedContent = ({
  children,
  onReady
}: {
  children: ReactNode
  onReady: () => void
}) => {
  useLayoutEffect(onReady, [onReady])
  return children
}

export const LazyOnVisible = ({
  children,
  fallback,
  className,
  rootMargin
}: LazyOnVisibleProps) => {
  const { ref, shouldLoad } = useNearViewport(rootMargin)
  const focusedLink = useRef<HTMLAnchorElement | null>(null)

  const restoreFocus = useCallback(() => {
    const previous = focusedLink.current
    focusedLink.current = null
    if (
      !previous ||
      previous.isConnected ||
      document.activeElement !== document.body
    ) {
      return
    }

    const replacement = Array.from(
      ref.current?.querySelectorAll('a') ?? []
    ).find(
      link =>
        link.href === previous.href &&
        link.getAttribute('aria-label') === previous.getAttribute('aria-label')
    )
    replacement?.focus({ preventScroll: true })
  }, [ref])

  return (
    <div
      ref={ref}
      className={className}
      onFocusCapture={event => {
        if (event.target instanceof HTMLAnchorElement) {
          focusedLink.current = event.target
        }
      }}
      onBlurCapture={() => {
        if (focusedLink.current?.isConnected) focusedLink.current = null
      }}
    >
      {shouldLoad ? (
        <Suspense fallback={fallback}>
          <LoadedContent onReady={restoreFocus}>{children}</LoadedContent>
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}

type LazyModule<Props> = () => Promise<{ default: ComponentType<Props> }>
type LazyFallback<Props> = ReactNode | ((props: Props) => ReactNode)

export const createLazyOnVisible = <Props extends object>(
  load: LazyModule<Props>,
  fallback: LazyFallback<Props>,
  className?: string,
  options: { rootMargin?: string } = {}
) => {
  const Component = lazy(load)

  return function LazyComponent(props: Props) {
    const placeholder =
      typeof fallback === 'function' ? fallback(props) : fallback

    return (
      <LazyOnVisible
        fallback={placeholder}
        className={className}
        rootMargin={options.rootMargin}
      >
        <Component {...props} />
      </LazyOnVisible>
    )
  }
}
