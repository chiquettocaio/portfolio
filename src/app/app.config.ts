import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideTranslateService } from '@ngx-translate/core'

import { provideHttpClient } from '@angular/common/http'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en'
    }),
    provideClientHydration(withEventReplay())
  ]
}
