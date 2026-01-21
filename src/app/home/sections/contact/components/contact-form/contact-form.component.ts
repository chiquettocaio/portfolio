import { Component, ElementRef, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonComponent } from '@app/shared/components/button/button.component'
import { InputComponent } from '@app/shared/components/input/input.component'
import { TextAreaComponent } from '@app/shared/components/textarea/textarea.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    TextAreaComponent,
    ButtonComponent,
    TranslatePipe
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  private fb = inject(FormBuilder)
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef)

  NAME_MIN_LENGTH: number = 2
  NAME_MAX_LENGTH: number = 20
  SUBJECT_MIN_LENGTH: number = 5
  SUBJECT_MAX_LENGTH: number = 40
  MESSAGE_MIN_LENGTH: number = 10

  contactForm = this.fb.group({
    firstName: ['', [
      Validators.required,
      Validators.minLength(this.NAME_MIN_LENGTH),
      Validators.maxLength(this.NAME_MAX_LENGTH),
      Validators.pattern('[a-zA-Z]*')
    ]],

    lastName: ['', [
      Validators.required,
      Validators.minLength(this.NAME_MIN_LENGTH),
      Validators.maxLength(this.NAME_MAX_LENGTH),
      Validators.pattern('[a-zA-Z]*')
    ]],

    subject: ['', [
      Validators.required,
      Validators.minLength(this.SUBJECT_MIN_LENGTH),
      Validators.maxLength(this.SUBJECT_MAX_LENGTH)
    ]],
    message: ['', [
      Validators.required,
      Validators.minLength(this.MESSAGE_MIN_LENGTH)
    ]]
  })

  submit (): void {
    const isFormValid = this.validateForm()

    if (!isFormValid) {
      this.focusOnFirstInvalidInput()
      return
    }

    console.log('Submitting form', this.contactForm.value)
  }

  private validateForm (): boolean {
    if (!this.contactForm.valid) {
      this.contactForm.markAllAsTouched()
      this.contactForm.updateValueAndValidity()
      return false
    }

    return true
  }

  private focusOnFirstInvalidInput (): void {
    const firstInvalidInput = this.elementRef.nativeElement.querySelector('form .ng-invalid input, form .ng-invalid textarea') as HTMLInputElement
    const focusedInput = this.elementRef.nativeElement.querySelector('form input:focus, form textarea:focus') as HTMLInputElement
    const nextInvalidInput = this.elementRef.nativeElement
      .querySelector('form app-input:has(input:focus) ~ .ng-invalid input, form app-input:has(input:focus) ~ .ng-invalid textarea') as HTMLInputElement

    const isFocusedInputInvalid = focusedInput?.parentElement?.parentElement?.classList.contains('ng-invalid')

    console.log({
      firstInvalidInput,
      focusedInput,
      nextInvalidInput,
      isFocusedInputInvalid
    })

    const inputToFocus = focusedInput
      ? isFocusedInputInvalid
        ? focusedInput
        : nextInvalidInput
      : firstInvalidInput

    inputToFocus?.focus()
  }
}
