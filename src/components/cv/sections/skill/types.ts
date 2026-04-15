import type { JSX } from 'react'
import type { AppIconProps } from '@/components/icons'

export type SkillItem = {
  readonly name: string
  readonly icon: (props: AppIconProps) => JSX.Element
}

export type SkillsByGroup = {
  readonly backend: readonly SkillItem[]
  readonly frontend: readonly SkillItem[]
  readonly extras: readonly SkillItem[]
}

export type SkillsComponentProps = {
  readonly skills: readonly SkillItem[]
}

export type SkillsGroupProps = {
  label: string
  readonly skills: readonly SkillItem[]
}
