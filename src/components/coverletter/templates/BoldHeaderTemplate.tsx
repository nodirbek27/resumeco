import { PhoneIcon, EmailIcon, LanguageIcon } from '@/components/icons'
import type { CoverLetterTemplateProps } from './types'

export default function BoldHeaderTemplate({ data }: CoverLetterTemplateProps) {
  return (
    <div
      className="h-full flex flex-col justify-between bg-white text-slate-800"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div>
        <div className="p-8 text-white" style={{ background: '#4338ca' }}>
          <h2 className="text-2xl font-black uppercase tracking-wide leading-none">
            {data.senderName || 'Your Name'}
          </h2>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80 mt-2">
            {data.senderTitle}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-white/90 mt-5 font-mono">
            {data.senderPhone && (
              <span>
                <PhoneIcon sx={{ fontSize: 13 }} /> {data.senderPhone}
              </span>
            )}
            {data.senderEmail && (
              <span>
                <EmailIcon sx={{ fontSize: 13 }} /> {data.senderEmail}
              </span>
            )}
            {data.senderWebsite && (
              <span>
                <LanguageIcon sx={{ fontSize: 13 }} /> {data.senderWebsite}
              </span>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start text-xs mb-6">
            <div className="space-y-0.5 text-slate-600">
              <strong className="text-slate-900 block">{data.recipientName}</strong>
              <span className="block">{data.recipientTitle}</span>
              <span className="font-semibold block">{data.companyName}</span>
              <span className="text-[11px] block">{data.companyAddress}</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">{data.date}</div>
          </div>

          <h3 className="text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm" style={{ background: '#4338ca' }}></span>
            Subject: {data.subject || 'Job Application'}
          </h3>

          <p className="text-xs font-bold text-slate-900 mb-4">{data.salutation}</p>

          <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
            {data.bodyText || 'Write your letter text here...'}
          </div>

          <div className="mt-6 text-xs text-slate-700 whitespace-pre-wrap">{data.signOff}</div>
        </div>
      </div>

      <div className="text-[10px] text-slate-400 text-center pb-4">Bold Header Template</div>
    </div>
  )
}
