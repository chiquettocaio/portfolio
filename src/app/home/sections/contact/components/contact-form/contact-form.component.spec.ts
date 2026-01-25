import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockTranslationProvider } from '@app/shared/tests/mocks/providers/translation'
import { ContactFormComponent } from './contact-form.component'

describe('ContactFormComponent', () => {
  let component: ContactFormComponent
  let fixture: ComponentFixture<ContactFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [MockTranslationProvider]
    }).compileComponents()

    fixture = TestBed.createComponent(ContactFormComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

// TODO: test more
