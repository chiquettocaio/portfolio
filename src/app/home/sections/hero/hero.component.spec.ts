import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockTranslationProvider } from '@app/shared/tests/mocks/providers/translation'
import { HeroComponent } from './hero.component'

describe('Hero', () => {
  let component: HeroComponent
  let fixture: ComponentFixture<HeroComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [MockTranslationProvider]
    }).compileComponents()

    fixture = TestBed.createComponent(HeroComponent)
    component = fixture.componentInstance

    // TEST: fixture.whenStable() runs fixture.detectChanges() under the hoods, be aware of it to avoid undesired change detections
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

// TODO: test more
