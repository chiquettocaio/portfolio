import { inject, Injectable, signal } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { AvailableLanguages } from './translation-config.model'

import enTranslations from 'public/i18n/en-us.json'
import ptTranslations from 'public/i18n/pt-br.json'

@Injectable({ providedIn: 'root' })
export class TranslationConfigService {
  private translate = inject(TranslateService)

  currentLanguage = signal<AvailableLanguages>('en-us')

  constructor () {
    this.initializeI18n()
  }

  setLanguage (language: AvailableLanguages): void {
    this.updateAppLanguage(language)
    this.currentLanguage.set(language)
  }

  private updateAppLanguage (language: AvailableLanguages): void {
    this.translate.use(language)
  }

  private initializeI18n (): void {
    this.translate.setTranslation('en-us', enTranslations)
    this.translate.setTranslation('pt-br', ptTranslations)

    // Missing translations get translated into this language
    this.translate.setFallbackLang('en-us')

    this.updateAppLanguage(this.currentLanguage())
  }
}
