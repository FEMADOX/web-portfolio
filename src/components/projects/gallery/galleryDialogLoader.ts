let galleryModule: Promise<typeof import('./ProjectGalleryDialog')> | undefined
let resolvedGalleryModule: typeof import('./ProjectGalleryDialog') | undefined

export const getLoadedGalleryDialog = () => resolvedGalleryModule

export const loadGalleryDialog = () => {
  galleryModule ??= import('./ProjectGalleryDialog').then(
    module => {
      resolvedGalleryModule = module
      return module
    },
    error => {
      galleryModule = undefined
      throw error
    }
  )
  return galleryModule
}

export const preloadGallery = () => {
  void loadGalleryDialog().catch(() => {
    // A failed preload can be retried when the gallery is opened.
  })
}
