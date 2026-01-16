import { Component } from '@angular/core'
import { AboutComponent } from './sections/about/about.component'
import { HeroComponent } from './sections/hero/hero.component'
import { ProjectsComponent } from './sections/projects/projects.component'
import { ResumeComponent } from './sections/resume/resume.component'

@Component({
  selector: 'app-home',
  imports: [HeroComponent, AboutComponent, ResumeComponent, ProjectsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
