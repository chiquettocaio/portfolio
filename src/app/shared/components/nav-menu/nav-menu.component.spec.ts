import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslatePipe } from '@ngx-translate/core'
import { MockIntersectionObserver } from 'src/testing/mocks/global'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { IconComponent } from '../icon/icon.component'
import { NavMenuComponent } from './nav-menu.component'

describe('NavMenuComponent', () => {
  let component: NavMenuComponent
  let fixture: ComponentFixture<NavMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavMenuComponent,
        IconComponent,
        TranslatePipe
      ],

      providers: [
        MockTranslationProvider
      ]
    }).compileComponents()

    window.IntersectionObserver = MockIntersectionObserver as any

    fixture = TestBed.createComponent(NavMenuComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // TODO: improve testing
})
