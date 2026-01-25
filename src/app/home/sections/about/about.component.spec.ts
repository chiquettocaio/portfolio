import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockTranslationProvider } from '@app/shared/tests/mocks/providers/translation'
import { AboutComponent } from './about.component'

describe('About', () => {
  let component: AboutComponent
  let fixture: ComponentFixture<AboutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutComponent
      ],

      // TEST: to provide translation
      providers: [
        MockTranslationProvider
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(AboutComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

// TODO: test more
