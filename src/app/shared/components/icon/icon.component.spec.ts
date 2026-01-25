import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { NgIconComponent } from '@ng-icons/core'
import { IconComponent } from './icon.component'

const iconName = 'phosphorGraduationCap'
const iconAriaLabel = 'Test icon aria label'

describe('Icon', () => {
  let component: IconComponent
  let fixture: ComponentFixture<IconComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(IconComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.componentRef.setInput('name', iconName)
    fixture.componentRef.setInput('ariaLabel', iconAriaLabel)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should not create without "ariaLabel"', () => {
    fixture.componentRef.setInput('name', iconName)
    expect(() => fixture.detectChanges()).toThrowError(/NG0950: .* "ariaLabel"/)
  })

  it('should not create without "name"', () => {
    fixture.componentRef.setInput('ariaLabel', iconName)
    expect(() => fixture.detectChanges()).toThrowError(/NG0950: .* "name"/)
  })

  it('should not create without "name" and "aria-label"', () => {
    expect(() => fixture.detectChanges()).toThrowError(/NG0950/)
  })

  // TODO: testing if inner component has attributes and properties
  it('should check if NgIconComponent is properly being initiated', () => {
    fixture.componentRef.setInput('name', iconName)
    fixture.componentRef.setInput('ariaLabel', iconAriaLabel)

    fixture.detectChanges()

    // Check if the component was found
    const ngIconDebugElement = fixture.debugElement.query(By.directive(NgIconComponent))
    expect(ngIconDebugElement).toBeTruthy()

    const iconInstance = ngIconDebugElement.componentInstance as NgIconComponent

    // Check attributes and properties existance
    expect(iconInstance.name()).toBe(component.name())
    expect(ngIconDebugElement.nativeElement.ariaLabel).toBe(component.ariaLabel())

    expect(component).toBeTruthy()
  })
})
