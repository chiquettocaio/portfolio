import { ComponentFixture, TestBed } from '@angular/core/testing'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { ContactComponent } from './contact.component'

describe('ContactComponent', () => {
  gsap.registerPlugin(ScrollTrigger)

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
