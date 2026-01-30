import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectComponent } from './project.component'

import { IconComponent } from '@app/shared/components/icon/icon.component'
import { mockProjectData } from 'src/testing/mocks/data/project'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'

describe('ProjectComponent', () => {
  let component: ProjectComponent
  let fixture: ComponentFixture<ProjectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectComponent,
        IconComponent
      ],

      providers: [
        MockTranslationProvider
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.componentRef.setInput('data', mockProjectData)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should throw if required input is missing', () => {
    fixture = TestBed.createComponent(ProjectComponent)
    expect(() => fixture.detectChanges()).toThrowError(/NG0950/)
  })
})
