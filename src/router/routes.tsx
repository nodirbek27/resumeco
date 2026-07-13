import HomePage from '@/pages/HomePage'
import ResumePage from '@/pages/ResumePage'
import CoverLetterPage from '@/pages/CoverLetterPage'
import ObektivkaPage from '@/pages/ObektivkaPage'

const SITE_URL = 'https://resumeio.uz'

export interface RouteMeta {
  titleKey: string
  seoTitle: string
  description: string
  canonical: string
}

export interface RouteDef {
  name: string
  path: string
  element: React.ReactElement
  meta: RouteMeta
}

export const routeDefs: RouteDef[] = [
  {
    name: 'home',
    path: '',
    element: <HomePage />,
    meta: {
      titleKey: '',
      seoTitle: 'ResumeIO — Free Online Resume, CV & Cover Letter Builder',
      description:
        'Build a professional resume, CV, and cover letter online for free. Choose from multiple templates, preview in real time, and download as PDF or Word instantly.',
      canonical: `${SITE_URL}/`,
    },
  },
  {
    name: 'resume',
    path: 'resume',
    element: <ResumePage />,
    meta: {
      titleKey: 'menu.resume',
      seoTitle: 'Resume Builder — Create a Professional CV Online | ResumeIO',
      description:
        'Build a professional resume (CV) online with modern templates and a real-time preview. Download as PDF or Word for free — no sign-up required.',
      canonical: `${SITE_URL}/resume`,
    },
  },
  {
    name: 'coverLetter',
    path: 'cover-letter',
    element: <CoverLetterPage />,
    meta: {
      titleKey: 'menu.coverLetter',
      seoTitle: 'Cover Letter Builder — Write a Professional Cover Letter Online | ResumeIO',
      description:
        'Create a professional cover letter online in minutes with modern templates. Download as PDF or Word for free — no sign-up required.',
      canonical: `${SITE_URL}/cover-letter`,
    },
  },
  {
    name: 'obektivka',
    path: 'obektivka',
    element: <ObektivkaPage />,
    meta: {
      titleKey: 'menu.obektivka',
      seoTitle: 'Obektivka (Official Reference Letter) Maker — ResumeIO',
      description:
        'Create an official Obektivka reference letter for Uzbekistan government and private institutions. A4 format, official standard. Download as Word or PDF for free.',
      canonical: `${SITE_URL}/obektivka`,
    },
  },
]

export const navMenus = routeDefs.filter((r) => r.meta.titleKey)
