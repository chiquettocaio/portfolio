import { Component, inject, Signal } from '@angular/core'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { ImageGalleryComponent } from '@app/shared/components/image-gallery/image-gallery.component'
import { ImageGalleryData } from '@app/shared/components/image-gallery/models/image-gallery.model'
import { ImageGalleryService } from '@app/shared/components/image-gallery/services/image-gallery/image-gallery.service'
import { TranslatePipe } from '@ngx-translate/core'
import { ProjectComponent } from './components/project/project.component'
import { CareerProject } from './components/project/project.model'
import { ProjectsService } from './services/projects/projects.service'

@Component({
  selector: 'app-projects',
  imports: [
    TranslatePipe,
    ProjectComponent,
    AnchorComponent,
    ImageGalleryComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService)
  private imageGalleryService = inject(ImageGalleryService)

  projects: Signal<CareerProject[]> = this.projectsService.projects
  image: Signal<ImageGalleryData | null> = this.imageGalleryService.image

  showGallery (project: CareerProject): void {
    const biggerSrc = project.thumb.src.replace('-small', '')

    this.imageGalleryService.show({
      src: biggerSrc,
      title: project.title,
      subtitle: project.description
    })
  }
}
