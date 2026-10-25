import type { CSSProperties } from 'react'

export const previewThemes: Record<'light' | 'dark', CSSProperties> = {
  light: {
    '--background': 'oklch(0.95 0.01 45)',
    '--foreground': 'oklch(0.21 0 0)',
    '--card': 'oklch(0.93 0.01 85)',
    '--muted': 'oklch(0.91 0.01 85)',
    '--muted-foreground': 'oklch(0.4 0 0)',
    '--accent': 'oklch(0.86 0.17 90)',
    '--accent-foreground': 'oklch(0.21 0 0)'
  } as CSSProperties,
  dark: {
    '--background': 'oklch(0.1 0 0)',
    '--foreground': 'oklch(0.95 0 0)',
    '--card': 'oklch(0.13 0 0)',
    '--muted': 'oklch(0.2 0 0)',
    '--muted-foreground': 'oklch(0.65 0 0)',
    '--accent': 'oklch(0.85 0.15 85)',
    '--accent-foreground': 'oklch(0.15 0 0)'
  } as CSSProperties
}
