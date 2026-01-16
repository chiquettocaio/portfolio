import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

import enTranslations from '../../public/i18n/en.json'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App implements OnInit {
  private translate = inject(TranslateService)

  ngOnInit (): void {
    this.initializeI18n()
  }

  private initializeI18n (): void {
    this.translate.setTranslation('en', enTranslations)
  }
}
