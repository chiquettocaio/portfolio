import { NgOptimizedImage } from '@angular/common'
import { Component } from '@angular/core'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { IconComponent } from '@app/shared/components/icon/icon.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-hero',
  imports: [
    TranslatePipe,
    NgOptimizedImage,

    IconComponent,
    AnchorComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {}
