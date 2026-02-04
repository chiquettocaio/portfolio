import { ComponentFixture, TestBed } from '@angular/core/testing'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { AboutComponent } from './about.component'

describe('About', () => {
  gsap.registerPlugin(ScrollTrigger)

  let component: AboutComponent
  let fixture: ComponentFixture<AboutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutComponent
      ],

      providers: [
        MockTranslationProvider
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(AboutComponent)
    component = fixture.componentInstance

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
