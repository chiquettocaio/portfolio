import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { TranslatePipe } from '@ngx-translate/core'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, AnchorComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  ngAfterViewInit (): void {
    this.startAnimation()
  }

  private startAnimation (): void {
    gsap.registerPlugin(ScrollTrigger)

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#about-section',
          start: 'top 70%',
          end: 'bottom 70%'
          // markers: true
        }
      })
      .from('#about-section .paragraph:nth-child(2)', {
        opacity: 0,
        duration: 0.4,
        y: 50,
        ease: 'power1.inOut'
      })
      .from('#about-section .paragraph:nth-child(3)', {
        opacity: 0,
        duration: 0.4,
        y: 50,
        ease: 'power1.inOut'
      })
      .from('#about-section .paragraph:nth-child(4)', {
        opacity: 0,
        duration: 0.4,
        y: 50,
        ease: 'power1.inOut'
      })
      .from('#about-section .paragraph:nth-child(4) ul li', {
        opacity: 0,
        y: 50,
        duration: 0.4,
        stagger: 0.4,
        ease: 'power1.inOut'
      })
      .from('#about-section .paragraph:nth-child(5)', {
        opacity: 0,
        duration: 0.4,
        x: 200,
        ease: 'power1.inOut'
      })
      .from('#about-section .paragraph:nth-child(6)', {
        opacity: 0,
        duration: 0.4,
        x: -200,
        ease: 'power1.inOut'
      })
      .from('#about-section .h2', {
        opacity: 0,
        scale: 0,
        duration: 0.75,
        ease: 'back.out(4)'
      }, '=+0.5')
      .from('#about-section .check-resume-cta', {
        opacity: 0,
        duration: 0.4,
        y: 100,
        ease: 'power1.out'
      })
  }
}
