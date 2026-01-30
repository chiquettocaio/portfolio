import { ComponentFixture, TestBed } from '@angular/core/testing'

import { IconComponent } from '@app/shared/components/icon/icon.component'
import { TranslatePipe } from '@ngx-translate/core'
import { ResumeSectionComponent } from './resume-section.component'
import { ResumeSectionIcon } from './resume-section.model'

const sectionTitle = 'Test section'
const sectionIcon: ResumeSectionIcon = {
  name: 'phosphorCertificate',
  ariaLabel: 'Test icon aria label'
}

describe('ResumeBlock', () => {
  let component: ResumeSectionComponent
  let fixture: ComponentFixture<ResumeSectionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResumeSectionComponent,
        IconComponent,
        TranslatePipe
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ResumeSectionComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.componentRef.setInput('sectionTitle', sectionTitle)
    fixture.componentRef.setInput('sectionIcon', sectionIcon)
    fixture.detectChanges()

    expect(component.sectionTitle()).toBe(sectionTitle)
    expect(component.sectionIcon()).toMatchObject(sectionIcon)

    expect(component).toBeTruthy()
  })
})
