'use client'

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { useSidebarPreferences } from '@/contexts/SidebarPreferencesContext'

const labels = {
  en: { expanded: 'Hide sidebar', collapsed: 'Show sidebar' },
  es: { expanded: 'Ocultar barra lateral', collapsed: 'Mostrar barra lateral' },
  pt: { expanded: 'Ocultar barra lateral', collapsed: 'Mostrar barra lateral' }
} as const

export default function SidebarToggle({ controlsId }: { controlsId: string }) {
  const lang = useLanguageContext()
  const { mode, toggleSidebar } = useSidebarPreferences()
  const Icon = mode === 'expanded' ? PanelLeftClose : PanelLeftOpen
  const label = labels[lang][mode]

  return (
    <Button
      type="button"
      variant="outline"
      className="size-11 border-2 border-border bg-background p-2 text-foreground hover:bg-primary hover:text-primary-foreground dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground"
      data-sidebar-toggle
      aria-label={label}
      title={label}
      aria-expanded={mode === 'expanded'}
      aria-controls={controlsId}
      onClick={toggleSidebar}
    >
      <Icon className="size-5" aria-hidden="true" />
    </Button>
  )
}
