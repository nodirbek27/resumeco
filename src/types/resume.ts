export interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  school: string
  degree: string
  startDate: string
  endDate: string
  description: string
}

export interface ResumeData {
  fullname: string
  title: string
  photo: string | null
  email: string
  phone: string
  address: string
  website: string
  summary: string
  skills: string
  languages: string
  experience: Experience[]
  education: Education[]
  accentColor: string
}
