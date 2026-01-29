import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  phosphorArrowDown,
  phosphorArrowRight,
  phosphorBuildingOffice,
  phosphorCalendarBlank,
  phosphorCertificate,
  phosphorCheck,
  phosphorCode,
  phosphorDesktop,
  phosphorDownloadSimple,
  phosphorEnvelopeSimple,
  phosphorFileArrowDown,
  phosphorGraduationCap,
  phosphorHouse,
  phosphorMapPinLine,
  phosphorMoonStars,
  phosphorScroll,
  phosphorSunHorizon,
  phosphorUser,
  phosphorX,
  phosphorXCircle
} from '@ng-icons/phosphor-icons/regular'

import {
  flagBr,
  flagUs
} from '@ng-icons/flag-icons'

import {
  ionLogoCodepen,
  ionLogoGithub,
  ionLogoLinkedin,
  ionLogoWhatsapp
} from '@ng-icons/ionicons'

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      phosphorDownloadSimple,
      phosphorArrowRight,
      phosphorSunHorizon,
      phosphorMoonStars,
      phosphorX,
      phosphorCheck,
      phosphorXCircle,

      ionLogoLinkedin,
      ionLogoCodepen,
      ionLogoGithub,
      ionLogoWhatsapp,

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
