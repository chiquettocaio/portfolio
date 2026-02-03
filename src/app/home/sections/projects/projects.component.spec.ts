import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Injectable, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TranslationConfigService } from '@app/services/translation-config/translation-config.service'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { ImageGalleryComponent } from '@app/shared/components/image-gallery/image-gallery.component'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mockProjectData } from 'src/testing/mocks/data/project'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'
import { CareerProject } from './components/project/project.model'
import { ProjectsComponent } from './projects.component'
import { ProjectsService } from './services/projects/projects.service'

@Injectable({ providedIn: 'root' })
export class MockProjectsService {
  projects = signal<CareerProject[]>([])

  constructor () {
    this.projects.set([mockProjectData])
  }
}

describe('ProjectsComponent', () => {
  gsap.registerPlugin(ScrollTrigger)

  let component: ProjectsComponent
  let fixture: ComponentFixture<ProjectsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectsComponent,
        AnchorComponent,
        ImageGalleryComponent
      ],

      providers: [
        MockTranslationProvider,
        TranslationConfigService,
        {
          provide: ProjectsService,
          useClass: MockProjectsService
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectsComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call "showGallery"', () => {
    const spyOn = vi.spyOn(component, 'showGallery')

    const appProjectDE = fixture.debugElement.query(By.css('app-project'))
    expect(appProjectDE).toBeTruthy()
    const projectImgDE = appProjectDE.query(By.css('.project__thumb img'))
    expect(projectImgDE).toBeTruthy()
    const img = projectImgDE.nativeElement as HTMLImageElement

    img.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    }))

    fixture.detectChanges()
    expect(spyOn).toHaveBeenCalled()
  })
})
