import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResumeSectionComponent } from './resume-section.component'

describe('ResumeBlock', () => {
  let component: ResumeSectionComponent
  let fixture: ComponentFixture<ResumeSectionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeSectionComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ResumeSectionComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
