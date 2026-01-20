import { Component, DOCUMENT, inject, OnInit, signal } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { TranslationConfigService } from '../../../services/translation-config/translation-config.service'
import { KeyString } from '../../models/generic-types.model'
import { IconComponent } from '../icon/icon.component'

@Component({
  selector: 'app-nav-menu',
  imports: [IconComponent, TranslatePipe],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit {
  private document = inject(DOCUMENT)
  private translationConfigService = inject(TranslationConfigService)

  TOP_DISTANCE_TO_MOVE_DOWN: number = 200
  IS_MOBILE: boolean = this.document.documentElement.clientWidth >= 768

  activeLink = signal<string>('hero')
  navBottom = signal<boolean>(false)
  isImperativelyNavigating = signal<boolean>(false)

  currentLanguage = this.translationConfigService.currentLanguage

  ngOnInit (): void {
    this.initIntersectionObserver()
  }

  activateLink (link: string, viaIntersectionObserver: boolean = false): void {
    this.activeLink.set(link)
    this.isImperativelyNavigating.set(!viaIntersectionObserver)
  }

  switchLanguage (): void {
    const nextLang = this.currentLanguage() === 'pt-br'
      ? 'en-us'
      : 'pt-br'

    this.translationConfigService.setLanguage(nextLang)
  }

  private initIntersectionObserver (): void {
    const heroSection = this.document.querySelector('#hero-section')
    const aboutSection = this.document.querySelector('#about-section')
    const resumeSection = this.document.querySelector('#resume-section')
    const projectsSection = this.document.querySelector('#projects-section')
    const contactSection = this.document.querySelector('#contact-section')

    const mapping: KeyString<string> = {
      'hero-section': 'hero',
      'about-section': 'about',
      'resume-section': 'resume',
      'projects-section': 'projects',
      'contact-section': 'contact'
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const targetId: string = entry.target.id
        const link: string = mapping[targetId]

        if (entry.isIntersecting) {
          this.navBottom.set(link !== 'hero')

          if (!this.isImperativelyNavigating()) {
            this.activateLink(link)
          }

          this.isImperativelyNavigating.set(link !== this.activeLink())
        }
      })
    }, { rootMargin: '-40%' })

    if (heroSection) observer.observe(heroSection)
    if (aboutSection) observer.observe(aboutSection)
    if (resumeSection) observer.observe(resumeSection)
    if (projectsSection) observer.observe(projectsSection)
    if (contactSection) observer.observe(contactSection)
  }
}
