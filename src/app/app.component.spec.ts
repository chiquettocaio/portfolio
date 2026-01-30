import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { AppComponent } from './app.component'
import { HomeService } from './home/services/home-service/home.service'
import { TranslationConfigService } from './services/translation-config/translation-config.service'
import { LoaderService } from './shared/components/loader/services/loader.service'

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        TranslationConfigService,
        MockTranslationProvider,
        HomeService,
        LoaderService
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render "app-nav-menu"', () => {
    const fixture = TestBed.createComponent(AppComponent)

    expect(fixture.componentInstance.haveSectionsBeenLoaded()).toBeFalsy()
    let navMenuDE = fixture.debugElement.query(By.css('app-nav-menu'))
    expect(navMenuDE).toBeFalsy()

    const homeService = fixture.componentInstance['homeService']
    homeService.setHaveSectionsBeenLoaded(true)
    expect(fixture.componentInstance.haveSectionsBeenLoaded()).toBeTruthy()

    fixture.detectChanges()

    navMenuDE = fixture.debugElement.query(By.css('app-nav-menu'))
    expect(navMenuDE).toBeTruthy()
  })

  it('should render "app-loader"', () => {
    vi.useFakeTimers()

    const fixture = TestBed.createComponent(AppComponent)

    expect(fixture.componentInstance.haveSectionsBeenLoaded()).toBeFalsy()
    let loadServiceDE = fixture.debugElement.query(By.css('app-loader'))
    expect(loadServiceDE).toBeFalsy()

    const loaderService = fixture.componentInstance['loaderService']
    loaderService.show()
    vi.advanceTimersByTime(300)
    expect(fixture.componentInstance.isLoaderVisible()).toBeTruthy()

    fixture.detectChanges()

    loadServiceDE = fixture.debugElement.query(By.css('app-loader'))
    expect(loadServiceDE).toBeTruthy()

    vi.runAllTimers()
    vi.useRealTimers()
    vi.clearAllMocks()
  })
})
