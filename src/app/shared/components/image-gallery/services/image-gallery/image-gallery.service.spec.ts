import { TestBed } from '@angular/core/testing'

import { ImageGalleryService } from '../image-gallery/image-gallery.service'

describe('ImageGalleryService', () => {
  let service: ImageGalleryService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ImageGalleryService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should set "image" value', () => {
    service.show({
      src: 'images/ccg-small.png',
      title: 'Test title',
      subtitle: 'Test subtitle'
    })

    expect(service.image()).toMatchObject({
      src: 'images/ccg-small.png',
      title: 'Test title',
      subtitle: 'Test subtitle'
    })
  })

  it('should set and remove "image" value', () => {
    service.show({
      src: 'images/ccg-small.png',
      title: 'Test title',
      subtitle: 'Test subtitle'
    })

    expect(service.image()).toMatchObject({
      src: 'images/ccg-small.png',
      title: 'Test title',
      subtitle: 'Test subtitle'
    })

    service.hide()

    expect(service.image()).toBe(null)
  })
})
