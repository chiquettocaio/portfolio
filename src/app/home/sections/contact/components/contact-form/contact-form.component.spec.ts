import { ComponentFixture, TestBed } from '@angular/core/testing'

import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { ContactFormComponent } from './contact-form.component'

const fullNameValue: string = 'Test User'
const emailValue: string = 'test@email.com'
const subjectValue: string = 'Test subject'
const messageValue: string = 'Test message'

const endpointUrl: string = 'https://formspree.io/f/xxxxxxxx'

describe('ContactFormComponent', () => {
  let component: ContactFormComponent
  let fixture: ComponentFixture<ContactFormComponent>
  let debugEl: DebugElement
  let httpTesting: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MockTranslationProvider
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ContactFormComponent)
    component = fixture.componentInstance
    debugEl = fixture.debugElement
    httpTesting = TestBed.inject(HttpTestingController)

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should submit the form with no errors', () => {
    const fullNameDebugEl = debugEl.query(By.css('#full-name input'))
    const emailDebugEl = debugEl.query(By.css('#email input'))
    const subjectDebugEl = debugEl.query(By.css('#subject input'))
    const messageDebugEl = debugEl.query(By.css('#message textarea'))
    const buttonDebugEl = debugEl.query(By.css('app-button button'))
    expect(fullNameDebugEl).toBeTruthy()
    expect(emailDebugEl).toBeTruthy()
    expect(subjectDebugEl).toBeTruthy()
    expect(messageDebugEl).toBeTruthy()
    expect(buttonDebugEl).toBeTruthy()

    // SETTING VALUES
    const fullName = fullNameDebugEl.nativeElement as HTMLInputElement
    fullName.value = fullNameValue
    fullName.dispatchEvent(new Event('input'))

    const email = emailDebugEl.nativeElement as HTMLInputElement
    email.value = emailValue
    email.dispatchEvent(new Event('input'))

    const subject = subjectDebugEl.nativeElement as HTMLInputElement
    subject.value = subjectValue
    subject.dispatchEvent(new Event('input'))

    const message = messageDebugEl.nativeElement as HTMLInputElement
    message.value = messageValue
    message.dispatchEvent(new Event('input'))

    expect(component.contactForm.valid).toBe(true)
    expect(component.contactForm.errors).toBe(null)
    expect(component.contactForm.value).toMatchObject({
      fullName: fullNameValue,
      email: emailValue,
      subject: subjectValue,
      message: messageValue
    })

    // CHECKING WHETHER SUBMITING IS WORKING FINE
    const submitSpy = vi.spyOn(component, 'submit')
    const button = buttonDebugEl.nativeElement as HTMLButtonElement
    button.click()
    fixture.detectChanges()
    expect(submitSpy).toHaveBeenCalled()
  })

  it('should dispatch the form HTTP request', async () => {
    const fullNameDebugEl = debugEl.query(By.css('#full-name input'))
    const emailDebugEl = debugEl.query(By.css('#email input'))
    const subjectDebugEl = debugEl.query(By.css('#subject input'))
    const messageDebugEl = debugEl.query(By.css('#message textarea'))
    const buttonDebugEl = debugEl.query(By.css('app-button button'))
    expect(fullNameDebugEl).toBeTruthy()
    expect(emailDebugEl).toBeTruthy()
    expect(subjectDebugEl).toBeTruthy()
    expect(messageDebugEl).toBeTruthy()
    expect(buttonDebugEl).toBeTruthy()

    // SETTING VALUES
    const fullName = fullNameDebugEl.nativeElement as HTMLInputElement
    fullName.value = fullNameValue
    fullName.dispatchEvent(new Event('input'))

    const email = emailDebugEl.nativeElement as HTMLInputElement
    email.value = emailValue
    email.dispatchEvent(new Event('input'))

    const subject = subjectDebugEl.nativeElement as HTMLInputElement
    subject.value = subjectValue
    subject.dispatchEvent(new Event('input'))

    const message = messageDebugEl.nativeElement as HTMLInputElement
    message.value = messageValue
    message.dispatchEvent(new Event('input'))

    expect(component.contactForm.valid).toBe(true)
    expect(component.contactForm.errors).toBe(null)
    expect(component.contactForm.value).toMatchObject({
      fullName: fullNameValue,
      email: emailValue,
      subject: subjectValue,
      message: messageValue
    })

    // CHECKING WHETHER SUBMITING IS WORKING FINE
    const submitSpy = vi.spyOn(component, 'submit')
    const button = buttonDebugEl.nativeElement as HTMLButtonElement
    button.click()
    fixture.detectChanges()
    expect(submitSpy).toHaveBeenCalled()

    const req = httpTesting.expectOne({ method: 'POST', url: endpointUrl })
    req.flush({ next: '/thanks', ok: true })

    httpTesting.verify()
  })

  it('should submit the form and return an error', async () => {
    vi.useFakeTimers()

    const fullNameDebugEl = debugEl.query(By.css('#full-name input'))
    const emailDebugEl = debugEl.query(By.css('#email input'))
    const subjectDebugEl = debugEl.query(By.css('#subject input'))
    const messageDebugEl = debugEl.query(By.css('#message textarea'))
    const buttonDebugEl = debugEl.query(By.css('app-button button'))
    expect(fullNameDebugEl).toBeTruthy()
    expect(emailDebugEl).toBeTruthy()
    expect(subjectDebugEl).toBeTruthy()
    expect(messageDebugEl).toBeTruthy()
    expect(buttonDebugEl).toBeTruthy()

    // SETTING VALUES
    const fullName = fullNameDebugEl.nativeElement as HTMLInputElement
    fullName.value = fullNameValue
    fullName.dispatchEvent(new Event('input'))

    const email = emailDebugEl.nativeElement as HTMLInputElement
    email.value = emailValue
    email.dispatchEvent(new Event('input'))

    const subject = subjectDebugEl.nativeElement as HTMLInputElement
    subject.value = subjectValue
    subject.dispatchEvent(new Event('input'))

    const message = messageDebugEl.nativeElement as HTMLInputElement
    message.value = messageValue
    message.dispatchEvent(new Event('input'))

    expect(component.contactForm.valid).toBe(true)
    expect(component.contactForm.errors).toBe(null)
    expect(component.contactForm.value).toMatchObject({
      fullName: fullNameValue,
      email: emailValue,
      subject: subjectValue,
      message: messageValue
    })

    // CHECKING WHETHER SUBMITING IS WORKING FINE
    const submitSpy = vi.spyOn(component, 'submit')
    const button = buttonDebugEl.nativeElement as HTMLButtonElement
    button.click()
    fixture.detectChanges()
    expect(submitSpy).toHaveBeenCalled()

    // TESTING REQUESTS
    const req1 = httpTesting.expectOne(endpointUrl)
    req1.flush('Error', { status: 500, statusText: 'Server Error' })

    // Retry #1 (triggered by the first failure)
    vi.advanceTimersByTime(2000)
    const req2 = httpTesting.expectOne(endpointUrl)
    req2.flush('Error', { status: 500, statusText: 'Server Error' })

    // Retry #2 (Final attempt)
    vi.advanceTimersByTime(2000)
    const req3 = httpTesting.expectOne(endpointUrl)
    req3.flush('Error', { status: 500, statusText: 'Server Error' })

    httpTesting.verify()

    vi.runAllTimers()
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('should not submit the form', () => {
    const buttonDebugEl = debugEl.query(By.css('app-button button'))
    const fullNameDebugEl = debugEl.query(By.css('#full-name input'))
    expect(buttonDebugEl).toBeTruthy()
    expect(fullNameDebugEl).toBeTruthy()

    const button = buttonDebugEl.nativeElement as HTMLButtonElement
    button.click()
    fixture.detectChanges()

    expect(component.contactForm.controls.fullName.touched).toBe(true)
    expect(component.contactForm.controls.fullName.invalid).toBe(true)
    expect(component.contactForm.valid).toBe(false)
    expect(component.contactForm.value).toMatchObject({
      fullName: '',
      email: '',
      subject: '',
      message: ''
    })
  })
})
