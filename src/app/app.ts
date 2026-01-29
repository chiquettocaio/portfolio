import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HomeService } from './home/services/home-service/home.service'
import { TranslationConfigService } from './services/translation-config/translation-config.service'
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component'
import { ToastComponent } from './shared/components/toast/toast.component'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavMenuComponent,
    ToastComponent
  ],
  templateUrl: './app.html'
})
export class App {
  private translationConfigService = inject(TranslationConfigService)
  private homeService = inject(HomeService)

  haveSectionsBeenLoaded = this.homeService.haveSectionsBeenLoaded
}
