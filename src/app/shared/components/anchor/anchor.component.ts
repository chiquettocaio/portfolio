import { booleanAttribute, Component, input } from '@angular/core'
import { AnchorSize, AnchorTarget, AnchorVariant } from './anchor.model'

@Component({
  selector: 'app-anchor',
  templateUrl: './anchor.component.html',
  styleUrl: './anchor.component.scss'
})
export class AnchorComponent {
  content = input.required<string>()
  ariaLabel = input.required<string>()
  href = input.required<string>()
  title = input<string>('Anchor')
  variant = input<AnchorVariant>('simple')
  size = input<AnchorSize>('regular')
  target = input<AnchorTarget>('_self')
  download = input(null, { transform: booleanAttribute })
}
