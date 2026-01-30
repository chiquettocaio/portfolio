import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockIntersectionObserver } from 'src/testing/mocks/global'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
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
        HeroComponent,
        AboutComponent,
        ResumeComponent,
        ProjectsComponent,
        ContactComponent
      ],
      providers: [MockTranslationProvider]
    }).compileComponents()

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })
})
