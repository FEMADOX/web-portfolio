'use client'

import { sidebarPreferenceScript } from '@/lib/sidebarPreference'

const SidebarPreferenceScript = () => (
  <script
    id="portfolio-sidebar-preference"
    // Execute only in the initial HTML; client navigation keeps the live state.
    type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
    suppressHydrationWarning
  >
    {sidebarPreferenceScript}
  </script>
)

export default SidebarPreferenceScript
