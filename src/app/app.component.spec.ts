import { TestBed } from '@angular/core/testing'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { AppComponent } from './app.component'
import { TranslationConfigService } from './services/translation-config/translation-config.service'

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        TranslationConfigService,
        MockTranslationProvider
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
