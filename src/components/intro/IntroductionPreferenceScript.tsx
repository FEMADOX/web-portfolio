'use client'

import { introductionPreferenceScript } from '@/lib/introduction'

export default function IntroductionPreferenceScript() {
  return (
    <script
      id="portfolio-introduction-preference"
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
    >
      {introductionPreferenceScript}
    </script>
  )
}
