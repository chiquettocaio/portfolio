import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DebugElement } from '@angular/core'
import { NgControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { MockNgControl } from 'src/testing/mocks/helpers'
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

  it('should call "blurField" on blur', () => {
    fixture.componentRef.setInput('id', textareaId)
    fixture.componentRef.setInput('label', textareaLabel)

    fixture.detectChanges()

    const blurSpy = vi.spyOn(component, 'blurField')

    const textAreaDebugEl = debugEl.query(By.css('textarea'))
    expect(textAreaDebugEl).toBeTruthy()

    const textArea = textAreaDebugEl.nativeElement as HTMLTextAreaElement
    textArea.dispatchEvent(new Event('blur'))

    expect(blurSpy).toHaveBeenCalled()
  })

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

  it('should call "onChange" on blur', () => {
    fixture.componentRef.setInput('id', textareaId)
    fixture.componentRef.setInput('label', textareaLabel)
    fixture.detectChanges()

    component['updateOn'] = 'blur'

    const onChangeSpy = vi.spyOn(component, 'onChange')
    const setValueSpy = vi.spyOn(component, 'setValue')

    const textAreaDebugEl = debugEl.query(By.css('textarea'))
    expect(textAreaDebugEl).toBeTruthy()

    const inputEvent = new Event('input')
    const textArea = textAreaDebugEl.nativeElement as HTMLTextAreaElement
    textArea.value = 'mock'
    textArea.dispatchEvent(inputEvent)
    expect(setValueSpy).toHaveBeenCalledWith(inputEvent)

    textArea.dispatchEvent(new Event('blur'))
    fixture.detectChanges()
    expect(onChangeSpy).toHaveBeenCalled()
  })

  it('should display "required" error message on textarea input', () => {
    fixture.componentRef.setInput('id', textareaId)
    fixture.componentRef.setInput('label', textareaLabel)
    fixture.componentRef.setInput('errorMessages', errorMessages)

    component.ngOnInit()
    component.control.control?.setValidators([Validators.required])
    fixture.detectChanges()

    const setValueSpy = vi.spyOn(component, 'setValue')
    const onChangeSpy = vi.spyOn(component, 'onChange')

    const textAreaDebugEl = debugEl.query(By.css('textarea'))
    expect(textAreaDebugEl).toBeTruthy()

    const textArea = textAreaDebugEl.nativeElement as HTMLTextAreaElement
    const event = new Event('input')
    textArea.dispatchEvent(event)

    component.control.control?.updateValueAndValidity()
    expect(setValueSpy).toHaveBeenCalled()
    expect(onChangeSpy).toHaveBeenCalled()
    expect(component.control.control?.errors).toMatchObject({ required: true })

    component.errorKey.set('required')
    fixture.detectChanges()

    const errorDebugEl = debugEl.query(By.css('span.form-control__error'))
    expect(errorDebugEl).toBeTruthy()

    const errorElement = errorDebugEl.nativeElement as HTMLSpanElement
    expect(errorElement.textContent.trim()).toBe(errorMessages.required)
  })
})
