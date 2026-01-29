import { NgTemplateOutlet } from '@angular/common'
import { Component, signal } from '@angular/core'
import { ButtonComponent } from '../button/button.component'
import { IconComponent } from '../icon/icon.component'

@Component({
  selector: 'app-toast',
  imports: [
    IconComponent,
    ButtonComponent,
    NgTemplateOutlet
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  show = signal(false)

  toggle (): void {
    this.show.update(s => !s)
  }
}

// TODO: integrate with service
