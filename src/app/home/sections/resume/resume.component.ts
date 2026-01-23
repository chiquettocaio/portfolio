import { Component, effect, inject, signal } from '@angular/core'
import { TranslationConfigService } from '@app/services/translation-config/translation-config.service'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { IconComponent } from '@app/shared/components/icon/icon.component'
import { InterpolationParameters, TranslatePipe, TranslateService } from '@ngx-translate/core'
import { BehaviorSubject, filter, shareReplay, take, tap } from 'rxjs'
import { ResumeSectionComponent } from './components/resume-section/resume-section.component'
import { ResumeSectionCareerExperience, ResumeSectionEducationExperience, ResumeSectionIcon } from './components/resume-section/resume-section.model'

@Component({
  selector: 'app-resume',
  imports: [
    TranslatePipe,

    ResumeSectionComponent,
    AnchorComponent,
    IconComponent
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  private translationConfigService = inject(TranslationConfigService)
  private translateService = inject(TranslateService)

  resumeTranslationsSubj$ = new BehaviorSubject<InterpolationParameters>({})
  resumeTranslations$ = this.resumeTranslationsSubj$.asObservable().pipe(
    filter(translations => !!Object.keys(translations).length),
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  )

  educationSectionIcon = signal<ResumeSectionIcon | null>(null)
  educationSectionContent = signal<ResumeSectionEducationExperience[] | null>(null)

  careerSectionIcon = signal<ResumeSectionIcon | null>(null)
  careerSectionContent = signal<ResumeSectionCareerExperience[] | null>(null)

  haveTranslationsBeenLoaded = signal<boolean>(false)

  constructor () {
    effect(() => {
      this.translationConfigService.currentLanguage()
      this.translateResume()
    })
  }

  private translateResume (): void {
    this.getResumeTranslations()
    this.configResumeTranslations()
  }

  private configResumeTranslations (): void {
    this.resumeTranslations$.pipe(
      tap(translations => {
        this.configEducationSection(translations)
        this.configCareerSection(translations)
        this.configIcons(translations)
        this.haveTranslationsBeenLoaded.set(true)
      })
    ).subscribe()
  }

  private configEducationSection (translations: InterpolationParameters): void {
    const resumeBasePath: string = 'home.resume'

    this.educationSectionContent.set([
      {
        title: translations[`${resumeBasePath}.education.universityName`],
        degree: translations[`${resumeBasePath}.education.degree`],
        period: translations[`${resumeBasePath}.education.period`],
        location: translations[`${resumeBasePath}.education.location`],
        isEducation: true
      }
    ])

    this.educationSectionIcon.set({
      name: 'phosphorGraduationCap',
      ariaLabel: translations[`${resumeBasePath}.capIcon.ariaLabel`]
    })
  }

  private configIcons (translations: InterpolationParameters): void {
    const resumeBasePath: string = 'home.resume'
    const careerBasePath: string = `${resumeBasePath}.career`

    this.educationSectionIcon.set({
      name: 'phosphorGraduationCap',
      ariaLabel: translations[`${resumeBasePath}.capIcon.ariaLabel`]
    })

    this.careerSectionIcon.set({
      name: 'phosphorDesktop',
      ariaLabel: translations[`${careerBasePath}.icons`].desktopIconAriaLabel
    })
  }

  private configCareerSection (translations: InterpolationParameters): void {
    const resumeBasePath: string = 'home.resume'
    const careerBasePath: string = `${resumeBasePath}.career`

    this.careerSectionContent.set([
      {
        company: translations[`${careerBasePath}.k2`].companyName,
        title: translations[`${careerBasePath}.k2`].role,
        period: translations[`${careerBasePath}.k2`].period,
        location: translations[`${careerBasePath}.k2`].location,
        responsibilities: Object.values(translations[`${careerBasePath}.k2`].responsibilities),
        technologies: [
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
        isEducation: false
      }, {
        company: translations[`${careerBasePath}.wam`].companyName,
        title: translations[`${careerBasePath}.wam`].role,
        period: translations[`${careerBasePath}.wam`].period,
        location: translations[`${careerBasePath}.wam`].location,
        responsibilities: Object.values(translations[`${careerBasePath}.wam`].responsibilities),
        technologies: [
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
        isEducation: false
      }, {
        company: translations[`${careerBasePath}.discover`].companyName,
        title: translations[`${careerBasePath}.discover`].role,
        period: translations[`${careerBasePath}.discover`].period,
        location: translations[`${careerBasePath}.discover`].location,
        responsibilities: Object.values(translations[`${careerBasePath}.discover`].responsibilities),
        technologies: [
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
        isEducation: false
      }, {
        company: translations[`${careerBasePath}.accenture-lead`].companyName,
        title: translations[`${careerBasePath}.accenture-lead`].role,
        period: translations[`${careerBasePath}.accenture-lead`].period,
        location: translations[`${careerBasePath}.accenture-lead`].location,
        responsibilities: Object.values(translations[`${careerBasePath}.accenture-lead`].responsibilities),
        technologies: [
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
        isEducation: false
      }, {
        company: translations[`${careerBasePath}.accenture-senior`].companyName,
        title: translations[`${careerBasePath}.accenture-senior`].role,
        period: translations[`${careerBasePath}.accenture-senior`].period,
        location: translations[`${careerBasePath}.accenture-senior`].location,
        responsibilities: Object.values(translations[`${careerBasePath}.accenture-senior`].responsibilities),
        technologies: [
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
        isEducation: false
      }, {
        company: translations[`${careerBasePath}.amadre`].companyName,
        title: translations[`${careerBasePath}.amadre`].role,
        period: translations[`${careerBasePath}.amadre`].period,
        location: translations[`${careerBasePath}.amadre`].location,
        responsibilities: Object.values(translations[`${careerBasePath}.amadre`].responsibilities),
        technologies: [
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
        isEducation: false
      }
    ])
  }

  private getResumeTranslations (): void {
    const resumeBasePath: string = 'home.resume'
    const careerBasePath: string = `${resumeBasePath}.career`
    const educationBasePath: string = `${resumeBasePath}.education`

    this.translateService.get([
      'common.technologies',
      'common.concepts',

      `${resumeBasePath}.capIcon.ariaLabel`,

      `${educationBasePath}.universityName`,
      `${educationBasePath}.degree`,
      `${educationBasePath}.period`,
      `${educationBasePath}.location`,
      `${educationBasePath}.icon.ariaLabel`,

      `${careerBasePath}.icons`,
      `${careerBasePath}.k2`,
      `${careerBasePath}.wam`,
      `${careerBasePath}.discover`,
      `${careerBasePath}.accenture-lead`,
      `${careerBasePath}.accenture-senior`,
      `${careerBasePath}.amadre`
    ]).pipe(
      take(1),
      tap(translations => this.resumeTranslationsSubj$.next(translations))
    ).subscribe()
  }
}
