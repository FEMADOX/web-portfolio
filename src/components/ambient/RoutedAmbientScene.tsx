'use client'

import { useParams } from 'next/navigation'
import { PROJECT_SLUGS } from '@/data/projects'
import AmbientScene from './AmbientScene'

export default function RoutedAmbientScene() {
  const params = useParams()
  const slug = PROJECT_SLUGS.find(value => value === params?.slug)
  return <AmbientScene slug={slug} />
}
