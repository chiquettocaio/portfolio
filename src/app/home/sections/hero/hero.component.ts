import { NgOptimizedImage } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { IconComponent } from '@app/shared/components/icon/icon.component'
import { TranslatePipe } from '@ngx-translate/core'
import { gsap } from 'gsap'

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    NgOptimizedImage,
    IconComponent,
    AnchorComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit (): void {
    this.startAnimation()
  }

  private startAnimation (): void {
    gsap.timeline()
      .from('#hero-section .paragraph--eyebrow', {
        opacity: 0,
        x: 200,
        ease: 'power1.inOut',
        duration: 0.5
      })

      .from('#hero-section .buttons--social app-anchor', {
        opacity: 0,
        ease: 'power1.inOut',
        stagger: 0.2
      })

      .from('#hero-section .headline', {
        opacity: 0,
        scale: 0,
        ease: 'back.out(4)',
        duration: 0.8
      })

      .from('#hero-section .paragraph--subheadline', {
        opacity: 0,
        y: 50,
        ease: 'power1.out'
      }, '+=0.2')

      .from('#hero-section .buttons--navigate', {
        y: 50,
        opacity: 0,
        ease: 'back.out(2)',
        duration: 1
      }, '+=0.2')
  }
}
