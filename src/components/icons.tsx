import {
  type BoxIconProps,
  Fastapi,
  type IconSize,
  Postgresql
} from '@boxicons/react'
import type { Icon, IconProps } from '@tabler/icons-react'
import {
  IconBrandBootstrap,
  IconBrandDjango,
  IconBrandDocker,
  IconBrandGit,
  IconBrandGithub,
  IconBrandJavascript,
  IconBrandMysql,
  IconBrandNextjs,
  IconBrandPython,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript
} from '@tabler/icons-react'

import type { ComponentType, CSSProperties } from 'react'

type AppIconProps = IconProps & {
  size?: IconSize | number
  color?: string
  stroke?: string
  strokeWidth?: number
  background?: string
  opacity?: number
  rotation?: number
  shadow?: number
  flipHorizontal?: boolean
  flipVertical?: boolean
  padding?: number
}

type BoxIconComponentType = ComponentType<BoxIconProps>

const mergeIconStyles = (mergedProps: AppIconProps) => {
  const {
    rotation,
    opacity,
    padding,
    background,
    shadow,
    flipHorizontal,
    flipVertical,
    style
  } = mergedProps

  const transforms = [style?.transform]
  if (rotation) transforms.push(`rotate(${rotation}deg)`)
  if (flipHorizontal) transforms.push('scaleX(-1)')
  if (flipVertical) transforms.push('scaleY(-1)')

  return {
    ...style,
    transform: transforms.filter(Boolean).join(' ') || undefined,
    opacity,
    padding,
    background,
    filter:
      shadow !== undefined
        ? `drop-shadow(${shadow}px ${shadow}px 0 rgb(0 0 0 / 0.35))`
        : style?.filter
  } satisfies CSSProperties
}

const createTablerAppIcon = (IconComponent: Icon, props: AppIconProps) => {
  const AppIcon = (overrideProps: AppIconProps) => {
    const mergedProps = { size: 30, ...props, ...overrideProps }
    const { style, ...iconProps } = mergedProps
    const finalStyle = mergeIconStyles(mergedProps)

    return <IconComponent {...iconProps} style={finalStyle} />
  }
  AppIcon.displayName = IconComponent.displayName
  return AppIcon
}

const createBoxAppIcon = (
  IconComponent: BoxIconComponentType,
  props: AppIconProps
) => {
  const AppIcon = (overrideProps: AppIconProps) => {
    const mergedProps = { size: 'md' as IconSize, ...props, ...overrideProps }
    const { className, color, size, style, stroke, strokeWidth } = mergedProps
    const finalStyle = mergeIconStyles(mergedProps)

    return (
      <IconComponent
        className={`${className} w-7.5 h-7.5`}
        color={color || 'transparent'}
        size={size as IconSize}
        stroke={stroke}
        strokeWidth={strokeWidth}
        style={{ ...finalStyle, ...style }}
      />
    )
  }

  AppIcon.displayName = IconComponent.displayName ?? 'BoxIcon'
  return AppIcon
}

export const PythonIcon = createTablerAppIcon(IconBrandPython, {
  color: '#3776AB'
})

export const DjangoIcon = createTablerAppIcon(IconBrandDjango, {
  color: '#092E20'
})

export const FastAPIIcon = createBoxAppIcon(Fastapi, {
  stroke: '#009688',
  strokeWidth: 2
})

export const PostgreSQLIcon = createBoxAppIcon(Postgresql, {
  stroke: '#336791',
  strokeWidth: 0.8
})

export const MySQLIcon = createTablerAppIcon(IconBrandMysql, {
  color: '#4479A1'
})

export const ReactIcon = createTablerAppIcon(IconBrandReact, {
  color: '#61DAFB',
  rotation: 90
})

export const NextJSIcon = createTablerAppIcon(IconBrandNextjs, {
  color: 'currentColor'
})

export const TypescriptIcon = createTablerAppIcon(IconBrandTypescript, {
  color: '#3178C6'
})

export const JavascriptIcon = createTablerAppIcon(IconBrandJavascript, {
  color: '#F7DF1E',
  strokeWidth: 1.2
})

export const TailwindIcon = createTablerAppIcon(IconBrandTailwind, {
  color: '#06B6D4'
})

export const BootstrapIcon = createTablerAppIcon(IconBrandBootstrap, {
  color: '#7952B3'
})

export const GitIcon = createTablerAppIcon(IconBrandGit, {
  color: '#F05032'
})

export const GithubIcon = createTablerAppIcon(IconBrandGithub, {
  color: 'currentColor'
})

export const DockerIcon = createTablerAppIcon(IconBrandDocker, {
  color: '#2496ED'
})
