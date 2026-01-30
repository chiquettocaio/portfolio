import { Injectable, signal } from '@angular/core'
import { take, tap, timer } from 'rxjs'
import { ToastData } from '../../models/toast.model'

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<ToastData[]>([])

  FADE_OUT_TIME_MS: number = 10000

  add (data: ToastData): void {
    data.id = this.toasts().length

    this.toasts.update(toasts => [...toasts, data])

    this.startTimer(data)
  }

  remove (id: number): void {
    this.toasts.update(toasts => {
      const index = toasts.findIndex(t => t.id === id)
      toasts.splice(index, 1)
      return [...toasts]
    })
  }

  private startTimer (toast: ToastData): void {
    timer(this.FADE_OUT_TIME_MS).pipe(
      take(1),
      tap(() => this.remove(toast.id!))
    ).subscribe()
  }
}
