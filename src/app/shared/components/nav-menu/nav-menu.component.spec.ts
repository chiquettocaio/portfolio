import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockIntersectionObserver } from '@app/shared/tests/mocks/global/intersection-observer'
import { MockTranslationProvider } from '@app/shared/tests/mocks/providers/translation'
import { TranslatePipe } from '@ngx-translate/core'
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
})
