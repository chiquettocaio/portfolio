import { DatePipe, isPlatformBrowser } from '@angular/common'
import { AfterViewInit, Component, inject, PLATFORM_ID, signal } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { AnchorComponent } from '../anchor/anchor.component'
import { IconComponent } from '../icon/icon.component'

@Component({
  selector: 'app-footer',
  imports: [
    TranslatePipe,
    DatePipe,
    AnchorComponent,
    IconComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID)

  currDate = signal<Date | null>(null)

  ngAfterViewInit (): void {
    if (!isPlatformBrowser(this.platformId)) return

    this.getDate()
  }

  private getDate (): void {
    this.currDate.set(new Date())
  }
}
