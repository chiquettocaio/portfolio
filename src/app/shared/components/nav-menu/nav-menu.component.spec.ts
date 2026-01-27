import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TranslatePipe } from '@ngx-translate/core'
import { MockIntersectionObserver } from 'src/testing/mocks/global'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { IconComponent } from '../icon/icon.component'
import { NavMenuComponent } from './nav-menu.component'

describe('NavMenuComponent', () => {
  let component: NavMenuComponent
  let fixture: ComponentFixture<NavMenuComponent>
  let debugEl: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavMenuComponent,
        IconComponent,
        TranslatePipe
      ],

      providers: [
        MockTranslationProvider
      ]
    }).compileComponents()

    // TEST: override/add properties to the window object (it's necessary to call "vi.unstubAllGlobals()" to reset values)
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

    fixture = TestBed.createComponent(NavMenuComponent)
    component = fixture.componentInstance
    debugEl = fixture.debugElement

    await fixture.whenStable()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should redirect to "hero"', async () => {
    const homeBtnDebugEl = debugEl.query(By.css('a[href="#hero-section"]'))
    expect(homeBtnDebugEl).toBeTruthy()

    const activateLinkSpy = vi.spyOn(component, 'activateLink')

    const homeBtn = homeBtnDebugEl.nativeElement as HTMLAnchorElement
    homeBtn.click()

    expect(activateLinkSpy).toBeCalledWith('hero')
    expect(component.activeLink()).toBe('hero')
  })

  it('should redirect to "about"', async () => {
    const aboutBtnDebugEl = debugEl.query(By.css('a[href="#about-section"]'))
    expect(aboutBtnDebugEl).toBeTruthy()

    const activateLinkSpy = vi.spyOn(component, 'activateLink')

    const aboutBtn = aboutBtnDebugEl.nativeElement as HTMLAnchorElement
    aboutBtn.click()

    expect(activateLinkSpy).toBeCalledWith('about')
    expect(component.activeLink()).toBe('about')
  })

  it('should redirect to "resume"', async () => {
    const resumeBtnDebugEl = debugEl.query(By.css('a[href="#resume-section"]'))
    expect(resumeBtnDebugEl).toBeTruthy()

    const activateLinkSpy = vi.spyOn(component, 'activateLink')

    const resumeBtn = resumeBtnDebugEl.nativeElement as HTMLAnchorElement
    resumeBtn.click()

    expect(activateLinkSpy).toBeCalledWith('resume')
    expect(component.activeLink()).toBe('resume')
  })

  it('should redirect to "projects"', async () => {
    const projectsBtnDebugEl = debugEl.query(By.css('a[href="#projects-section"]'))
    expect(projectsBtnDebugEl).toBeTruthy()

    const activateLinkSpy = vi.spyOn(component, 'activateLink')

    const projectsBtn = projectsBtnDebugEl.nativeElement as HTMLAnchorElement
    projectsBtn.click()

    expect(activateLinkSpy).toBeCalledWith('projects')
    expect(component.activeLink()).toBe('projects')
  })

  it('should redirect to "contact"', async () => {
    const contactBtnDebugEl = debugEl.query(By.css('a[href="#contact-section"]'))
    expect(contactBtnDebugEl).toBeTruthy()

    const activateLinkSpy = vi.spyOn(component, 'activateLink')

    const contactBtn = contactBtnDebugEl.nativeElement as HTMLAnchorElement
    contactBtn.click()

    expect(activateLinkSpy).toBeCalledWith('contact')
    expect(component.activeLink()).toBe('contact')
  })

  it('should redirect to "contact"', async () => {
    const contactBtnDebugEl = debugEl.query(By.css('a[href="#contact-section"]'))
    expect(contactBtnDebugEl).toBeTruthy()

    const activateLinkSpy = vi.spyOn(component, 'activateLink')

    const contactBtn = contactBtnDebugEl.nativeElement as HTMLAnchorElement
    contactBtn.click()

    expect(activateLinkSpy).toBeCalledWith('contact')
    expect(component.activeLink()).toBe('contact')
  })

  // TODO: improve testing
})
