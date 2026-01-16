import { Component, input, output } from '@angular/core'
import { ButtonVariant } from './button.model'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  content = input.required<string>()
  title = input<string>('Button title')
  ariaLabel = input.required<string>()
  variant = input<ButtonVariant>('primary')

  clicked = output()
}
