import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { IconComponent } from '@app/shared/components/icon/icon.component'
import { TranslatePipe } from '@ngx-translate/core'
import gsap from 'gsap'
import { ContactFormComponent } from './components/contact-form/contact-form.component'

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    ContactFormComponent,
    AnchorComponent,
    IconComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {
  ngAfterViewInit (): void {
    this.startAnimation()
  }

  private startAnimation (): void {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#contact-section',
        start: 'top 60%',
        end: 'top 0',
        scrub: 1
      }
    })
      .from('#contact-section .title', {
        y: 20,
        opacity: 0
      })
      .from('#contact-section .paragraph:nth-child(2)', {
        x: -20,
        opacity: 0
      })
      .from('#contact-section .paragraph:nth-child(3)', {
        x: 20,
        opacity: 0
      }, '<')
      .from('#contact-section app-contact-form', {
        y: 20,
        opacity: 0
      })
      .from('#contact-section .buttons--social', {
        opacity: 0,
        y: 20
      })
  }
}
