import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { ButtonSize, ButtonVariant } from './button.model'

@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  content = input.required<string>()
  ariaLabel = input.required<string>()
  title = input<string>('Button')
  variant = input<ButtonVariant>('primary')
  size = input<ButtonSize>('regular')

  clicked = output()
}
