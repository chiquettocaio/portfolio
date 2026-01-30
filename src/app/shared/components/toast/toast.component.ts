import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { ButtonComponent } from '../button/button.component'
import { IconComponent } from '../icon/icon.component'
import { ToastService } from './services/toast-service/toast.service'

@Component({
  selector: 'app-toast',
  imports: [
    IconComponent,
    ButtonComponent,
    NgTemplateOutlet,
    TranslatePipe
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  private toastService = inject(ToastService)

  toasts = this.toastService.toasts

  close (id: string): void {
    this.toastService.remove(id)
  }
}
