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
          role: translations[`${projectsBasePath}.carhartt`].role,
          techs: [
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
            src: 'images/carhartt.png',
            alt: translations[`${projectsBasePath}.carhartt`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.vivo`].title,
          description: translations[`${projectsBasePath}.vivo`].description,
          role: translations[`${projectsBasePath}.vivo`].role,
          techs: [
            translations['common.technologies'].spartacus,
            translations['common.technologies'].angular,
            translations['common.technologies'].cdc,
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
          title: translations[`${projectsBasePath}.ml`].title,
          description: translations[`${projectsBasePath}.ml`].description,
          role: translations[`${projectsBasePath}.ml`].role,
          techs: [
            translations['common.technologies'].spartacus,
            translations['common.technologies'].angular,
            translations['common.technologies'].cdc,
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
          role: translations[`${projectsBasePath}.teams`].role,
          techs: [
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
            src: 'images/teams.png',
            alt: translations[`${projectsBasePath}.teams`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.finances`].title,
          description: translations[`${projectsBasePath}.finances`].description,
          role: translations[`${projectsBasePath}.finances`].role,
          techs: [
            translations['common.technologies'].vue,
            translations['common.technologies'].nuxt,
            translations['common.technologies'].vuex,
            translations['common.technologies'].javascript,
            translations['common.technologies'].nodejs,
            translations['common.technologies'].jest,
            translations['common.technologies'].css,
            translations['common.technologies'].sass,
            translations['common.concepts'].oop
          ],
          thumb: {
            src: 'images/finances-room.png',
            alt: translations[`${projectsBasePath}.finances`].thumbAlt
          }
        }, {
          title: translations[`${projectsBasePath}.elderly`].title,
          description: translations[`${projectsBasePath}.elderly`].description,
          role: translations[`${projectsBasePath}.elderly`].role,
          techs: [
            translations['common.technologies'].vue,
            translations['common.technologies'].vuex,
            translations['common.technologies'].react,
            translations['common.technologies'].redux,
            translations['common.technologies'].electron,
            translations['common.technologies'].javascript,
            translations['common.technologies'].nodejs,
            translations['common.technologies'].adonis,
            translations['common.technologies'].webpack,
            translations['common.technologies'].postgre,
            translations['common.technologies'].docker,
            translations['common.technologies'].html,
            translations['common.technologies'].css,
            translations['common.technologies'].sass,
            translations['common.technologies'].java,
            translations['common.technologies'].websocket,
            translations['common.technologies'].mongo,
            translations['common.technologies'].redis,
            translations['common.concepts'].oop
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
      `${projectsBasePath}.vivo`,
      `${projectsBasePath}.ml`,
      `${projectsBasePath}.carhartt`,
      `${projectsBasePath}.teams`,
      `${projectsBasePath}.finances`,
      `${projectsBasePath}.elderly`
    ]).pipe(take(1))
  }
}
