import { effect, inject, Injectable, signal } from '@angular/core'
import { TranslationConfigService } from '@app/services/translation-config/translation-config.service'
import { InterpolationParameters, TranslateService } from '@ngx-translate/core'
import { filter, take, tap } from 'rxjs'
import { CareerProject } from '../../components/project/project.model'

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private translateService = inject(TranslateService)
  private translationConfigService = inject(TranslationConfigService)

  private I18N_PROJECTS_PATH = 'home.projects.projects'

  projects = signal<CareerProject[]>([])

  constructor () {
    effect(() => {
      this.translationConfigService.currentLanguage()
      this.getProjectsTranslation()
    })
  }

  private getProjectsTranslation (): void {
    this.translateService.get([
      'common.technologies',
      'common.concepts',
      `${this.I18N_PROJECTS_PATH}.ccg`,
      `${this.I18N_PROJECTS_PATH}.carhartt`,
      `${this.I18N_PROJECTS_PATH}.vivo`,
      `${this.I18N_PROJECTS_PATH}.leap`,
      `${this.I18N_PROJECTS_PATH}.alliage`,
      `${this.I18N_PROJECTS_PATH}.ml`,
      `${this.I18N_PROJECTS_PATH}.teams`,
      `${this.I18N_PROJECTS_PATH}.finances`,
      `${this.I18N_PROJECTS_PATH}.elderly`
    ]).pipe(
      take(1),
      filter(translations => !!translations[`${this.I18N_PROJECTS_PATH}.ccg`]?.title),
      tap(translations => this.buildProjects(translations))
    ).subscribe()
  }

  private buildProjects (translations: InterpolationParameters): void {
    const ccg = this.getCcgTranslations(translations)
    const carhartt = this.getCarharttTranslations(translations)
    const vivo = this.getVivoTranslations(translations)
    const leap = this.getLeapTranslations(translations)
    const alliage = this.getAlliageTranslations(translations)
    const ml = this.getMercadoLibreTranslations(translations)
    const teams = this.getTeamsTranslations(translations)
    const finance = this.getFinanceTranslations(translations)
    const aprenda = this.getAprendaTranslations(translations)

    this.projects.set([
      ccg, carhartt, vivo,
      leap, alliage, ml,
      teams, finance, aprenda
    ])
  }

  private getCcgTranslations (translations: InterpolationParameters): CareerProject {
    return {
      title: translations[`${this.I18N_PROJECTS_PATH}.ccg`].title,
      description: translations[`${this.I18N_PROJECTS_PATH}.ccg`].description,
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
        src: 'images/ccg-small.png',
        alt: translations[`${this.I18N_PROJECTS_PATH}.ccg`].thumbAlt
      }
    }
  }

  private getCarharttTranslations (translations: InterpolationParameters): CareerProject {
    return {
      title: translations[`${this.I18N_PROJECTS_PATH}.carhartt`].title,
      description: translations[`${this.I18N_PROJECTS_PATH}.carhartt`].description,
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
        src: 'images/carhartt-small.png',
        alt: translations[`${this.I18N_PROJECTS_PATH}.carhartt`].thumbAlt
      }
    }
  }

  private getVivoTranslations (translations: InterpolationParameters): CareerProject {
    return {
      title: translations[`${this.I18N_PROJECTS_PATH}.leap`].title,
      description: translations[`${this.I18N_PROJECTS_PATH}.vivo`].description,
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
        src: 'images/vivo-small.png',
        alt: translations[`${this.I18N_PROJECTS_PATH}.vivo`].thumbAlt
      }
    }
  }

  private getLeapTranslations (translations: InterpolationParameters): CareerProject {
    return {
      title: translations[`${this.I18N_PROJECTS_PATH}.leap`].title,
      description: translations[`${this.I18N_PROJECTS_PATH}.leap`].description,
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
        src: 'images/leap-small.png',
        alt: translations[`${this.I18N_PROJECTS_PATH}.leap`].thumbAlt
      }
    }
  }

  private getAlliageTranslations (translations: InterpolationParameters): CareerProject {
    return {
      title: translations[`${this.I18N_PROJECTS_PATH}.alliage`].title,
      description: translations[`${this.I18N_PROJECTS_PATH}.alliage`].description,
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
        src: 'images/alliage-small.png',
        alt: translations[`${this.I18N_PROJECTS_PATH}.alliage`].thumbAlt
      }
    }
  }

  private getMercadoLibreTranslations (translations: InterpolationParameters): CareerProject {
    return {
      title: translations[`${this.I18N_PROJECTS_PATH}.ml`].title,
      description: translations[`${this.I18N_PROJECTS_PATH}.ml`].description,
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
        src: 'images/mercadolivre-small.png',
        alt: translations[`${this.I18N_PROJECTS_PATH}.ml`].thumbAlt
      }
    }
  }

  private getTeamsTranslations (translations: InterpolationParameters): CareerProject {
    return {
      title: translations[`${this.I18N_PROJECTS_PATH}.teams`].title,
      description: translations[`${this.I18N_PROJECTS_PATH}.teams`].description,
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
        src: 'images/teams-small.png',
        alt: translations[`${this.I18N_PROJECTS_PATH}.teams`].thumbAlt
      }
    }
  }

  private getFinanceTranslations (translations: InterpolationParameters): CareerProject {
    return {
      title: translations[`${this.I18N_PROJECTS_PATH}.finances`].title,
      description: translations[`${this.I18N_PROJECTS_PATH}.finances`].description,
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
        src: 'images/finances-room-small.png',
        alt: translations[`${this.I18N_PROJECTS_PATH}.finances`].thumbAlt
      }
    }
  }

  private getAprendaTranslations (translations: InterpolationParameters): CareerProject {
    return {
      title: translations[`${this.I18N_PROJECTS_PATH}.elderly`].title,
      description: translations[`${this.I18N_PROJECTS_PATH}.elderly`].description,
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
        src: 'images/aprenda-elderly-small.png',
        alt: translations[`${this.I18N_PROJECTS_PATH}.elderly`].thumbAlt
      }
    }
  }
}
