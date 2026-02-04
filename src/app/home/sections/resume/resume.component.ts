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
      .from('#resume-section app-resume-section:nth-child(3) .item .item__title-marker', {
        scale: 0,
        ease: 'back.out(3)',
        onStart () {
          const selector = gsap.utils.selector('#resume-section app-resume-section:nth-child(3) .item')
          selector('.item__title-marker')[0].classList.add('item__title-marker--colorful')
        }
      })
      .from('#resume-section app-resume-section:nth-child(3) .item .item__path', {
        scaleY: 0
      })
      .from('#resume-section app-resume-section:nth-child(4)', {
        opacity: 0,
        y: 20
      })

    gsap.utils.toArray('#resume-section app-resume-section:nth-child(4) .item').forEach((item, index, arr) => {
      const currEl = item as HTMLElement
      const nextEl = arr[index + 1] as HTMLElement
      const pathEl = currEl.querySelector('.item__path') as HTMLElement
      const currTitleEl = currEl.querySelector('.item__title') as HTMLElement
      const currMarkerEl = currEl.querySelector('.item__title-marker') as HTMLElement
      const nextTitleEl = nextEl?.querySelector('.item__title') as HTMLElement
      const nextMarkerEl = nextEl?.querySelector('.item__title-marker') as HTMLElement

      gsap.timeline({
        scrollTrigger: {
          trigger: currTitleEl,
          endTrigger: nextTitleEl,
          start: 'top 40%',
          toggleActions: 'play none none reverse',
          scrub: 3
        }
      })
        .from(pathEl, {
          scaleY: 0,
          ease: 'power1.inOut',
          onStart: () => {
            currMarkerEl.classList.add('item__title-marker--colorful')
          }
        })
        .to(nextMarkerEl, {
          scale: 1.8,
          onStart () {
            if (nextMarkerEl) {
              nextMarkerEl.classList.add('item__title-marker--colorful')
            }
          },

          onReverseComplete () {
            if (nextMarkerEl) {
              nextMarkerEl.classList.remove('item__title-marker--colorful')
            }
          }
        })
        .to(nextMarkerEl, {
          scale: 1
        })
        .to({}, { duration: 2 })
    })
  }
}
