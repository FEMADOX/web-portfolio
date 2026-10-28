import { type ComponentProps, use } from 'react'
import {
  getLoadedGalleryDialog,
  loadGalleryDialog
} from './galleryDialogLoader'
import type ProjectGalleryDialog from './ProjectGalleryDialog'

export default function DeferredGalleryDialog(
  props: ComponentProps<typeof ProjectGalleryDialog>
) {
  // Locale navigation reuses the resolved module in its very first commit.
  const module = getLoadedGalleryDialog() ?? use(loadGalleryDialog())
  const Dialog = module.default
  return <Dialog {...props} />
}
