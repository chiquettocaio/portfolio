import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DebugElement } from '@angular/core'
import { NgControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { MockNgControl } from '@tests/mocks/providers/ng-control'
import { TextAreaComponent } from './textarea.component'

const textareaId = 'test-textarea'
const textareaLabel = 'test-label'

const errorMessages = {
  required: 'This field is required by test',
  pattern: 'This pattern is invalid by test',
  minlength: 'The value is too short by test',
  maxlength: 'The value is too long by test'
}

describe('TextAreaComponent', () => {
  let component: TextAreaComponent
  let fixture: ComponentFixture<TextAreaComponent>
  let debugEl: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAreaComponent, ReactiveFormsModule],
      providers: [
        {
          provide: NgControl,
          useClass: MockNgControl
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TextAreaComponent)
    component = fixture.componentInstance
    debugEl = fixture.debugElement
  })

  it('should create', () => {
    fixture.componentRef.setInput('id', textareaId)
    fixture.componentRef.setInput('label', textareaLabel)

    fixture.detectChanges()

    const textAreaDebugEl = debugEl.query(By.css('textarea'))
    const labelDebugEl = debugEl.query(By.css('label'))
    expect(textAreaDebugEl).toBeTruthy()
    expect(labelDebugEl).toBeTruthy()

    const textArea = textAreaDebugEl.nativeElement as HTMLInputElement
    const label = labelDebugEl.nativeElement as HTMLLabelElement
    expect(textArea.id).toBe(component.id())
    expect(label.htmlFor).toBe(component.id())
    expect(label.textContent).toMatch(new RegExp(component.label()))

    expect(component).toBeTruthy()
  })

  it('should not create without "id"', () => {
    fixture.componentRef.setInput('label', textareaLabel)
    expect(() => fixture.detectChanges()).toThrowError(/NG0950: .* "id"/)
  })

  it('should not create without "label"', () => {
    fixture.componentRef.setInput('id', textareaId)
    expect(() => fixture.detectChanges()).toThrowError(/NG0950: .* "label"/)
  })

  // TEST: spying on a component method
  it('should call "blurField" on blur', () => {
    fixture.componentRef.setInput('id', textareaId)
    fixture.componentRef.setInput('label', textareaLabel)

    fixture.detectChanges()

    const blurSpy = vi.spyOn(component, 'blurField')
    // .mockImplementation(() => { return }) TEST: in case we want to change the method behavior right here

    const textAreaDebugEl = debugEl.query(By.css('textarea'))
    expect(textAreaDebugEl).toBeTruthy()

    const textArea = textAreaDebugEl.nativeElement as HTMLTextAreaElement
    textArea.dispatchEvent(new Event('blur'))

    expect(blurSpy).toHaveBeenCalled()
  })

  // TEST: check if spyon was called with event
  it('should call "setValue" on input', () => {
    fixture.componentRef.setInput('id', textareaId)
    fixture.componentRef.setInput('label', textareaLabel)

    fixture.detectChanges()

    const setValueSpy = vi.spyOn(component, 'setValue')

    const event = new Event('input')

    const textAreaDebugEl = debugEl.query(By.css('textarea'))
    expect(textAreaDebugEl).toBeTruthy()

    const textArea = textAreaDebugEl.nativeElement as HTMLTextAreaElement
    textArea.dispatchEvent(event)

    expect(setValueSpy).toHaveBeenCalledWith(event)
  })

  // TEST: testing all the textarea execution flow, from input to error
  it('should display "required" error message on textarea input', () => {
    // set inputs
    fixture.componentRef.setInput('id', textareaId)
    fixture.componentRef.setInput('label', textareaLabel)
    fixture.componentRef.setInput('errorMessages', errorMessages)

    // add validation to control similar of the production one
    component.ngOnInit()
    component.control.control?.setValidators([Validators.required])
    fixture.detectChanges()

    // create spies
    const setValueSpy = vi.spyOn(component, 'setValue')
    const onChangeSpy = vi.spyOn(component, 'onChange')

    // check if textarea is rendered
    const textAreaDebugEl = debugEl.query(By.css('textarea'))
    expect(textAreaDebugEl).toBeTruthy()

    // dispatch event
    const textArea = textAreaDebugEl.nativeElement as HTMLTextAreaElement
    const event = new Event('input')
    textArea.dispatchEvent(event)

    // update control and acheck if methods were called
    component.control.control?.updateValueAndValidity()
    expect(setValueSpy).toHaveBeenCalled()
    expect(onChangeSpy).toHaveBeenCalled()

    // check if error matches the expected
    expect(component.control.control?.errors).toMatchObject({ required: true })

    // update property to allow error span to be rendered (@if)
    component.errorKey.set('required')
    fixture.detectChanges()

    // check over span existance and content
    const errorDebugEl = debugEl.query(By.css('span.form-control__error'))
    expect(errorDebugEl).toBeTruthy()

    const errorElement = errorDebugEl.nativeElement as HTMLSpanElement
    expect(errorElement.textContent.trim()).toBe(errorMessages.required)
  })
})
