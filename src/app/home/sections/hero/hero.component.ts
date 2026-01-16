import { Component } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { ButtonComponent } from '../../../shared/components/button/button.component'

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {}
