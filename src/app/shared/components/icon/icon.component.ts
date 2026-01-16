import { Component, input } from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { phosphorBuildingOffice, phosphorCalendarBlank, phosphorCertificate, phosphorDesktop, phosphorGraduationCap, phosphorMapPinLine } from '@ng-icons/phosphor-icons/regular'

@Component({
  selector: 'app-icon',
  imports: [NgIcon],
  providers: [
    provideIcons({
      phosphorGraduationCap,
      phosphorCertificate,
      phosphorBuildingOffice,
      phosphorCalendarBlank,
      phosphorMapPinLine,
      phosphorDesktop
    })
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  name = input.required<string>()
  ariaLabel = input.required<string>()
}
