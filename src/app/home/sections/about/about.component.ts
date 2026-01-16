import { Component } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { ButtonComponent } from '../../../shared/components/button/button.component'

@Component({
  selector: 'app-about',
  imports: [TranslatePipe, ButtonComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
}
