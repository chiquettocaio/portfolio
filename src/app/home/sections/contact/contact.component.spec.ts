import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockTranslationProvider } from '@app/shared/tests/mocks/providers/translation'
import { ContactComponent } from './contact.component'

describe('ContactComponent', () => {
  let component: ContactComponent
  let fixture: ComponentFixture<ContactComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [MockTranslationProvider]
    })
      .compileComponents()

    fixture = TestBed.createComponent(ContactComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

// TODO: test more
