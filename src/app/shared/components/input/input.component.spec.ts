import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DebugElement } from '@angular/core'
import { NgControl } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { MockNgControl } from '@app/shared/tests/mocks/providers/ng-control'
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
})

// TODO: test more
