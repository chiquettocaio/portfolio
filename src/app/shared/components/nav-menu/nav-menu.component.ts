import { AsyncPipe } from '@angular/common'
import { Component, DOCUMENT, inject, signal } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { fromEvent, tap, throttleTime } from 'rxjs'
import { TranslationConfigService } from '../../../services/translation-config/translation-config.service'
import { IconComponent } from '../icon/icon.component'

@Component({
  selector: 'app-nav-menu',
  imports: [IconComponent, TranslatePipe, AsyncPipe],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  private document = inject(DOCUMENT)
  private translationConfigService = inject(TranslationConfigService)

  TOP_DISTANCE_TO_MOVE_DOWN: number = 200

  activeLink = signal<string>('hero')
  navBottom = signal<boolean>(false)
  windowHeight = signal<number>(0)

  scroller$ = fromEvent(window, 'scroll').pipe(
    throttleTime(100, undefined, {
      leading: true,
      trailing: true
    }),
    tap(() => this.handleScroll())
  )

  currentLanguage = this.translationConfigService.currentLanguage

  activateLink (link: string): void {
    this.activeLink.set(link)
  }

  switchLanguage (): void {
    const nextLang = this.currentLanguage() === 'pt-br'
      ? 'en-us'
      : 'pt-br'

    this.translationConfigService.setLanguage(nextLang)
  }

  private handleScroll (): void {
    const scrollTop = this.document.documentElement?.scrollTop ?? 0

    this.navBottom.set(scrollTop > this.TOP_DISTANCE_TO_MOVE_DOWN)
  }
}
