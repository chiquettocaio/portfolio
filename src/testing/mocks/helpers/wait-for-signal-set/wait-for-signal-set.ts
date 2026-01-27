import { WritableSignal } from '@angular/core'

export async function waitForSignalSet<T> (signal: WritableSignal<T>): Promise<void> {
  await new Promise(resolve => {
    const originalSet = signal.set

    signal.set = (args): void => {
      originalSet(args)

      // Restoring to avoid unpredictable errors
      signal.set = originalSet

      resolve(null)
    }
  })
}
