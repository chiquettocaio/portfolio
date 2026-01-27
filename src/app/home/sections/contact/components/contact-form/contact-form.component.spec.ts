import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { ContactFormComponent } from './contact-form.component'

const firstNameValue: string = 'Caio'
const lastNameValue: string = 'Chiquetto'
const subjectValue: string = 'Test subject'
const messageValue: string = 'Test message'

describe('ContactFormComponent', () => {
  let component: ContactFormComponent
  let fixture: ComponentFixture<ContactFormComponent>
  let debugEl: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [MockTranslationProvider]
    }).compileComponents()

    fixture = TestBed.createComponent(ContactFormComponent)
    component = fixture.componentInstance
    debugEl = fixture.debugElement

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should submit the form with no errors', () => {
    const firstNameDebugEl = debugEl.query(By.css('#first-name input'))
    const lastNameDebugEl = debugEl.query(By.css('#last-name input'))
    const subjectDebugEl = debugEl.query(By.css('#subject input'))
    const messageDebugEl = debugEl.query(By.css('#message textarea'))
    const buttonDebugEl = debugEl.query(By.css('app-button button'))
    expect(firstNameDebugEl).toBeTruthy()
    expect(lastNameDebugEl).toBeTruthy()
    expect(subjectDebugEl).toBeTruthy()
    expect(messageDebugEl).toBeTruthy()
    expect(buttonDebugEl).toBeTruthy()

    const firstName = firstNameDebugEl.nativeElement as HTMLInputElement
    firstName.value = firstNameValue
    firstName.dispatchEvent(new Event('input'))

    const lastName = lastNameDebugEl.nativeElement as HTMLInputElement
    lastName.value = lastNameValue
    lastName.dispatchEvent(new Event('input'))

    const subject = subjectDebugEl.nativeElement as HTMLInputElement
    subject.value = subjectValue
    subject.dispatchEvent(new Event('input'))

    const message = messageDebugEl.nativeElement as HTMLInputElement
    message.value = messageValue
    message.dispatchEvent(new Event('input'))

    expect(component.contactForm.valid).toBe(true)
    expect(component.contactForm.errors).toBe(null)
    expect(component.contactForm.value).toMatchObject({
      firstName: firstNameValue,
      lastName: lastNameValue,
      subject: subjectValue,
      message: messageValue
    })

    const submitSpy = vi.spyOn(component, 'submit')

    const button = buttonDebugEl.nativeElement as HTMLButtonElement
    // TEST: for buttons use .click instead of .dispatchEvent(new Event('click')), it may not work
    button.click()
    fixture.detectChanges()

    expect(submitSpy).toHaveBeenCalled()
  })

  it('should not submit the form', () => {
    const buttonDebugEl = debugEl.query(By.css('app-button button'))
    const firstNameDebugEl = debugEl.query(By.css('#first-name input'))
    expect(buttonDebugEl).toBeTruthy()
    expect(firstNameDebugEl).toBeTruthy()

    const button = buttonDebugEl.nativeElement as HTMLButtonElement
    button.click()

    fixture.detectChanges()

    expect(component.contactForm.controls.firstName.touched).toBe(true)
    expect(component.contactForm.controls.firstName.invalid).toBe(true)
    expect(component.contactForm.valid).toBe(false)
    expect(component.contactForm.value).toMatchObject({
      firstName: '',
      lastName: '',
      subject: '',
      message: ''
    })
  })
})

// TODO: test more
