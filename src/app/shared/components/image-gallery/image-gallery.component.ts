import { AsyncPipe, NgOptimizedImage } from '@angular/common'
import { Component, inject, signal, WritableSignal } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { filter, fromEvent, map, take, tap, timer } from 'rxjs'
import { ButtonComponent } from '../button/button.component'
import { IconComponent } from '../icon/icon.component'
import { LoaderComponent } from '../loader/loader.component'
import { ImageGalleryData } from './models/image-gallery.model'
import { ImageGalleryService } from './services/image-gallery/image-gallery.service'

@Component({
  selector: 'app-image-gallery',
  imports: [
    ButtonComponent,
    IconComponent,
    LoaderComponent,
    NgOptimizedImage,
    AsyncPipe,
    TranslatePipe
  ],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss'
})
export class ImageGalleryComponent {
  private imageGalleryService = inject(ImageGalleryService)

  image: WritableSignal<ImageGalleryData | null> = this.imageGalleryService.image
  imageVisible = signal<boolean>(true)

  private CLOSING_ANIMATION_TIME: number = 300

  click$ = fromEvent(document, 'click').pipe(
    map(e => e.target as HTMLElement),
    filter(target => /gallery-wrapper/i.test(target.className)),
    tap(() => this.close())
  )

  escape$ = fromEvent(document, 'keydown').pipe(
    filter(e => /escape/i.test((e as KeyboardEvent).key)),
    tap(() => this.close())
  )

  close (): void {
    this.imageVisible.set(false)

    timer(this.CLOSING_ANIMATION_TIME).pipe(
      take(1),
      tap(() => this.imageGalleryService.hide())
    ).subscribe()
  }
}
