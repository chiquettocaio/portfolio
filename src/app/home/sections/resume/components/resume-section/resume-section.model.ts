export interface ResumeSectionCareerExperience {
  title: string
  company: string
  period: string
  location: string
  technologies: string[]
  responsibilities: string[]
  isEducation: false
}

export interface ResumeSectionEducationExperience {
  title: string
  degree: string
  period: string
  location: string
  isEducation: true
}

export interface ResumeSectionIcon {
  name: string
  ariaLabel: string
}
