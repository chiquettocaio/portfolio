import { AfterViewInit, Component, inject } from '@angular/core'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { IconComponent } from '@app/shared/components/icon/icon.component'
import { ToastService } from '@app/shared/components/toast/services/toast-service/toast.service'
import { TranslatePipe } from '@ngx-translate/core'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ResumeSectionComponent } from './components/resume-section/resume-section.component'
import { ResumeService } from './services/resume/resume.service'

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
export class ResumeComponent implements AfterViewInit {
  private resumeService = inject(ResumeService)
  private toastService = inject(ToastService)

  educationSectionIcon = this.resumeService.educationSectionIcon
  educationSectionContent = this.resumeService.educationSectionContent
  careerSectionIcon = this.resumeService.careerSectionIcon
  careerSectionContent = this.resumeService.careerSectionContent
  haveTranslationsBeenLoaded = this.resumeService.haveTranslationsBeenLoaded

  ngAfterViewInit (): void {
    this.startAnimation()
  }

  showToast (): void {
    this.toastService.add({
      type: 'success',
      titleKey: 'home.resume.downloadResumeSuccess.title',
      messageKey: 'home.resume.downloadResumeSuccess.message'
    })
  }

  private startAnimation (): void {
    const split = new SplitText('#resume-section .paragraph', {
      type: 'lines',
      autoSplit: true
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '#resume-section',
        start: 'top 60%',
        end: 'top 0',
        scrub: 1
      }
    })
      .from(split.lines, {
        opacity: 0,
        x: -100,
        stagger: 0.2
      })
      .from('#resume-section .resume-header__cta', {
        opacity: 0,
        y: 20
      }, '<')
      .from('#resume-section app-resume-section:nth-child(3)', {
        opacity: 0,
        y: 20
      })
      .from('#resume-section app-resume-section:nth-child(4)', {
        opacity: 0
      })
  }
}
