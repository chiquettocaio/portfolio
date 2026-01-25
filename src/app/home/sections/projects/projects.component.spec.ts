import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslationConfigService } from '@app/services/translation-config/translation-config.service'
import { MockTranslationProvider } from '@app/shared/tests/mocks/providers/translation'
import { ProjectsComponent } from './projects.component'

describe('ProjectsComponent', () => {
  let component: ProjectsComponent
  let fixture: ComponentFixture<ProjectsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        MockTranslationProvider,
        TranslationConfigService
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectsComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

// TODO: test more
