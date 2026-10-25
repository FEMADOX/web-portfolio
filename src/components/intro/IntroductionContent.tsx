import IntroScenes from './IntroScenes'
import type { IntroductionScene, IntroScenesProps } from './types'

type Props = IntroScenesProps & {
  live: boolean
  entrances: Record<IntroductionScene, number>
}

const scenes = [
  { scene: 'identity', titleId: 'portfolio-intro-title' },
  { scene: 'settings', titleId: 'portfolio-intro-settings-title' }
] as const

export default function IntroductionContent({
  live,
  entrances,
  ...props
}: Props) {
  return (
    <>
      {scenes.map(({ scene, titleId }) => (
        <div key={scene} data-introduction-initial-scene={scene}>
          <IntroScenes
            key={entrances[scene]}
            {...props}
            scene={scene}
            titleId={titleId}
            animate={live && props.animate && props.scene === scene}
          />
        </div>
      ))}
    </>
  )
}
