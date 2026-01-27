import { Component, inject, Signal } from '@angular/core'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { TranslatePipe } from '@ngx-translate/core'
import { ProjectComponent } from './components/project/project.component'
import { CareerProject } from './components/project/project.model'
import { ProjectsService } from './services/projects/projects.service'

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, ProjectComponent, AnchorComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService)

  projects: Signal<CareerProject[]> = this.projectsService.projects
}
