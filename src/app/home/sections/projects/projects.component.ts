import { isPlatformBrowser } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, PLATFORM_ID, Signal } from '@angular/core'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { ImageGalleryComponent } from '@app/shared/components/image-gallery/image-gallery.component'
import { ImageGalleryData } from '@app/shared/components/image-gallery/models/image-gallery.model'
import { ImageGalleryService } from '@app/shared/components/image-gallery/services/image-gallery/image-gallery.service'
import { TranslatePipe } from '@ngx-translate/core'
import { gsap } from 'gsap'
import { ProjectComponent } from './components/project/project.component'
import { CareerProject } from './components/project/project.model'
import { ProjectsService } from './services/projects/projects.service'

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    ProjectComponent,
    AnchorComponent,
    ImageGalleryComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID)
  private projectsService = inject(ProjectsService)
  private imageGalleryService = inject(ImageGalleryService)

  projects: Signal<CareerProject[]> = this.projectsService.projects
  image: Signal<ImageGalleryData | null> = this.imageGalleryService.image

  ngAfterViewInit (): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAnimation()
    }
  }

  showGallery (project: CareerProject): void {
    const biggerSrc = project.thumb.src.replace('-small', '')

    this.imageGalleryService.show({
      src: biggerSrc,
      title: project.title,
      subtitle: project.description
    })
  }

  private startAnimation (): void {
    gsap.from('#projects-section .subtitle', {
      opacity: 0,
      y: 20,
      scrollTrigger: {
        trigger: '#projects-section .subtitle',
        start: 'top 60%',
        end: 'top 50%',
        scrub: 1.5
      }
    })

    gsap.utils.toArray('#projects-section app-project').forEach((item, index) => {
      const elm = item as HTMLElement

      gsap.timeline({
        scrollTrigger: {
          trigger: elm,
          start: 'top 60%',
          end: 'top 0',
          scrub: 1
        }
      }).from(elm, {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100
      })
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '#projects-section .h2',
        start: 'top 60%',
        end: 'top 50%',
        scrub: 1.5
      }
    })
      .from('#projects-section .h2', {
        opacity: 0,
        scale: 0,
        duration: 0.75,
        ease: 'power1.out'
      })
      .from('#projects-section app-anchor', {
        opacity: 0,
        duration: 0.8,
        y: 50,
        ease: 'power1.out'
      }, '<')
  }
}
