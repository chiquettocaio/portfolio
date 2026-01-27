import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { IconComponent } from '@app/shared/components/icon/icon.component'
import { TranslatePipe } from '@ngx-translate/core'
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
export class ContactComponent {
}
