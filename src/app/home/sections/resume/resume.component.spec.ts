import { ComponentFixture, TestBed } from '@angular/core/testing'

import { By } from '@angular/platform-browser'
import { ToastService } from '@app/shared/components/toast/services/toast-service/toast.service'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { ResumeComponent } from './resume.component'

describe('Resume', () => {
  gsap.registerPlugin(ScrollTrigger)

  let component: ResumeComponent
  let fixture: ComponentFixture<ResumeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeComponent],
      providers: [
        MockTranslationProvider,
        ToastService
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ResumeComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display toast on resume download', () => {
    const showToastSpy = vi.spyOn(component, 'showToast')
    component['resumeService'].haveTranslationsBeenLoaded.set(true)
    fixture.detectChanges()

    const downloadCtaDE = fixture.debugElement.query(By.css('.resume-header__cta a'))
    expect(downloadCtaDE).toBeTruthy()
    const downloadCta = downloadCtaDE.nativeElement as HTMLAnchorElement
    downloadCta.removeAttribute('download')
    downloadCta.removeAttribute('href')
    downloadCta.click()
    fixture.detectChanges()
    expect(showToastSpy).toHaveBeenCalled()
  })
})
