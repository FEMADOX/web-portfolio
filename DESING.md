---
name: Web Portfolio Theme
theme:
  light:
    background: "oklch(0.95 0.01 45)"
    foreground: "oklch(0.21 0 0)"
    primary: "oklch(0.21 0 0)"
    secondary: "oklch(0.64 0.22 28)"
    accent: "oklch(0.86 0.17 90)"
    muted: "oklch(0.91 0.01 85)"
    card: "oklch(0.93 0.01 85)"
  dark:
    background: "oklch(0.1 0 0)"
    foreground: "oklch(0.95 0 0)"
    primary: "oklch(0.85 0.15 85)"
    secondary: "oklch(0.2 0 0)"
    accent: "oklch(0.85 0.15 85)"
    muted: "oklch(0.2 0 0)"
    card: "oklch(0.13 0 0)"
typography:
  font-sans: "Geist, Geist Fallback, system-ui, sans-serif"
  font-mono: "Geist Mono, Geist Mono Fallback, monospace"
spacing:
  radius: "0.5rem"
  shadow: "4px 4px 0 0 rgba(51, 51, 51, 1)"
  shadow-sm: "3px 3px 0 0 rgba(51, 51, 51, 1)"
---

# Design System

## Overview

Adaptive dual-theme design system using oklch color space for perceptual consistency across light and dark modes. Geometric shadows and clean typography create a professional developer portfolio interface.

## Color Palette

### Light Theme

- **Background**: `oklch(0.95 0.01 45)` — Off-white canvas
- **Foreground**: `oklch(0.21 0 0)` — Dark text/content
- **Primary**: `oklch(0.21 0 0)` — Dark accents, interactive elements
- **Secondary**: `oklch(0.64 0.22 28)` — Warm supporting tones
- **Accent**: `oklch(0.86 0.17 90)` — Bright highlights, calls-to-action
- **Muted**: `oklch(0.91 0.01 85)` — Disabled, secondary text
- **Card**: `oklch(0.93 0.01 85)` — Container backgrounds

### Dark Theme

- **Background**: `oklch(0.1 0 0)` — Deep dark canvas
- **Foreground**: `oklch(0.95 0 0)` — Bright text/content
- **Primary**: `oklch(0.85 0.15 85)` — Bright accent, CTAs
- **Secondary**: `oklch(0.2 0 0)` — Deep supporting backgrounds
- **Accent**: `oklch(0.85 0.15 85)` — Key interactive highlights
- **Muted**: `oklch(0.2 0 0)` — Disabled, secondary UI
- **Card**: `oklch(0.13 0 0)` — Elevated container backgrounds

### Functional Colors

- **Destructive**: `oklch(0.56 0.23 29)` — Errors, warnings
- **Border**: `oklch(0.25 0 0)` — Element boundaries
- **Ring**: `oklch(0.56 0.26 264)` — Focus states, light mode | `oklch(0.85 0.15 85)` — dark mode

## Typography

- **Family**: Geist (system fallback to sans-serif)
- **Mono**: Geist Mono for code and technical content
- **Scale**: System-based with no fixed sizes — use Tailwind scale
- **Weight**: Regular (400) for body, Semi-bold/bold for headlines

## Spacing & Shadows

- **Radius**: `0.5rem` (8px) — Consistent rounding
- **Shadow Normal**: `4px 4px 0 0 rgba(51, 51, 51, 1)` — Geometric drop shadow
- **Shadow Small**: `3px 3px 0 0 rgba(51, 51, 51, 1)` — Subtle offset

## Components

- **Buttons**: Rounded (8px), use primary/accent colors with shadow-normal on hover
- **Inputs**: Border-based with card background, ring focus state
- **Cards**: Border + shadow-normal, elevated with geometric offset
- **Code blocks**: Dark (`oklch(0.1 0 0)`) with color-coded syntax highlighting
- **Cursor animation**: Cyan `#61dafb` for typing effects

## Do's and Don'ts

- Do use oklch color space for perceptually consistent themes
- Do apply shadow-normal for elevation and focus (not CSS box-shadow)
- Don't mix light/dark mode tokens in the same component
- Do maintain 4.5:1 contrast for body text, 3:1 for UI elements
- Do use Geist family consistently across interface
- Don't hardcode hex colors — use CSS variables (`--primary`, `--accent`, etc.)
