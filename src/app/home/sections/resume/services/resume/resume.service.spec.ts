import { TestBed } from '@angular/core/testing'

import { TranslationConfigService } from '@app/services/translation-config/translation-config.service'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { ResumeService } from './resume.service'

describe('ResumeService', () => {
  let service: ResumeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockTranslationProvider,
        TranslationConfigService
      ]
    })
    service = TestBed.inject(ResumeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
