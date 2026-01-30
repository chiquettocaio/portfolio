import { TestBed } from '@angular/core/testing'

import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { catchError, EMPTY, take } from 'rxjs'
import { ContactFormService } from './contact-form.service'

const endpointUrl: string = 'https://formspree.io/f/xxxxxxxx'

describe('ContactFormService', () => {
  let service: ContactFormService
  let httpTesting: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactFormService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })

    service = TestBed.inject(ContactFormService)
    httpTesting = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should dispatch POST request without errors', () => {
    const postSpy = vi.spyOn(service, 'post')

    service.post({
      fullName: 'Test name',
      email: 'test@email.com',
      message: 'Test message',
      subject: 'Test subject'
    }).pipe(take(1)).subscribe()

    expect(postSpy).toHaveBeenCalled()

    const req = httpTesting.expectOne({ method: 'POST', url: endpointUrl })
    req.flush({ next: '/thanks', ok: true })

    httpTesting.verify()
  })

  it('should dispatch POST request with errors', () => {
    vi.useFakeTimers()

    const DELAY_BETWEEN_ATTEMPTS: number = 2000
    const postSpy = vi.spyOn(service, 'post')

    service.post({
      fullName: 'Test name',
      email: 'test@email.com',
      message: 'Test message',
      subject: 'Test subject'
    }).pipe(
      take(1),
      catchError(() => EMPTY)
    ).subscribe()

    expect(postSpy).toHaveBeenCalled()

    const req = httpTesting.expectOne({ method: 'POST', url: endpointUrl })
    req.flush('Error', { status: 500, statusText: 'Server Error' })

    // Retry #1 (triggered by the first failure)
    vi.advanceTimersByTime(DELAY_BETWEEN_ATTEMPTS)
    const req2 = httpTesting.expectOne({ method: 'POST', url: endpointUrl })
    req2.flush('Error', { status: 500, statusText: 'Server Error' })

    // Retry #2 (Final attempt)
    vi.advanceTimersByTime(DELAY_BETWEEN_ATTEMPTS)
    const req3 = httpTesting.expectOne({ method: 'POST', url: endpointUrl })
    req3.flush('Error', { status: 500, statusText: 'Server Error' })

    httpTesting.verify()

    vi.runAllTimers()
    vi.useRealTimers()
    vi.clearAllMocks()
  })
})
