import { Injectable, signal } from '@angular/core'
import { ImageGalleryData } from '../../models/image-gallery.model'

@Injectable({ providedIn: 'root' })
export class ImageGalleryService {
  image = signal<ImageGalleryData | null>(null)

  show (data: ImageGalleryData): void {
    this.image.set(data)
  }

  hide (): void {
    this.image.set(null)
  }
}
