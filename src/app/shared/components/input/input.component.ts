import { AfterViewInit, Component, forwardRef, inject, Injector, input, OnInit, signal } from '@angular/core'
import { AbstractControlOptions, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, TouchedChangeEvent } from '@angular/forms'
import { filter, take, tap } from 'rxjs'
import { KeyString } from '../../models/generic-types.model'

@Component({
  selector: 'app-input',
  imports: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => InputComponent)
  }],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  protected injector = inject(Injector)

  id = input.required<string>()
  label = input.required<string>()
  errorMessages = input<KeyString<string>>({})

  control !: NgControl
  private updateOn: AbstractControlOptions['updateOn'] = 'change'
  onChange!: (value: string) => void
  onTouched!: () => void

  value = signal<string>('')
  errorKey = signal<string>('')

  ngOnInit (): void {
    this.control = this.injector.get(NgControl)
  }

  ngAfterViewInit (): void {
    this.updateOn = this.control.control?.updateOn ?? 'change'
    this.listenToControlEvents()
  }

  setValue (value: string): void {
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

  /* ControlValueAcessor methods */
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
