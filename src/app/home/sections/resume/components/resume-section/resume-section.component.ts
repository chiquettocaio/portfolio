import { Component, input } from '@angular/core'
import { IconComponent } from '@app/shared/components/icon/icon.component'
import { TranslatePipe } from '@ngx-translate/core'
import { ResumeSectionCareerExperience, ResumeSectionEducationExperience, ResumeSectionIcon } from './resume-section.model'

@Component({
  selector: 'app-resume-section',
  imports: [IconComponent, TranslatePipe],
  templateUrl: './resume-section.component.html',
  styleUrl: './resume-section.component.scss'
})
export class ResumeSectionComponent {
  sectionTitle = input.required<string>()
  sectionIcon = input.required<ResumeSectionIcon>()
  items = input<ResumeSectionCareerExperience[] | ResumeSectionEducationExperience[]>([])
}
