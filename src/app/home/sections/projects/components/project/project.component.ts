import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { CareerProject } from './project.model'

@Component({
  selector: 'app-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  data = input.required<CareerProject>()
}
