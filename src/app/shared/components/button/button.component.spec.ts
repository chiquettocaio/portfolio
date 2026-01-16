import { TestBed } from '@angular/core/testing'
import { ButtonComponent } from './button.component'

describe('Button', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents()
  })

  it('should create the button', () => {
    const fixture = TestBed.createComponent(ButtonComponent)
    const button = fixture.componentInstance
    expect(button).toBeTruthy()
  })
})
