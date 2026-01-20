import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TranslationConfigService } from './services/translation/translation.service'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App {
  private translationConfigService = inject(TranslationConfigService)
}
