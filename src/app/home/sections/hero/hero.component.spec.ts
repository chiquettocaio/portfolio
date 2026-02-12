import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { HeroComponent } from './hero.component'

import { By } from '@angular/platform-browser'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

describe('Hero', () => {
  gsap.registerPlugin(ScrollTrigger)

  let component: HeroComponent
  let fixture: ComponentFixture<HeroComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [MockTranslationProvider]
    }).compileComponents()

    fixture = TestBed.createComponent(HeroComponent)
    component = fixture.componentInstance

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display toast', () => {
    const showToastSpy = vi.spyOn(component, 'showToast')
    const ctaDE = fixture.debugElement.query(By.css('#download-resume-cta a'))
    expect(ctaDE).toBeTruthy()
    const cta = ctaDE.nativeElement as HTMLAnchorElement
    cta.removeAttribute('download')
    cta.removeAttribute('href')
    cta.click()
    fixture.detectChanges()
    expect(showToastSpy).toHaveBeenCalled()
  })
})
