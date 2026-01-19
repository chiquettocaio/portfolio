import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslatePipe } from '@ngx-translate/core'
import { ButtonComponent } from '../../../../../shared/components/button/button.component'
import { InputComponent } from '../../../../../shared/components/input/input.component'
import { TextAreaComponent } from '../../../../../shared/components/textarea/textarea.component'

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
  }, { updateOn: 'blur' })

  submit (): void {
    const isFormValid = this.validateForm()

    if (!isFormValid) return

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
}
