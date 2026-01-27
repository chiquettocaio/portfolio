import { effect, inject, Injectable, signal } from '@angular/core'
import { TranslationConfigService } from '@app/services/translation-config/translation-config.service'
import { InterpolationParameters, TranslateService } from '@ngx-translate/core'
import { finalize, take, tap } from 'rxjs'
import { ResumeSectionCareerExperience, ResumeSectionEducationExperience, ResumeSectionIcon } from '../../components/resume-section/resume-section.model'

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private translateService = inject(TranslateService)
  private translationConfigService = inject(TranslationConfigService)

  private I18N_RESUME_PATH: string = 'home.resume'
  private I18N_CAREER_PATH: string = 'home.resume.career'
  private i18N_EDUCATION_PATH: string = 'home.resume.education'

  educationSectionIcon = signal<ResumeSectionIcon | null>(null)
  educationSectionContent = signal<ResumeSectionEducationExperience[] | null>(null)
  careerSectionIcon = signal<ResumeSectionIcon | null>(null)
  careerSectionContent = signal<ResumeSectionCareerExperience[] | null>(null)
  haveTranslationsBeenLoaded = signal<boolean>(false)

  constructor () {
    effect(() => {
      this.translationConfigService.currentLanguage()
      this.getResumeTranslations()
    })
  }

  private getResumeTranslations (): void {
    this.haveTranslationsBeenLoaded.set(false)

    this.translateService.get([
      'common.technologies',
      'common.concepts',

      `${this.I18N_RESUME_PATH}.capIcon.ariaLabel`,

      `${this.i18N_EDUCATION_PATH}.universityName`,
      `${this.i18N_EDUCATION_PATH}.degree`,
      `${this.i18N_EDUCATION_PATH}.period`,
      `${this.i18N_EDUCATION_PATH}.location`,
      `${this.i18N_EDUCATION_PATH}.icon.ariaLabel`,

      `${this.I18N_CAREER_PATH}.icons`,
      `${this.I18N_CAREER_PATH}.k2`,
      `${this.I18N_CAREER_PATH}.wam`,
      `${this.I18N_CAREER_PATH}.discover`,
      `${this.I18N_CAREER_PATH}.accenture-lead`,
      `${this.I18N_CAREER_PATH}.accenture-senior`,
      `${this.I18N_CAREER_PATH}.amadre`
    ]).pipe(
      take(1),
      tap(translations => this.configResumeTranslations(translations)),
      finalize(() => this.haveTranslationsBeenLoaded.set(true))
    ).subscribe()
  }

  private configResumeTranslations (translations: InterpolationParameters): void {
    this.configEducationSection(translations)
    this.configCareerSection(translations)
    this.configIcons(translations)
  }

  private configEducationSection (translations: InterpolationParameters): void {
    this.educationSectionContent.set([{
      title: translations[`${this.i18N_EDUCATION_PATH}.universityName`],
      degree: translations[`${this.i18N_EDUCATION_PATH}.degree`],
      period: translations[`${this.i18N_EDUCATION_PATH}.period`],
      location: translations[`${this.i18N_EDUCATION_PATH}.location`],
      isEducation: true
    }])

    this.educationSectionIcon.set({
      name: 'phosphorGraduationCap',
      ariaLabel: translations[`${this.I18N_RESUME_PATH}.capIcon.ariaLabel`]
    })
  }

  private configIcons (translations: InterpolationParameters): void {
    this.educationSectionIcon.set({
      name: 'phosphorGraduationCap',
      ariaLabel: translations[`${this.I18N_RESUME_PATH}.capIcon.ariaLabel`]
    })

    this.careerSectionIcon.set({
      name: 'phosphorDesktop',
      ariaLabel: translations[`${this.I18N_CAREER_PATH}.icons`].desktopIconAriaLabel
    })
  }

  private configCareerSection (translations: InterpolationParameters): void {
    const k2 = this.getK2Translations(translations)
    const wam = this.getWamTranslations(translations)
    const discover = this.getDiscoverTranslations(translations)
    const accLead = this.getAccLeadTranslations(translations)
    const accSenior = this.getAccSeniorTranslations(translations)
    const amadre = this.getMadreTranslations(translations)

    this.careerSectionContent.set([k2, wam, discover, accLead, accSenior, amadre])
  }

  private getK2Translations (translations: InterpolationParameters): ResumeSectionCareerExperience {
    return {
      company: translations[`${this.I18N_CAREER_PATH}.k2`].companyName,
      title: translations[`${this.I18N_CAREER_PATH}.k2`].role,
      period: translations[`${this.I18N_CAREER_PATH}.k2`].period,
      location: translations[`${this.I18N_CAREER_PATH}.k2`].location,
      responsibilities: Object.values(translations[`${this.I18N_CAREER_PATH}.k2`].responsibilities),
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
    }
  }

  private getWamTranslations (translations: InterpolationParameters): ResumeSectionCareerExperience {
    return {
      company: translations[`${this.I18N_CAREER_PATH}.wam`].companyName,
      title: translations[`${this.I18N_CAREER_PATH}.wam`].role,
      period: translations[`${this.I18N_CAREER_PATH}.wam`].period,
      location: translations[`${this.I18N_CAREER_PATH}.wam`].location,
      responsibilities: Object.values(translations[`${this.I18N_CAREER_PATH}.wam`].responsibilities),
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
    }
  }

  private getDiscoverTranslations (translations: InterpolationParameters): ResumeSectionCareerExperience {
    return {
      company: translations[`${this.I18N_CAREER_PATH}.discover`].companyName,
      title: translations[`${this.I18N_CAREER_PATH}.discover`].role,
      period: translations[`${this.I18N_CAREER_PATH}.discover`].period,
      location: translations[`${this.I18N_CAREER_PATH}.discover`].location,
      responsibilities: Object.values(translations[`${this.I18N_CAREER_PATH}.discover`].responsibilities),
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
    }
  }

  private getAccLeadTranslations (translations: InterpolationParameters): ResumeSectionCareerExperience {
    return {
      company: translations[`${this.I18N_CAREER_PATH}.accenture-lead`].companyName,
      title: translations[`${this.I18N_CAREER_PATH}.accenture-lead`].role,
      period: translations[`${this.I18N_CAREER_PATH}.accenture-lead`].period,
      location: translations[`${this.I18N_CAREER_PATH}.accenture-lead`].location,
      responsibilities: Object.values(translations[`${this.I18N_CAREER_PATH}.accenture-lead`].responsibilities),
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
    }
  }

  private getAccSeniorTranslations (translations: InterpolationParameters): ResumeSectionCareerExperience {
    return {
      company: translations[`${this.I18N_CAREER_PATH}.accenture-senior`].companyName,
      title: translations[`${this.I18N_CAREER_PATH}.accenture-senior`].role,
      period: translations[`${this.I18N_CAREER_PATH}.accenture-senior`].period,
      location: translations[`${this.I18N_CAREER_PATH}.accenture-senior`].location,
      responsibilities: Object.values(translations[`${this.I18N_CAREER_PATH}.accenture-senior`].responsibilities),
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
    }
  }

  private getMadreTranslations (translations: InterpolationParameters): ResumeSectionCareerExperience {
    return {
      company: translations[`${this.I18N_CAREER_PATH}.accenture-senior`].companyName,
      title: translations[`${this.I18N_CAREER_PATH}.accenture-senior`].role,
      period: translations[`${this.I18N_CAREER_PATH}.accenture-senior`].period,
      location: translations[`${this.I18N_CAREER_PATH}.accenture-senior`].location,
      responsibilities: Object.values(translations[`${this.I18N_CAREER_PATH}.accenture-senior`].responsibilities),
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
    }
  }
}
