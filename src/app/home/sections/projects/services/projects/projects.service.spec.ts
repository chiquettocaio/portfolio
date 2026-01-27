import { TestBed } from '@angular/core/testing'

import { MockTranslationProvider, waitForSignalSet } from 'src/testing/mocks/helpers'
import { ProjectsService } from './projects.service'

describe('ProjectsService', () => {
  let service: ProjectsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockTranslationProvider]
    })

    service = TestBed.inject(ProjectsService)
  })

  it('should be created', async () => {
    expect(service).toBeTruthy()
  })

  it('should load data and populate "projects" signal', async () => {
    // TEST: if you want to wait for a signal to be set, FOLLOW THIS APPROACH AAAAA I'M SO SMART gonna buy a pizza to celebrate
    await waitForSignalSet(service.projects)
    expect(service.projects().length).toBe(9)
  })
})
