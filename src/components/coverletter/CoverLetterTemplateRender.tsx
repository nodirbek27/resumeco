import type { CoverLetterData } from '@/types/coverLetter'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import TimelineTemplate from './templates/TimelineTemplate'
import BoldHeaderTemplate from './templates/BoldHeaderTemplate'

interface Props {
  template: string
  data: CoverLetterData
}

export default function CoverLetterTemplateRender({ template, data }: Props) {
  switch (template) {
    case 'modern':
      return <ModernTemplate data={data} />
    case 'classic':
      return <ClassicTemplate data={data} />
    case 'creative':
      return <CreativeTemplate data={data} />
    case 'timeline':
      return <TimelineTemplate data={data} />
    default:
      return <BoldHeaderTemplate data={data} />
  }
}
