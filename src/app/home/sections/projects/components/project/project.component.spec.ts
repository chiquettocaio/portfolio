import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectComponent } from './project.component'

import { By } from '@angular/platform-browser'
import { IconComponent } from '@app/shared/components/icon/icon.component'
import { mockProjectData } from 'src/testing/mocks/data/project'
import { MockTranslationProvider } from 'src/testing/mocks/helpers'

describe('ProjectComponent', () => {
  let component: ProjectComponent
  let fixture: ComponentFixture<ProjectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectComponent,
        IconComponent
      ],

      providers: [
        MockTranslationProvider
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.componentRef.setInput('data', mockProjectData)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should throw if required input is missing', () => {
    expect(() => fixture.detectChanges()).toThrowError(/NG0950/)
  })

  it('should react to image click and keypress', () => {
    fixture.componentRef.setInput('data', mockProjectData)
    fixture.detectChanges()

    const spyOn = vi.spyOn(component, 'handleImageKeypress')

    const imageDE = fixture.debugElement.query(By.css('.project__thumb img'))
    expect(imageDE).toBeTruthy()
    const image = imageDE.nativeElement as HTMLImageElement

    const mouseEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })

    const enterKeyPressEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true
    })

    const spaceKeyPressEvent = new KeyboardEvent('keydown', {
      key: 'Space',
      bubbles: true,
      cancelable: true
    })

    const escapeKeyPressEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true
    })

    image.dispatchEvent(escapeKeyPressEvent)
    expect(spyOn).not.toHaveBeenCalled()

    image.dispatchEvent(mouseEvent)
    expect(spyOn).toHaveBeenCalledWith(mouseEvent, component.data())

    image.dispatchEvent(enterKeyPressEvent)
    expect(spyOn).toHaveBeenCalledWith(enterKeyPressEvent, component.data())

    image.dispatchEvent(spaceKeyPressEvent)
    expect(spyOn).toHaveBeenCalledWith(spaceKeyPressEvent, component.data())

    expect(spyOn).toHaveBeenCalledTimes(3)
  })
})
