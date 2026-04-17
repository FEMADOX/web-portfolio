import type { logoByColor } from './route'

export type Logo = keyof typeof logoByColor

export interface LogoProps {
  params: Promise<{ color: Logo }>
}
