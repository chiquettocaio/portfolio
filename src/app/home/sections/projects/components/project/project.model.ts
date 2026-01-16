export interface CareerProject {
  title: string
  role: string
  description: string
  thumb: CareerProjectThumb
}

interface CareerProjectThumb {
  src: string
  alt: string
}
