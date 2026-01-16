import { Component, inject, OnInit, signal } from '@angular/core'
import { InterpolationParameters, TranslatePipe, TranslateService } from '@ngx-translate/core'
import { Observable, take, tap } from 'rxjs'
import { ButtonComponent } from '../../../shared/components/button/button.component'
import { ProjectComponent } from './components/project/project.component'
import { CareerProject } from './components/project/project.model'

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, ProjectComponent, ButtonComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  private translateService = inject(TranslateService)

  projects = signal<CareerProject[]>([])

  ngOnInit (): void {
    this.getProjectsTranslation()
  }

  private getProjectsTranslation (): void {
    const projectsBasePath = 'home.projects.projects'

    this.translateProjects().pipe(
      tap(translations => {
        this.projects.set([{
          title: translations[`${projectsBasePath}.carhartt`].title,
          description: translations[`${projectsBasePath}.carhartt`].description,
          role: translations[`${projectsBasePath}.carhartt`].role,
          thumb: {
            src: 'images/carhartt.png',
            alt: translations[`${projectsBasePath}.carhartt`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.vivo`].title,
          description: translations[`${projectsBasePath}.vivo`].description,
          role: translations[`${projectsBasePath}.vivo`].role,
          thumb: {
            src: 'images/vivo.png',
            alt: translations[`${projectsBasePath}.vivo`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.ml`].title,
          description: translations[`${projectsBasePath}.ml`].description,
          role: translations[`${projectsBasePath}.ml`].role,
          thumb: {
            src: 'images/mercadolivre.png',
            alt: translations[`${projectsBasePath}.ml`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.teams`].title,
          description: translations[`${projectsBasePath}.teams`].description,
          role: translations[`${projectsBasePath}.teams`].role,
          thumb: {
            src: 'images/teams.png',
            alt: translations[`${projectsBasePath}.teams`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.finances`].title,
          description: translations[`${projectsBasePath}.finances`].description,
          role: translations[`${projectsBasePath}.finances`].role,
          thumb: {
            src: 'images/finances-room.png',
            alt: translations[`${projectsBasePath}.finances`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.elderly`].title,
          description: translations[`${projectsBasePath}.elderly`].description,
          role: translations[`${projectsBasePath}.elderly`].role,
          thumb: {
            src: 'images/aprenda-elderly.png',
            alt: translations[`${projectsBasePath}.elderly`].thumbAlt
          }
        }
        ])
      })
    ).subscribe()
  }

  private translateProjects (): Observable<InterpolationParameters> {
    const projectsBasePath = 'home.projects.projects'

    return this.translateService.get([
      `${projectsBasePath}.vivo`,
      `${projectsBasePath}.ml`,
      `${projectsBasePath}.carhartt`,
      `${projectsBasePath}.teams`,
      `${projectsBasePath}.finances`,
      `${projectsBasePath}.elderly`
    ]).pipe(take(1))
  }
}
