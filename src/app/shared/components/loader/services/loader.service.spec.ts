import { TestBed } from '@angular/core/testing'

import { LoaderService } from './loader.service'

describe('LoaderService', () => {
  let service: LoaderService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LoaderService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should set "isVisible" to true', () => {
    vi.useFakeTimers()

    const showSpy = vi.spyOn(service, 'show')

    service.show()
    expect(showSpy).toHaveBeenCalled()

    expect(service.isVisible()).toBeFalsy()
    vi.advanceTimersByTime(service.DELAY_TO_SHOW_SPINNER)
    expect(service.isVisible()).toBeTruthy()

    vi.runAllTimers()
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('should set "isVisible" to false', () => {
    vi.useFakeTimers()

    const hideSpy = vi.spyOn(service, 'hide')
    service.show()
    vi.advanceTimersByTime(service.DELAY_TO_SHOW_SPINNER)
    expect(service.isVisible()).toBeTruthy()

    service.hide()
    expect(hideSpy).toHaveBeenCalled()
    expect(service.isVisible()).toBeFalsy()

    vi.runAllTimers()
    vi.useRealTimers()
    vi.clearAllMocks()
  })
})
