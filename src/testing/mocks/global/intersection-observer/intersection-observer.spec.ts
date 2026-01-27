import { describe, expect, it } from 'vitest'
import { MockIntersectionObserver } from './intersection-observer'

describe('MockIntersectionObserver helper', () => {
  it('should call "observe"', () => {
    const callback = (): void => { /* no return */ }
    const observer = new MockIntersectionObserver(callback, null)

    const spyOn = vi.spyOn(observer, 'observe')
    observer.observe()

    expect(spyOn).toHaveBeenCalled()
  })

  it('should call "unobserve"', () => {
    const callback = (): void => { /* no return */ }
    const observer = new MockIntersectionObserver(callback, null)

    const spyOn = vi.spyOn(observer, 'unobserve')
    observer.unobserve()

    expect(spyOn).toHaveBeenCalled()
  })

  it('should call "disconnect"', () => {
    const callback = (): void => { /* no return */ }
    const observer = new MockIntersectionObserver(callback, null)

    const spyOn = vi.spyOn(observer, 'disconnect')
    observer.disconnect()

    expect(spyOn).toHaveBeenCalled()
  })
})
