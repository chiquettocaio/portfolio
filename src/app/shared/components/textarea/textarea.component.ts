import { AfterViewInit, Component, forwardRef, inject, Injector, input, OnInit, signal } from '@angular/core'
import { AbstractControlOptions, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, TouchedChangeEvent } from '@angular/forms'
import { KeyString } from '@app/shared/models/generic-types.model'
import { filter, take, tap } from 'rxjs'

@Component({
  selector: 'app-textarea',
  imports: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => TextAreaComponent)
  }],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextAreaComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  protected injector = inject(Injector)

  id = input.required<string>()
  label = input.required<string>()
  errorMessages = input<KeyString<string>>({})

  control !: NgControl
  private updateOn: AbstractControlOptions['updateOn'] = 'change'
  value = signal<string>('')
  errorKey = signal<string>('')

  onChange!: (value: string) => void
  onTouched!: () => void

  ngOnInit (): void {
    this.control = this.injector.get(NgControl)
  }

  ngAfterViewInit (): void {
    this.updateOn = this.control.control?.updateOn ?? 'change'
    this.listenToControlEvents()
  }

  setValue (event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value
    this.value.set(value)

    const updateOnFns = {
      change: (): void => {
        this.onChange(value)
        this.onTouched()
        this.checkForError()
      },

      blur: (): void => { return },
      submit: (): void => { return }
    }

    updateOnFns[this.updateOn!]()
  }

  blurField (): void {
    this.onTouched()

    if (this.updateOn === 'blur') {
      this.onChange(this.value())
      this.onTouched()
      this.checkForError()
    }
  }

  writeValue (value: string): void {
    this.value.set(value)
  }

  registerOnChange (fn: () => void): void {
    this.onChange = fn
  }

  registerOnTouched (fn: () => void): void {
    this.onTouched = fn
  }

  private checkForError (): void {
    const errorsAsArray = Object.keys(this.control.errors ?? {})

    if (errorsAsArray.length) {
      this.errorKey.set(errorsAsArray[0])
    }
  }

  private listenToControlEvents (): void {
    this.control.control?.events.pipe(
      filter(event => event instanceof TouchedChangeEvent),
      take(1),
      tap(() => this.checkForError())
    ).subscribe()
  }
}
