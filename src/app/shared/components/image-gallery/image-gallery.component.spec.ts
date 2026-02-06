import { ComponentFixture, DeferBlockBehavior, DeferBlockState, TestBed } from '@angular/core/testing'

import { AsyncPipe, NgOptimizedImage } from '@angular/common'
import { By } from '@angular/platform-browser'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { ButtonComponent } from '../button/button.component'
import { LoaderComponent } from '../loader/loader.component'
import { ImageGalleryComponent } from './image-gallery.component'
import { ImageGalleryService } from './services/image-gallery/image-gallery.service'

describe('ImageGalleryComponent', () => {
  let component: ImageGalleryComponent
  let fixture: ComponentFixture<ImageGalleryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ImageGalleryComponent,
        ButtonComponent,
        LoaderComponent,
        AsyncPipe,
        NgOptimizedImage
      ],
      providers: [
        ImageGalleryService,
        MockTranslationProvider
      ],
      deferBlockBehavior: DeferBlockBehavior.Playthrough
    }).compileComponents()

    fixture = TestBed.createComponent(ImageGalleryComponent)
    component = fixture.componentInstance

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should close on outside click', async () => {
    const closeSpy = vi.spyOn(component, 'close')

    component.image.set({
      src: 'images/ccg-small.webp',
      title: 'Test title',
      subtitle: 'Test subtitle'
    })

    const deferBlockFixture = (await fixture.getDeferBlocks())[0]
    expect(fixture.nativeElement.innerHTML).toContain('app-loader')
    await deferBlockFixture.render(DeferBlockState.Loading)
    expect(fixture.nativeElement.innerHTML).toContain('app-loader')
    await deferBlockFixture.render(DeferBlockState.Complete)

    fixture.detectChanges()

    const galleryWrapperDE = fixture.debugElement.query(By.css('.gallery-wrapper'))
    expect(galleryWrapperDE).toBeTruthy()
    const galleryWrapper = galleryWrapperDE.nativeElement as HTMLDivElement
    galleryWrapper.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    expect(closeSpy).toHaveBeenCalled()
  })

  it('should close on "escape" key press', async () => {
    const closeSpy = vi.spyOn(component, 'close')

    component.image.set({
      src: 'images/ccg-small.webp',
      title: 'Test title',
      subtitle: 'Test subtitle'
    })

    const deferBlockFixture = (await fixture.getDeferBlocks())[0]
    expect(fixture.nativeElement.innerHTML).toContain('app-loader')
    await deferBlockFixture.render(DeferBlockState.Loading)
    expect(fixture.nativeElement.innerHTML).toContain('app-loader')
    await deferBlockFixture.render(DeferBlockState.Complete)

    fixture.detectChanges()

    const galleryWrapperDE = fixture.debugElement.query(By.css('.gallery-wrapper'))
    expect(galleryWrapperDE).toBeTruthy()
    const galleryWrapper = galleryWrapperDE.nativeElement as HTMLDivElement
    galleryWrapper.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Space',
        bubbles: true,
        cancelable: true
      })
    )
    expect(closeSpy).not.toHaveBeenCalled()
    galleryWrapper.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true
      })
    )
    expect(closeSpy).toHaveBeenCalled()
  })

  it('should close on "close" button press', async () => {
    const closeSpy = vi.spyOn(component, 'close')

    component.image.set({
      src: 'images/ccg-small.webp',
      title: 'Test title',
      subtitle: 'Test subtitle'
    })

    const deferBlockFixture = (await fixture.getDeferBlocks())[0]
    expect(fixture.nativeElement.innerHTML).toContain('app-loader')
    await deferBlockFixture.render(DeferBlockState.Loading)
    expect(fixture.nativeElement.innerHTML).toContain('app-loader')
    await deferBlockFixture.render(DeferBlockState.Complete)

    fixture.detectChanges()

    const closeButtonDE = fixture.debugElement.query(By.css('.gallery__close button'))
    expect(closeButtonDE).toBeTruthy()
    const closeButton = closeButtonDE.nativeElement as HTMLDivElement
    closeButton.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )
    expect(closeSpy).toHaveBeenCalled()
  })
})
