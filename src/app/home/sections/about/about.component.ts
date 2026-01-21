import { Component } from '@angular/core'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-about',
  imports: [TranslatePipe, AnchorComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
}
