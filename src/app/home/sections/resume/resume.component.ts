import { Component, inject } from '@angular/core'
import { AnchorComponent } from '@app/shared/components/anchor/anchor.component'
import { IconComponent } from '@app/shared/components/icon/icon.component'
import { TranslatePipe } from '@ngx-translate/core'
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
export class ResumeComponent {
  private resumeService = inject(ResumeService)

  educationSectionIcon = this.resumeService.educationSectionIcon
  educationSectionContent = this.resumeService.educationSectionContent
  careerSectionIcon = this.resumeService.careerSectionIcon
  careerSectionContent = this.resumeService.careerSectionContent
  haveTranslationsBeenLoaded = this.resumeService.haveTranslationsBeenLoaded
}
