import { ChangeDetectionStrategy, Component, DOCUMENT, ElementRef, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonComponent } from '@app/shared/components/button/button.component'
import { InputComponent } from '@app/shared/components/input/input.component'
import { LoaderService } from '@app/shared/components/loader/services/loader.service'
import { TextAreaComponent } from '@app/shared/components/textarea/textarea.component'
import { ToastService } from '@app/shared/components/toast/services/toast-service/toast.service'
import { TranslatePipe } from '@ngx-translate/core'
import { catchError, finalize, of, take, tap } from 'rxjs'
import { ContactFormService } from './services/contact-form/contact-form.service'
import { ContactFormData } from './services/models/contact-form.model'

@Component({
  selector: 'app-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    TextAreaComponent,
    ButtonComponent,
    TranslatePipe
  ],
  providers: [ContactFormService],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  private fb = inject(FormBuilder)
  private contactFormService = inject(ContactFormService)
  private toastService = inject(ToastService)
  private loaderService = inject(LoaderService)
  private document = inject(DOCUMENT)
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef)

  NAME_MIN_LENGTH: number = 2
  NAME_MAX_LENGTH: number = 40
  SUBJECT_MIN_LENGTH: number = 5
  SUBJECT_MAX_LENGTH: number = 40
  MESSAGE_MIN_LENGTH: number = 10

  LAST_NAME_REGEXP: RegExp = /\s[a-zA-Z]{2,}/

  contactForm = this.fb.nonNullable.group({
    fullName: ['', [
      Validators.required,
      Validators.minLength(this.NAME_MIN_LENGTH),
      Validators.maxLength(this.NAME_MAX_LENGTH),
      Validators.pattern('[a-zA-Z]{2,}(\\s[a-zA-Z]*)*'),
      Validators.pattern(this.LAST_NAME_REGEXP)
    ]],

    email: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
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

    this.dispatchContactRequest()
  }

  private dispatchContactRequest (): void {
    this.loaderService.show()
    this.toggleBlockScroll()

    this.contactFormService
      .post(this.contactForm.value as ContactFormData)
      .pipe(
        take(1),
        tap(() => {
          this.loaderService.hide()
          this.displaySuccessToast()
          this.contactForm.reset()
        }),
        catchError(() => {
          this.loaderService.hide()
          this.displayErrorToast()
          return of()
        }),
        finalize(() => this.toggleBlockScroll())
      ).subscribe()
  }

  private displaySuccessToast (): void {
    this.toastService.add({
      titleKey: 'home.contact.form.feedback.success.title',
      messageKey: 'home.contact.form.feedback.success.message',
      type: 'success'
    })
  }

  private displayErrorToast (): void {
    this.toastService.add({
      titleKey: 'home.contact.form.feedback.fail.title',
      messageKey: 'home.contact.form.feedback.fail.message',
      type: 'error'
    })
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
    const firstInvalidInput = this.elementRef.nativeElement.querySelector('.contact-form .ng-invalid input, .contact-form .ng-invalid textarea') as HTMLInputElement
    const focusedInput = this.elementRef.nativeElement.querySelector('.contact-form input:focus, .contact-form textarea:focus') as HTMLInputElement
    const nextInvalidInput = this.elementRef.nativeElement
      .querySelector('.contact-form app-input:has(input:focus) ~ .ng-invalid input, .contact-form app-input:has(input:focus) ~ .ng-invalid textarea') as HTMLInputElement

    const isFocusedInputInvalid = focusedInput?.parentElement?.parentElement?.classList.contains('ng-invalid')

    const inputToFocus = focusedInput
      ? isFocusedInputInvalid
        ? focusedInput
        : nextInvalidInput
      : firstInvalidInput

    inputToFocus?.focus()
  }

  private toggleBlockScroll (): void {
    this.document.documentElement.classList.toggle('no-scroll')
  }
}
