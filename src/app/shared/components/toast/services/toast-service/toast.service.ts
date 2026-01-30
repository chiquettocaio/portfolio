import { Injectable, signal } from '@angular/core'
import { Subscription, take, tap, timer } from 'rxjs'
import { ToastData } from '../../models/toast.model'

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<ToastData[]>([])

  FADE_OUT_TIME_MS: number = 10000

  timers: Subscription[] = []

  add (data: ToastData): void {
    data.id = crypto.randomUUID()
    this.toasts.update(toasts => [...toasts, data])
    this.startTimer(data)
  }

  remove (id: string): void {
    const index = this.toasts().findIndex(t => t.id === id)
    this.timers[index]?.unsubscribe()

    this.toasts.update(toasts => {
      toasts.splice(index, 1)
      return [...toasts]
    })
  }

  private startTimer (toast: ToastData): void {
    this.timers.push(
      timer(this.FADE_OUT_TIME_MS).pipe(
        take(1),
        tap(() => this.remove(toast.id!))
      ).subscribe()
    )
  }
}
