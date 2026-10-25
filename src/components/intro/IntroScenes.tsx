import IntroSceneFrame from './IntroSceneFrame'
import IdentityScene from './scenes/IdentityScene'
import SettingsScene from './scenes/SettingsScene'
import type { IntroScenesProps } from './types'

export default function IntroScenes(props: IntroScenesProps) {
  const reveal = props.animate && props.effectsEnabled && !props.reducedMotion

  return (
    <IntroSceneFrame
      scene={props.scene}
      lang={props.lang}
      animate={reveal}
      onConfigure={props.onConfigure}
      onBack={props.onBack}
    >
      {props.scene === 'identity' ? (
        <IdentityScene
          titleId={props.titleId}
          lang={props.lang}
          animate={reveal}
          onConfigure={props.onConfigure}
          onSkip={props.onSkip}
        />
      ) : (
        <SettingsScene {...props} animate={reveal} />
      )}
    </IntroSceneFrame>
  )
}
