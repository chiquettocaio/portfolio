import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NavMenuComponent } from '@app/shared/components/nav-menu/nav-menu.component'
import { AboutComponent } from './sections/about/about.component'
import { ContactComponent } from './sections/contact/contact.component'
import { HeroComponent } from './sections/hero/hero.component'
import { ProjectsComponent } from './sections/projects/projects.component'
import { ResumeComponent } from './sections/resume/resume.component'

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavMenuComponent,
    HeroComponent,
    AboutComponent,
    ResumeComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
