import { Component, input, output } from '@angular/core'
import { IconComponent } from '@app/shared/components/icon/icon.component'
import { ClickableIconData } from './clickable-icon.model'

@Component({
  selector: 'app-clickable-icon',
  imports: [IconComponent],
  templateUrl: './clickable-icon.component.html',
  styleUrl: './clickable-icon.component.scss'
})
export class ClickableIconComponent {
  data = input.required<ClickableIconData>()

  clicked = output<void>()
}
