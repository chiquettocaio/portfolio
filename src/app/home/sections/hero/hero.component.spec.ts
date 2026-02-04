import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { HeroComponent } from './hero.component'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

describe('Hero', () => {
  gsap.registerPlugin(ScrollTrigger)

  let component: HeroComponent
  let fixture: ComponentFixture<HeroComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [MockTranslationProvider]
    }).compileComponents()

    fixture = TestBed.createComponent(HeroComponent)
    component = fixture.componentInstance

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
