import { PhoneIcon, EmailIcon, LanguageIcon } from '@/components/icons'
import type { CoverLetterTemplateProps } from './types'

export default function CreativeTemplate({ data }: CoverLetterTemplateProps) {
  return (
    <div
      className="h-full flex flex-col justify-between bg-white text-slate-800"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div>
        {/* Top Accent Banner */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black tracking-wide">
                {data.senderName || 'Your Name'}
              </h2>
              <p className="text-xs font-semibold text-indigo-200 tracking-wider mt-1">
                {data.senderTitle}
              </p>
            </div>
            <div className="text-right text-[10px] font-mono text-indigo-100">{data.date}</div>
          </div>

          <div className="flex flex-wrap gap-x-4 text-[10px] text-indigo-100 mt-4 font-mono">
            {data.senderPhone && (
              <span>
                <PhoneIcon sx={{ fontSize: 'inherit' }} /> {data.senderPhone}
              </span>
            )}
            {data.senderEmail && (
              <span>
                <EmailIcon sx={{ fontSize: 'inherit' }} /> {data.senderEmail}
              </span>
            )}
            {data.senderWebsite && (
              <span>
                <LanguageIcon sx={{ fontSize: 'inherit' }} /> {data.senderWebsite}
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Recipient Block */}
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl mb-5 text-xs text-slate-600">
            <p className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider mb-1">
              Sending to:
            </p>
            <strong className="text-slate-800 text-sm block">{data.recipientName}</strong>
            <span className="block">{data.recipientTitle}</span>
            <span className="font-semibold block mt-0.5 text-slate-700">{data.companyName}</span>
            <span className="text-[11px]">{data.companyAddress}</span>
          </div>

          {/* Subject */}
          <h3 className="text-xs font-extrabold text-indigo-800 uppercase tracking-widest mb-3">
            Subject: {data.subject}
          </h3>

          {/* Salutation */}
          <p className="text-xs font-bold text-slate-800 mb-3">{data.salutation}</p>

          {/* Letter Body */}
          <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
            {data.bodyText || 'Write your letter text here...'}
          </div>

          {/* Sign-off */}
          <div className="mt-6 text-xs text-slate-700 whitespace-pre-wrap">{data.signOff}</div>
        </div>
      </div>

      <div className="text-[10px] text-slate-400 text-center pb-4">Creative Accent Template</div>
    </div>
  )
}
