import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NgTemplateOutlet } from '@angular/common'
import { By } from '@angular/platform-browser'
import { TranslatePipe } from '@ngx-translate/core'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { ButtonComponent } from '../button/button.component'
import { IconComponent } from '../icon/icon.component'
import { ToastService } from './services/toast-service/toast.service'
import { ToastComponent } from './toast.component'

describe('ToastComponent', () => {
  let component: ToastComponent
  let fixture: ComponentFixture<ToastComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ToastComponent,
        IconComponent,
        ButtonComponent,
        NgTemplateOutlet,
        TranslatePipe
      ],

      providers: [
        ToastService,
        MockTranslationProvider
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ToastComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render a toast', () => {
    const service = component['toastService']
    service.add({
      type: 'success',
      messageKey: 'test.message',
      titleKey: 'test.title'
    })

    fixture.detectChanges()

    expect(component.toasts().length).toBe(1)
  })

  it('should render a toast and close it via click', () => {
    const service = component['toastService']
    service.add({
      type: 'success',
      messageKey: 'test.message',
      titleKey: 'test.title'
    })

    const closeSpy = vi.spyOn(component, 'close')

    fixture.detectChanges()
    expect(component.toasts().length).toBe(1)

    let toastDE = fixture.debugElement.query(By.css('.toast'))
    expect(toastDE).toBeTruthy()
    const closeBtnDE = toastDE.query(By.css('app-button button'))
    expect(closeBtnDE).toBeTruthy()
    const closeBtn = closeBtnDE.nativeElement as HTMLButtonElement
    closeBtn.click()
    fixture.detectChanges()

    expect(closeSpy).toHaveBeenCalled()

    toastDE = fixture.debugElement.query(By.css('.toast'))
    expect(toastDE).toBeFalsy()
  })
})
