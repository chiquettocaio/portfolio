import { TestBed } from '@angular/core/testing'

import { ContactFormService } from './contact-form.service'

describe('ContactFormService', () => {
  let service: ContactFormService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactFormService]
    })

    service = TestBed.inject(ContactFormService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
