import { Directive } from '@angular/core'
import { FormControl, NgControl } from '@angular/forms'

@Directive()
export class MockNgControl extends NgControl {
  control = new FormControl('')
  viewToModelUpdate (): void { return }
}
