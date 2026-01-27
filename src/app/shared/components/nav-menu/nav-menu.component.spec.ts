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
    // https://vitest.dev/guide/mocking/globals.html
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
    MockIntersectionObserver.clearIntances()

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

  it('should run IntersectionObserver', () => {
    fixture.detectChanges()
    const intersectionObserver = MockIntersectionObserver.instances[0]
    intersectionObserver.trigger()
    expect(intersectionObserver.callback).toHaveBeenCalled()
  })

  it('should redirect to "hero"', () => {
    const homeAnchorDebugEl = debugEl.query(By.css('a[href="#hero-section"]'))
    expect(homeAnchorDebugEl).toBeTruthy()

    const activateLinkSpy = vi.spyOn(component, 'activateLink')

    const homeAnchor = homeAnchorDebugEl.nativeElement as HTMLAnchorElement
    homeAnchor.click()

    expect(activateLinkSpy).toBeCalledWith('hero')
    expect(component.activeLink()).toBe('hero')
  })

  it('should redirect to "about"', () => {
    const aboutAnchorDebugEl = debugEl.query(By.css('a[href="#about-section"]'))
    expect(aboutAnchorDebugEl).toBeTruthy()

    const activateLinkSpy = vi.spyOn(component, 'activateLink')

    const aboutAnchor = aboutAnchorDebugEl.nativeElement as HTMLAnchorElement
    aboutAnchor.click()

    expect(activateLinkSpy).toBeCalledWith('about')
    expect(component.activeLink()).toBe('about')
  })

  it('should redirect to "resume"', () => {
    const resumeAnchorDebugEl = debugEl.query(By.css('a[href="#resume-section"]'))
    expect(resumeAnchorDebugEl).toBeTruthy()

    const activateLinkSpy = vi.spyOn(component, 'activateLink')

    const resumeAnchor = resumeAnchorDebugEl.nativeElement as HTMLAnchorElement
    resumeAnchor.click()

    expect(activateLinkSpy).toBeCalledWith('resume')
    expect(component.activeLink()).toBe('resume')
  })

  it('should redirect to "projects"', () => {
    const projectsAnchorDebugEl = debugEl.query(By.css('a[href="#projects-section"]'))
    expect(projectsAnchorDebugEl).toBeTruthy()

    const activateLinkSpy = vi.spyOn(component, 'activateLink')

    const projectsAnchor = projectsAnchorDebugEl.nativeElement as HTMLAnchorElement
    projectsAnchor.click()

    expect(activateLinkSpy).toBeCalledWith('projects')
    expect(component.activeLink()).toBe('projects')
  })

  it('should redirect to "contact"', () => {
    const contactAnchorDebugEl = debugEl.query(By.css('a[href="#contact-section"]'))
    expect(contactAnchorDebugEl).toBeTruthy()

    const activateLinkSpy = vi.spyOn(component, 'activateLink')

    const contactAnchor = contactAnchorDebugEl.nativeElement as HTMLAnchorElement
    contactAnchor.click()

    expect(activateLinkSpy).toBeCalledWith('contact')
    expect(component.activeLink()).toBe('contact')
  })

  it('should redirect to "projects" by pressing space bar', () => {
    const projectsAnchorDebugEl = debugEl.query(By.css('a[href="#projects-section"]'))
    expect(projectsAnchorDebugEl).toBeTruthy()

    const onSpaceSpy = vi.spyOn(component, 'onSpace')

    const projectsAnchor = projectsAnchorDebugEl.nativeElement as HTMLAnchorElement
    projectsAnchor.focus()
    expect(document.activeElement).toBe(projectsAnchor)

    const event = new KeyboardEvent('keydown', {
      key: 'Space',
      code: 'Space',
      keyCode: 32,
      bubbles: true
    })

    projectsAnchor.dispatchEvent(event)

    expect(onSpaceSpy).toBeCalledWith(event, 'projects')
    expect(component.activeLink()).toBe('projects')
  })

  it('should switch theme', () => {
    const themeBtnDebugEl = debugEl.query(By.css('button#theme-switch'))
    expect(themeBtnDebugEl).toBeTruthy()

    const switchThemeSpy = vi.spyOn(component, 'switchTheme')

    const themeBtn = themeBtnDebugEl.nativeElement as HTMLAnchorElement
    themeBtn.click()
    fixture.detectChanges()

    expect(switchThemeSpy).toHaveBeenCalled()
    expect(component.isDarkThemeActive()).toBe(true)
  })

  it('should switch language', () => {
    const languageBtnDebugEl = debugEl.query(By.css('button#language-switch'))
    expect(languageBtnDebugEl).toBeTruthy()

    const switchLanguageSpy = vi.spyOn(component, 'switchLanguage')

    const languageBtn = languageBtnDebugEl.nativeElement as HTMLAnchorElement
    languageBtn.click()
    fixture.detectChanges()

    expect(switchLanguageSpy).toHaveBeenCalled()
    expect(component.currentLanguage()).toBe('pt-br')
  })
})
