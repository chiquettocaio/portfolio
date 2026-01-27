import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AnchorComponent } from './anchor.component'

const anchorContent: string = 'Test'
const anchorAria: string = 'Test Aria'
const anchorHref: string = '#test'

describe('AnchorComponent', () => {
  let fixture: ComponentFixture<AnchorComponent>
  let component: AnchorComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(AnchorComponent)
    component = fixture.componentInstance
  })

  it('should create the button', () => {
    fixture.componentRef.setInput('content', anchorContent)
    fixture.componentRef.setInput('ariaLabel', anchorAria)
    fixture.componentRef.setInput('href', anchorHref)

    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should NOT create without "content"', () => {
    fixture.componentRef.setInput('ariaLabel', anchorAria)
    fixture.componentRef.setInput('href', anchorHref)

    expect(() => fixture.detectChanges()).toThrowError(/NG0950: .* "content"/)
  })

  it('should NOT create without "ariaLabel"', () => {
    fixture.componentRef.setInput('content', anchorContent)
    fixture.componentRef.setInput('href', anchorHref)

    expect(() => fixture.detectChanges()).toThrowError(/NG0950: .* "ariaLabel"/)
  })

  it('should NOT create without "href"', () => {
    fixture.componentRef.setInput('content', anchorContent)
    fixture.componentRef.setInput('ariaLabel', anchorAria)

    expect(() => fixture.detectChanges()).toThrowError(/NG0950: .* "href"/)
  })

  it('should have input values', () => {
    fixture.componentRef.setInput('content', anchorContent)
    fixture.componentRef.setInput('ariaLabel', anchorAria)
    fixture.componentRef.setInput('href', anchorHref)

    fixture.detectChanges()

    expect(component.content()).toBe(anchorContent)
    expect(component.ariaLabel()).toBe(anchorAria)
    expect(component.href()).toBe(anchorHref)
  })
})
