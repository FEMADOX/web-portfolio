const ease = [0.22, 1, 0.36, 1] as const

export function introEntrance(
  enabled: boolean,
  delay = 0,
  kind: 'rise' | 'line' | 'frame' = 'rise'
) {
  const initial =
    kind === 'line'
      ? { opacity: 0, y: '105%', skewY: 2 }
      : kind === 'frame'
        ? { opacity: 0, y: 14, scale: 0.985 }
        : { opacity: 0, y: 12 }

  return {
    'data-intro-entrance': true,
    initial: enabled ? initial : (false as const),
    animate: { opacity: 1, y: 0, skewY: 0, scale: 1 },
    transition: {
      duration: enabled ? 0.45 : 0,
      delay: enabled ? delay : 0,
      ease
    }
  }
}
