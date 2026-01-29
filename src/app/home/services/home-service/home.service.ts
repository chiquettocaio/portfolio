import { Injectable, signal } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class HomeService {
  haveSectionsBeenLoaded = signal<boolean>(false)

  setHaveSectionsBeenLoaded (value: boolean): void {
    this.haveSectionsBeenLoaded.set(value)
  }
}
