import { Component, effect, inject, OnInit, signal } from '@angular/core'
import { InterpolationParameters, TranslatePipe, TranslateService } from '@ngx-translate/core'
import { BehaviorSubject, filter, shareReplay, take, tap } from 'rxjs'
import { TranslationConfigService } from '../../../services/translation/translation.service'
import { ClickableIconComponent } from '../../../shared/components/clickable-icon/clickable-icon.component'
import { ClickableIconData } from '../../../shared/components/clickable-icon/clickable-icon.model'
import { ResumeSectionComponent } from './components/resume-section/resume-section.component'
import { ResumeSectionCareerExperience, ResumeSectionEducationExperience, ResumeSectionIcon } from './components/resume-section/resume-section.model'

@Component({
  selector: 'app-resume',
  imports: [TranslatePipe, ResumeSectionComponent, ClickableIconComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent implements OnInit {
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

  downloadResumeIconData = signal<ClickableIconData | null>(null)

  haveTranslationsBeenLoaded = signal<boolean>(false)

  constructor () {
    effect(() => {
      this.translationConfigService.currentLanguage()
      this.translateResume()
    })
  }

  ngOnInit (): void {
    this.translateResume()
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

    this.downloadResumeIconData.set({
      button: {
        title: translations[`${resumeBasePath}.downloadResumeCta`].buttonTitle,
        ariaLabel: translations[`${resumeBasePath}.downloadResumeCta`].buttonAriaLabel
      },

      icon: {
        name: 'phosphorFileArrowDown',
        ariaLabel: translations[`${resumeBasePath}.downloadResumeCta`].iconAriaLabel
      }
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
          translations[`${careerBasePath}.technologies`].spartacus,
          translations[`${careerBasePath}.technologies`].angular,
          translations[`${careerBasePath}.technologies`].typescript,
          translations[`${careerBasePath}.technologies`].rxjs,
          translations[`${careerBasePath}.technologies`].ngrx,
          translations[`${careerBasePath}.technologies`].jasmine,
          translations[`${careerBasePath}.technologies`].sass,
          translations[`${careerBasePath}.technologies`].html,
          translations[`${careerBasePath}.technologies`].css,
          translations[`${careerBasePath}.technologies`].javascript,
          translations[`${careerBasePath}.concepts`].oop,
          translations[`${careerBasePath}.concepts`].commerce,
          translations[`${careerBasePath}.concepts`].sapCX
        ],
        isEducation: false
      }, {
        company: translations[`${careerBasePath}.wam`].companyName,
        title: translations[`${careerBasePath}.wam`].role,
        period: translations[`${careerBasePath}.wam`].period,
        location: translations[`${careerBasePath}.wam`].location,
        responsibilities: Object.values(translations[`${careerBasePath}.wam`].responsibilities),
        technologies: [
          translations[`${careerBasePath}.technologies`].spartacus,
          translations[`${careerBasePath}.technologies`].angular,
          translations[`${careerBasePath}.technologies`].cdc,
          translations[`${careerBasePath}.technologies`].typescript,
          translations[`${careerBasePath}.technologies`].rxjs,
          translations[`${careerBasePath}.technologies`].ngrx,
          translations[`${careerBasePath}.technologies`].jasmine,
          translations[`${careerBasePath}.technologies`].sass,
          translations[`${careerBasePath}.technologies`].html,
          translations[`${careerBasePath}.technologies`].css,
          translations[`${careerBasePath}.technologies`].javascript,
          translations[`${careerBasePath}.concepts`].oop,
          translations[`${careerBasePath}.concepts`].commerce,
          translations[`${careerBasePath}.concepts`].sapCX
        ],
        isEducation: false
      }, {
        company: translations[`${careerBasePath}.discover`].companyName,
        title: translations[`${careerBasePath}.discover`].role,
        period: translations[`${careerBasePath}.discover`].period,
        location: translations[`${careerBasePath}.discover`].location,
        responsibilities: Object.values(translations[`${careerBasePath}.discover`].responsibilities),
        technologies: [
          translations[`${careerBasePath}.technologies`].spartacus,
          translations[`${careerBasePath}.technologies`].angular,
          translations[`${careerBasePath}.technologies`].cdc,
          translations[`${careerBasePath}.technologies`].typescript,
          translations[`${careerBasePath}.technologies`].rxjs,
          translations[`${careerBasePath}.technologies`].ngrx,
          translations[`${careerBasePath}.technologies`].jasmine,
          translations[`${careerBasePath}.technologies`].sass,
          translations[`${careerBasePath}.technologies`].html,
          translations[`${careerBasePath}.technologies`].css,
          translations[`${careerBasePath}.technologies`].javascript,
          translations[`${careerBasePath}.concepts`].oop,
          translations[`${careerBasePath}.concepts`].commerce,
          translations[`${careerBasePath}.concepts`].sapCX
        ],
        isEducation: false
      }, {
        company: translations[`${careerBasePath}.accenture-lead`].companyName,
        title: translations[`${careerBasePath}.accenture-lead`].role,
        period: translations[`${careerBasePath}.accenture-lead`].period,
        location: translations[`${careerBasePath}.accenture-lead`].location,
        responsibilities: Object.values(translations[`${careerBasePath}.accenture-lead`].responsibilities),
        technologies: [
          translations[`${careerBasePath}.technologies`].spartacus,
          translations[`${careerBasePath}.technologies`].angular,
          translations[`${careerBasePath}.technologies`].typescript,
          translations[`${careerBasePath}.technologies`].rxjs,
          translations[`${careerBasePath}.technologies`].ngrx,
          translations[`${careerBasePath}.technologies`].jasmine,
          translations[`${careerBasePath}.technologies`].sass,
          translations[`${careerBasePath}.technologies`].html,
          translations[`${careerBasePath}.technologies`].css,
          translations[`${careerBasePath}.technologies`].javascript,
          translations[`${careerBasePath}.concepts`].oop,
          translations[`${careerBasePath}.concepts`].commerce,
          translations[`${careerBasePath}.concepts`].sapCX
        ],
        isEducation: false
      }, {
        company: translations[`${careerBasePath}.accenture-senior`].companyName,
        title: translations[`${careerBasePath}.accenture-senior`].role,
        period: translations[`${careerBasePath}.accenture-senior`].period,
        location: translations[`${careerBasePath}.accenture-senior`].location,
        responsibilities: Object.values(translations[`${careerBasePath}.accenture-senior`].responsibilities),
        technologies: [
          translations[`${careerBasePath}.technologies`].vue,
          translations[`${careerBasePath}.technologies`].nuxt,
          translations[`${careerBasePath}.technologies`].vuex,
          translations[`${careerBasePath}.technologies`].javascript,
          translations[`${careerBasePath}.technologies`].nodejs,
          translations[`${careerBasePath}.technologies`].jest,
          translations[`${careerBasePath}.technologies`].css,
          translations[`${careerBasePath}.technologies`].sass,
          translations[`${careerBasePath}.concepts`].oop
        ],
        isEducation: false
      }, {
        company: translations[`${careerBasePath}.amadre`].companyName,
        title: translations[`${careerBasePath}.amadre`].role,
        period: translations[`${careerBasePath}.amadre`].period,
        location: translations[`${careerBasePath}.amadre`].location,
        responsibilities: Object.values(translations[`${careerBasePath}.amadre`].responsibilities),
        technologies: [
          translations[`${careerBasePath}.technologies`].vue,
          translations[`${careerBasePath}.technologies`].vuex,
          translations[`${careerBasePath}.technologies`].react,
          translations[`${careerBasePath}.technologies`].redux,
          translations[`${careerBasePath}.technologies`].electron,
          translations[`${careerBasePath}.technologies`].javascript,
          translations[`${careerBasePath}.technologies`].nodejs,
          translations[`${careerBasePath}.technologies`].adonis,
          translations[`${careerBasePath}.technologies`].webpack,
          translations[`${careerBasePath}.technologies`].postgre,
          translations[`${careerBasePath}.technologies`].docker,
          translations[`${careerBasePath}.technologies`].html,
          translations[`${careerBasePath}.technologies`].css,
          translations[`${careerBasePath}.technologies`].sass,
          translations[`${careerBasePath}.technologies`].java,
          translations[`${careerBasePath}.technologies`].websocket,
          translations[`${careerBasePath}.technologies`].mongo,
          translations[`${careerBasePath}.technologies`].redis,
          translations[`${careerBasePath}.concepts`].oop
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
      `${resumeBasePath}.capIcon.ariaLabel`,
      `${resumeBasePath}.downloadResumeCta`,

      `${educationBasePath}.universityName`,
      `${educationBasePath}.degree`,
      `${educationBasePath}.period`,
      `${educationBasePath}.location`,
      `${educationBasePath}.icon.ariaLabel`,

      `${careerBasePath}.icons`,
      `${careerBasePath}.technologies`,
      `${careerBasePath}.concepts`,
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
