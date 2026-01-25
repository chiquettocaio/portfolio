import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockTranslationProvider } from '@app/shared/tests/mocks/providers/translation'
import { ResumeComponent } from './resume.component'

describe('Resume', () => {
  let component: ResumeComponent
  let fixture: ComponentFixture<ResumeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeComponent],
      providers: [MockTranslationProvider]
    }).compileComponents()

    fixture = TestBed.createComponent(ResumeComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
