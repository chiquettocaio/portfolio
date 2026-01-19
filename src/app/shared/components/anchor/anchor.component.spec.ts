import { TestBed } from '@angular/core/testing'
import { AnchorComponent } from './anchor.component'

describe('AnchorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorComponent]
    }).compileComponents()
  })

  it('should create the button', () => {
    const fixture = TestBed.createComponent(AnchorComponent)
    const button = fixture.componentInstance
    expect(button).toBeTruthy()
  })
})
