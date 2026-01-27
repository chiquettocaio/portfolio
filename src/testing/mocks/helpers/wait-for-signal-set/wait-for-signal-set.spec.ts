import { signal } from '@angular/core'
import { describe, it } from 'vitest'
import { waitForSignalSet } from './wait-for-signal-set'

describe('waitForSignalSet helper', () => {
  it('should set value', async () => {
    const testSignal = signal<number>(0)

    let promiseResolved: boolean = false
    const signalSetPromise = waitForSignalSet(testSignal).then(() => promiseResolved = true)

    expect(promiseResolved).toBe(false)

    testSignal.set(100)
    await signalSetPromise

    expect(promiseResolved).toBe(true)
    expect(testSignal()).toBe(100)
  })
})
