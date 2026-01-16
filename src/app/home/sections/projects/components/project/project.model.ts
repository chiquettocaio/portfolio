export interface CareerProject {
  title: string
  role: string
  description: string
  thumb: CareerProjectThumb
  techs: string
}

interface CareerProjectThumb {
  src: string
  alt: string
}
