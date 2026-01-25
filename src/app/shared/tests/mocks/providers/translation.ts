import { provideTranslateService } from '@ngx-translate/core'

export const MockTranslationProvider = provideTranslateService({
  fallbackLang: 'en',
  lang: 'en'
})
