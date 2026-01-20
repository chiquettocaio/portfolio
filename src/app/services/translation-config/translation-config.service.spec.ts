import { TestBed } from '@angular/core/testing'
import { TranslationConfigService } from './translation-config.service'

describe('TranslationConfigService', () => {
  let service: TranslationConfigService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TranslationConfigService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
