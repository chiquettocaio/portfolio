import { CareerProject } from '@app/home/sections/projects/components/project/project.model'

export const mockProjectData: CareerProject = {
  title: 'Mocked title',
  description: 'Mocked description',
  techs: ['vitest', 'jasmine'],
  thumb: {
    src: 'mocked.png',
    alt: 'Mocked image'
  }
}
