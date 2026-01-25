import { TestBed } from '@angular/core/testing'
import { MockTranslationProvider } from '@tests/mocks/providers/translation'
import { App } from './app'
import { TranslationConfigService } from './services/translation-config/translation-config.service'

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        TranslationConfigService,
        MockTranslationProvider
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})

// TODO: test more
