import { Component, input } from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  phosphorArrowDown,
  phosphorBuildingOffice,
  phosphorCalendarBlank,
  phosphorCertificate,
  phosphorCode,
  phosphorDesktop,
  phosphorEnvelopeSimple,
  phosphorFileArrowDown,
  phosphorGraduationCap,
  phosphorHouse,
  phosphorMapPinLine,
  phosphorScroll,
  phosphorUser
} from '@ng-icons/phosphor-icons/regular'

import { flagBr, flagUs } from '@ng-icons/flag-icons'

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
      phosphorDesktop,
      phosphorArrowDown,
      phosphorFileArrowDown,
      phosphorHouse,
      phosphorUser,
      phosphorScroll,
      phosphorCode,
      phosphorEnvelopeSimple,

      flagBr,
      flagUs
    })
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  name = input.required<string>()
  ariaLabel = input.required<string>()
}
