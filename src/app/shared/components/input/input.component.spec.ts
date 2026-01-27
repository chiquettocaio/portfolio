import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DebugElement } from '@angular/core'
import { NgControl, Validators } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { MockNgControl } from 'src/testing/mocks/helpers'
import { InputComponent } from './input.component'

const inputId = 'test-input'
const inputLabel = 'test-label'

const errorMessages = {
  required: 'This field is required by test',
  pattern: 'This pattern is invalid by test',
  minlength: 'The value is too short by test',
  maxlength: 'The value is too long by test'
}

describe('InputComponent', () => {
  let component: InputComponent
  let fixture: ComponentFixture<InputComponent>
  let debugEl: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
      providers: [
        {
          provide: NgControl,
          useClass: MockNgControl
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(InputComponent)
    component = fixture.componentInstance
    debugEl = fixture.debugElement
  })

  it('should create', () => {
    fixture.componentRef.setInput('id', inputId)
    fixture.componentRef.setInput('label', inputLabel)

    fixture.detectChanges()

    const inputDebugEl = debugEl.query(By.css('input'))
    const labelDebugEl = debugEl.query(By.css('label'))
    expect(inputDebugEl).toBeTruthy()
    expect(labelDebugEl).toBeTruthy()

    const input = inputDebugEl.nativeElement as HTMLInputElement
    const label = labelDebugEl.nativeElement as HTMLLabelElement
    expect(input.id).toBe(component.id())
    expect(label.htmlFor).toBe(component.id())
    expect(label.textContent).toMatch(new RegExp(component.label()))

    expect(component).toBeTruthy()
  })

  it('should not create without "id"', () => {
    fixture.componentRef.setInput('label', inputLabel)
    expect(() => fixture.detectChanges()).toThrowError(/NG0950: .* "id"/)
  })

  it('should not create without "label"', () => {
    fixture.componentRef.setInput('id', inputId)
    expect(() => fixture.detectChanges()).toThrowError(/NG0950: .* "label"/)
  })

  it('should call "blurField" on blur', () => {
    fixture.componentRef.setInput('id', inputId)
    fixture.componentRef.setInput('label', inputLabel)

    fixture.detectChanges()

    const blurSpy = vi.spyOn(component, 'blurField')

    const inputDebugEl = debugEl.query(By.css('input'))
    expect(inputDebugEl).toBeTruthy()

    const textArea = inputDebugEl.nativeElement as HTMLInputElement
    textArea.dispatchEvent(new Event('blur'))

    expect(blurSpy).toHaveBeenCalled()
  })

  it('should call "setValue" on input', () => {
    fixture.componentRef.setInput('id', inputId)
    fixture.componentRef.setInput('label', inputLabel)

    fixture.detectChanges()

    const setValueSpy = vi.spyOn(component, 'setValue')

    const event = new Event('input')

    const inputDebugEl = debugEl.query(By.css('input'))
    expect(inputDebugEl).toBeTruthy()

    const input = inputDebugEl.nativeElement as HTMLInputElement
    input.value = 'mock'
    input.dispatchEvent(event)
    fixture.detectChanges()

    expect(setValueSpy).toHaveBeenCalledWith('mock')
  })

  it('should display "required" error message on textarea input', () => {
    // set inputs
    fixture.componentRef.setInput('id', inputId)
    fixture.componentRef.setInput('label', inputLabel)
    fixture.componentRef.setInput('errorMessages', errorMessages)

    // TEST: do not call ngOnInit directly, it smells like a weak test. Call fixture.detectChanges instead and let Angular take care of the lifecycle.
    // component.ngOnInit()
    fixture.detectChanges()

    // add validation to control similar of the production one
    component.control.control?.setValidators([Validators.required])
    fixture.detectChanges()

    // create spies
    const setValueSpy = vi.spyOn(component, 'setValue')
    const onChangeSpy = vi.spyOn(component, 'onChange')

    // check if textarea is rendered
    const inputDebugEl = debugEl.query(By.css('input'))
    expect(inputDebugEl).toBeTruthy()

    // dispatch event
    const input = inputDebugEl.nativeElement as HTMLTextAreaElement
    const event = new Event('input')
    input.dispatchEvent(event)

    // update control and acheck if methods were called
    component.control.control?.updateValueAndValidity()
    expect(setValueSpy).toHaveBeenCalled()
    expect(onChangeSpy).toHaveBeenCalled()

    // check if error matches the expected
    expect(component.control.control?.errors).toMatchObject({ required: true })

    // update property to allow error span to be rendered (@if)
    component.control.control?.markAsTouched()
    component.control.control?.setValue('')
    component.control.control?.updateValueAndValidity()

    fixture.detectChanges()

    // check over span existance and content
    const errorDebugEl = debugEl.query(By.css('span.form-control__error'))
    expect(errorDebugEl).toBeTruthy()

    const errorElement = errorDebugEl.nativeElement as HTMLSpanElement
    expect(errorElement.textContent.trim()).toBe(errorMessages.required)
  })
})
