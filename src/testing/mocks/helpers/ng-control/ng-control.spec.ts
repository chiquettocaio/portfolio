import { describe, it } from 'vitest'
import { MockNgControl } from './ng-control'

describe('MockNgControl helper', () => {
  it('should call "viewToModelUpdate"', () => {
    const control = new MockNgControl()
    const spyOn = vi.spyOn(control, 'viewToModelUpdate')

    control.viewToModelUpdate()

    expect(spyOn).toHaveBeenCalled()
  })
})
