import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HomeService } from './home/services/home-service/home.service'
import { TranslationConfigService } from './services/translation-config/translation-config.service'
import { LoaderComponent } from './shared/components/loader/loader.component'
import { LoaderService } from './shared/components/loader/services/loader.service'
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component'
import { ToastComponent } from './shared/components/toast/toast.component'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavMenuComponent,
    ToastComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private translationConfigService = inject(TranslationConfigService)
  private homeService = inject(HomeService)
  private loaderService = inject(LoaderService)

  haveSectionsBeenLoaded = this.homeService.haveSectionsBeenLoaded
  isLoaderVisible = this.loaderService.isVisible
}
