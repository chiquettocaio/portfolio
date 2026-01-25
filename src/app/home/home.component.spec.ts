import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavMenuComponent } from '@app/shared/components/nav-menu/nav-menu.component'
import { MockTranslationProvider } from '@app/shared/tests/mocks/providers/translation'
import { MockIntersectionObserver } from '@tests/mocks/global/intersection-observer'
import { HomeComponent } from './home.component'
import { AboutComponent } from './sections/about/about.component'
import { ContactComponent } from './sections/contact/contact.component'
import { HeroComponent } from './sections/hero/hero.component'
import { ProjectsComponent } from './sections/projects/projects.component'
import { ResumeComponent } from './sections/resume/resume.component'

describe('Home', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        NavMenuComponent,
        HeroComponent,
        AboutComponent,
        ResumeComponent,
        ProjectsComponent,
        ContactComponent
      ],
      providers: [MockTranslationProvider]
    }).compileComponents()

    // TEST: mocking IntersectionObserver
    window.IntersectionObserver = MockIntersectionObserver as any

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

// TODO: test more
