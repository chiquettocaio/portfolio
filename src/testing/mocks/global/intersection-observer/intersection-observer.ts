import { vi } from 'vitest'

export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []

  callback: IntersectionObserverCallback

  constructor (
    callback: IntersectionObserverCallback,
    options?: any
  ) {
    this.callback = vi.fn().mockImplementation(callback)
    MockIntersectionObserver.instances.push(this)
  }

  observe (): void { return }
  unobserve = vi.fn()
  disconnect = vi.fn()

  // Helper to manually trigger the callback
  trigger (): void {
    this.callback([], this as unknown as IntersectionObserver)
  }

  static clearIntances (): void {
    MockIntersectionObserver.instances = []
  }
}
