import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AboutComponent } from './sections/about/about.component'
import { ContactComponent } from './sections/contact/contact.component'
import { HeroComponent } from './sections/hero/hero.component'
import { ProjectsComponent } from './sections/projects/projects.component'
import { ResumeComponent } from './sections/resume/resume.component'
import { HomeService } from './services/home-service/home.service'

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    AboutComponent,
    ResumeComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  private homeService = inject(HomeService)

  ngAfterViewInit (): void {
    this.homeService.setHaveSectionsBeenLoaded(true)
  }
}
