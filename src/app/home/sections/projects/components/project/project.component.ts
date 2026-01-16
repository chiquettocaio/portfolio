import { NgOptimizedImage } from '@angular/common'
import { Component, input } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { CareerProject } from './project.model'

@Component({
  selector: 'app-project',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  data = input.required<CareerProject>()
}
