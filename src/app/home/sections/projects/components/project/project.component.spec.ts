import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectComponent } from './project.component'

import { mockProjectData } from 'src/testing/mocks/data/project'

describe('ProjectComponent', () => {
  let component: ProjectComponent
  let fixture: ComponentFixture<ProjectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectComponent)
    component = fixture.componentInstance
  })

  // TEST: providing required input and testing
  it('should create', () => {
    fixture.componentRef.setInput('data', mockProjectData)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  // TEST: Checking if a given error has occurred (missing required input in this case)
  it('should throw if required input is missing', () => {
    fixture = TestBed.createComponent(ProjectComponent)
    expect(() => fixture.detectChanges()).toThrowError(/NG0950/)
  })
})
