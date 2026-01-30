import { Injectable, signal } from '@angular/core'
import { Subscription, tap, timer } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class LoaderService {
  isVisible = signal<boolean>(false)

  DELAY_TO_SHOW_SPINNER: number = 300

  timerSubscription: Subscription = new Subscription()

  show (): void {
    this.timerSubscription = timer(this.DELAY_TO_SHOW_SPINNER).pipe(
      tap(() => this.isVisible.set(true))
    ).subscribe()
  }

  hide (): void {
    this.isVisible.set(false)
    this.timerSubscription.unsubscribe()
  }
}
