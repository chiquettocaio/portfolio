import { NgOptimizedImage } from '@angular/common'
import { Component } from '@angular/core'
import { ButtonComponent } from '@app/shared/components/button/button.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, ButtonComponent, NgOptimizedImage],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {}
