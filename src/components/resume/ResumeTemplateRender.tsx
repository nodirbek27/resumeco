import { shade, tint } from '@/utils/colorTint'
import type { ResumeData } from '@/types/resume'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import SidebarRightTemplate from './templates/SidebarRightTemplate'
import TimelineTemplate from './templates/TimelineTemplate'
import BoldHeaderTemplate from './templates/BoldHeaderTemplate'
import ExecutivePhotoTemplate from './templates/ExecutivePhotoTemplate'
import ProfessionalIconsTemplate from './templates/ProfessionalIconsTemplate'

interface Props {
  template: string
  data: ResumeData
}

export default function ResumeTemplateRender({ template, data }: Props) {
  const accentDark = shade(data.accentColor, -0.35)
  const accentSoft2 = tint(data.accentColor, 0.82)
  const props = { data, accentDark, accentSoft2 }

  switch (template) {
    case 'modern':
      return <ModernTemplate {...props} />
    case 'classic':
      return <ClassicTemplate {...props} />
    case 'creative':
      return <CreativeTemplate {...props} />
    case 'minimal':
      return <MinimalTemplate {...props} />
    case 'sidebar-right':
      return <SidebarRightTemplate {...props} />
    case 'timeline':
      return <TimelineTemplate {...props} />
    case 'bold-header':
      return <BoldHeaderTemplate {...props} />
    case 'executive-photo':
      return <ExecutivePhotoTemplate {...props} />
    default:
      return <ProfessionalIconsTemplate {...props} />
  }
}
