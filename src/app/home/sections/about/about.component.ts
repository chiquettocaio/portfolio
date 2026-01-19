import { Component } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { AnchorComponent } from '../../../shared/components/anchor/anchor.component'

@Component({
  selector: 'app-about',
  imports: [TranslatePipe, AnchorComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
}
