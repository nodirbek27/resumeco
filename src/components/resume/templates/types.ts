import type { ResumeData } from '@/types/resume'

export interface ResumeTemplateProps {
  data: ResumeData
  /** data.accentColor, shaded darker by 0.35 — used for gradients/dark accents */
  accentDark: string
  /** data.accentColor tinted toward white by 0.82 — light accent text on colored banners */
  accentSoft2: string
}

export function splitList(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
