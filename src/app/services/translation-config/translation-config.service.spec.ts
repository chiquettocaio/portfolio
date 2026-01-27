import { TestBed } from '@angular/core/testing'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { TranslationConfigService } from './translation-config.service'

describe('TranslationConfigService', () => {
  let service: TranslationConfigService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockTranslationProvider]
    })

    service = TestBed.inject(TranslationConfigService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should setLanguage', () => {
    service.setLanguage('en-us')

    expect(service.currentLanguage()).toBe('en-us')
  })
})

// TODO: test more
