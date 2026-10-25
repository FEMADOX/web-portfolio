export const SIDEBAR_STORAGE_KEY = 'portfolio-sidebar-v1'

export type SidebarMode = 'expanded' | 'collapsed'

// Runs before hydration; the same attribute drives the server-rendered layout.
export const sidebarPreferenceScript = `(()=>{let mode='expanded';try{if(localStorage.getItem('${SIDEBAR_STORAGE_KEY}')==='collapsed')mode='collapsed'}catch{}document.documentElement.dataset.sidebarState=mode})()`
