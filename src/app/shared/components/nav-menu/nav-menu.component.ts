import { Component, DOCUMENT, inject, OnInit, signal } from '@angular/core'
import { TranslationConfigService } from '@app/services/translation-config/translation-config.service'
import { IconComponent } from '@app/shared/components/icon/icon.component'
import { KeyString } from '@app/shared/models/generic-types.model'
import { TranslatePipe } from '@ngx-translate/core'

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
  isMobile = signal<boolean>(this.document.documentElement.clientWidth <= 768)

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

  onSpace (e: Event, link: string): void {
    e.preventDefault()
    this.activateLink(link)

    const target = (e.target) as HTMLAnchorElement
    window.location.href = target.href
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
    }, { rootMargin: '-50%' })

    if (heroSection) observer.observe(heroSection)
    if (aboutSection) observer.observe(aboutSection)
    if (resumeSection) observer.observe(resumeSection)
    if (projectsSection) observer.observe(projectsSection)
    if (contactSection) observer.observe(contactSection)
  }
}
