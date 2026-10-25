import { Suspense } from 'react'
import AmbientScene from './AmbientScene'
import RoutedAmbientScene from './RoutedAmbientScene'

export default function AmbientBackground() {
  return (
    <Suspense fallback={<AmbientScene />}>
      <RoutedAmbientScene />
    </Suspense>
  )
}
