import { Component, effect, inject, signal } from '@angular/core'
import { TranslationConfigService } from '@app/services/translation-config/translation-config.service'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { InterpolationParameters, TranslatePipe, TranslateService } from '@ngx-translate/core'
import { Observable, take, tap } from 'rxjs'
import { ProjectComponent } from './components/project/project.component'
import { CareerProject } from './components/project/project.model'

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, ProjectComponent, AnchorComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private translationConfigService = inject(TranslationConfigService)
  private translateService = inject(TranslateService)

  projects = signal<CareerProject[]>([])

  constructor () {
    effect(() => {
      this.translationConfigService.currentLanguage()
      this.getProjectsTranslation()
    })
  }

  private getProjectsTranslation (): void {
    const projectsBasePath = 'home.projects.projects'

    this.translateProjects().pipe(
      tap(translations => {
        this.projects.set([{
          title: translations[`${projectsBasePath}.carhartt`].title,
          description: translations[`${projectsBasePath}.carhartt`].description,
          techs: [
            translations['common.technologies'].sapCommerce,
            translations['common.technologies'].spartacus,
            translations['common.technologies'].cdc,
            translations['common.technologies'].angular,
            translations['common.technologies'].typescript,
            translations['common.technologies'].rxjs,
            translations['common.technologies'].ngrx,
            translations['common.technologies'].jasmine,
            translations['common.technologies'].sass,
            translations['common.technologies'].html,
            translations['common.technologies'].css,
            translations['common.technologies'].javascript,
            translations['common.concepts'].oop,
            translations['common.concepts'].commerce,
            translations['common.concepts'].sapCX
          ],
          thumb: {
            src: 'images/carhartt.png',
            alt: translations[`${projectsBasePath}.carhartt`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.vivo`].title,
          description: translations[`${projectsBasePath}.vivo`].description,
          techs: [
            translations['common.technologies'].sapCommerce,
            translations['common.technologies'].spartacus,
            translations['common.technologies'].angular,
            translations['common.technologies'].typescript,
            translations['common.technologies'].rxjs,
            translations['common.technologies'].ngrx,
            translations['common.technologies'].jasmine,
            translations['common.technologies'].sass,
            translations['common.technologies'].html,
            translations['common.technologies'].css,
            translations['common.technologies'].javascript,
            translations['common.concepts'].oop,
            translations['common.concepts'].commerce,
            translations['common.concepts'].sapCX
          ],
          thumb: {
            src: 'images/vivo.png',
            alt: translations[`${projectsBasePath}.vivo`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.leap`].title,
          description: translations[`${projectsBasePath}.leap`].description,
          techs: [
            translations['common.technologies'].sapCommerce,
            translations['common.technologies'].spartacus,
            translations['common.technologies'].angular,
            translations['common.technologies'].typescript,
            translations['common.technologies'].rxjs,
            translations['common.technologies'].ngrx,
            translations['common.technologies'].jasmine,
            translations['common.technologies'].sass,
            translations['common.technologies'].html,
            translations['common.technologies'].css,
            translations['common.technologies'].javascript,
            translations['common.concepts'].oop,
            translations['common.concepts'].commerce,
            translations['common.concepts'].sapCX
          ],
          thumb: {
            src: 'images/leap.png',
            alt: translations[`${projectsBasePath}.leap`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.alliage`].title,
          description: translations[`${projectsBasePath}.alliage`].description,
          techs: [
            translations['common.technologies'].sapCommerce,
            translations['common.technologies'].javascript,
            translations['common.technologies'].jsp,
            translations['common.technologies'].html,
            translations['common.technologies'].less,
            translations['common.technologies'].css,
            translations['common.concepts'].oop,
            translations['common.concepts'].commerce,
            translations['common.concepts'].sapCX
          ],
          thumb: {
            src: 'images/alliage.png',
            alt: translations[`${projectsBasePath}.alliage`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.ml`].title,
          description: translations[`${projectsBasePath}.ml`].description,
          techs: [
            translations['common.technologies'].sapCommerce,
            translations['common.technologies'].spartacus,
            translations['common.technologies'].angular,
            translations['common.technologies'].typescript,
            translations['common.technologies'].rxjs,
            translations['common.technologies'].ngrx,
            translations['common.technologies'].jasmine,
            translations['common.technologies'].sass,
            translations['common.technologies'].html,
            translations['common.technologies'].css,
            translations['common.technologies'].javascript,
            translations['common.concepts'].oop,
            translations['common.concepts'].commerce,
            translations['common.concepts'].sapCX
          ],
          thumb: {
            src: 'images/mercadolivre.png',
            alt: translations[`${projectsBasePath}.ml`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.teams`].title,
          description: translations[`${projectsBasePath}.teams`].description,
          techs: [
            translations['common.technologies'].angular,
            translations['common.technologies'].typescript,
            translations['common.technologies'].rxjs,
            translations['common.technologies'].ngrx,
            translations['common.technologies'].sass,
            translations['common.technologies'].jasmine,
            translations['common.technologies'].karma,
            translations['common.technologies'].html,
            translations['common.technologies'].css,
            translations['common.technologies'].javascript,
            translations['common.concepts'].oop
          ],
          thumb: {
            src: 'images/teams.png',
            alt: translations[`${projectsBasePath}.teams`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.finances`].title,
          description: translations[`${projectsBasePath}.finances`].description,
          techs: [
            translations['common.technologies'].react,
            translations['common.technologies'].nodejs,
            translations['common.technologies'].docker,
            translations['common.technologies'].mongo,
            translations['common.technologies'].websocket,
            translations['common.technologies'].redux,
            translations['common.technologies'].javascript,
            translations['common.technologies'].css,
            translations['common.technologies'].html,
            translations['common.concepts'].fullStack,
            translations['common.concepts'].mern,
            translations['common.concepts'].oop,
            translations['common.technologies'].figma,
            translations['common.concepts'].prototyping
          ],
          thumb: {
            src: 'images/finances-room.png',
            alt: translations[`${projectsBasePath}.finances`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.elderly`].title,
          description: translations[`${projectsBasePath}.elderly`].description,
          techs: [
            translations['common.technologies'].react,
            translations['common.technologies'].nodejs,
            translations['common.technologies'].redux,
            translations['common.technologies'].javascript,
            translations['common.technologies'].css,
            translations['common.technologies'].html,
            translations['common.technologies'].figma,
            translations['common.concepts'].prototyping
          ],
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
      'common.technologies',
      'common.concepts',
      `${projectsBasePath}.carhartt`,
      `${projectsBasePath}.vivo`,
      `${projectsBasePath}.leap`,
      `${projectsBasePath}.alliage`,
      `${projectsBasePath}.ml`,
      `${projectsBasePath}.teams`,
      `${projectsBasePath}.finances`,
      `${projectsBasePath}.elderly`
    ]).pipe(take(1))
  }
}
