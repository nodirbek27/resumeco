import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import type { CoverLetterTemplateProps } from './types'

export default function ModernTemplate({ data }: CoverLetterTemplateProps) {
  return (
    <div
      className="h-full grid grid-cols-12 bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Sidebar */}
      <div className="col-span-4 bg-slate-900 text-slate-100 p-6 flex flex-col justify-between h-full">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-extrabold text-white leading-tight break-words">
              {data.senderName || 'Your Name'}
            </h3>
            <p className="text-[11px] text-indigo-400 font-semibold tracking-wide mt-1">
              {data.senderTitle}
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              {data.senderPhone && (
                <li className="flex gap-2">
                  <PhoneIcon className="text-indigo-400" sx={{ fontSize: 14 }} />
                  <span className="break-all">{data.senderPhone}</span>
                </li>
              )}
              {data.senderEmail && (
                <li className="flex gap-2">
                  <EmailIcon className="text-indigo-400" sx={{ fontSize: 14 }} />
                  <span className="break-all">{data.senderEmail}</span>
                </li>
              )}
              {data.senderAddress && (
                <li className="flex gap-2">
                  <PlaceIcon className="text-indigo-400" sx={{ fontSize: 14 }} />
                  <span>{data.senderAddress}</span>
                </li>
              )}
              {data.senderWebsite && (
                <li className="flex gap-2">
                  <LanguageIcon className="text-indigo-400" sx={{ fontSize: 14 }} />
                  <span className="break-all">{data.senderWebsite}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="text-[10px] text-slate-600 text-center">Modern Minimalist</div>
      </div>

      {/* Main Content */}
      <div className="col-span-8 p-8 flex flex-col justify-between h-full bg-slate-50/20">
        <div>
          <div className="text-right text-[10px] font-semibold text-slate-400 font-mono">
            {data.date}
          </div>

          {/* Recipient details block */}
          <div className="mb-6 text-xs text-slate-600 space-y-1 mt-4">
            <p className="font-bold text-slate-800 text-sm">{data.recipientName}</p>
            <p>{data.recipientTitle}</p>
            <p className="font-semibold text-slate-700">{data.companyName}</p>
            <p>{data.companyAddress}</p>
          </div>

          {/* Subject Line */}
          <div className="mb-6 border-b border-slate-200 pb-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Subject: {data.subject || 'Job Application'}
            </h2>
          </div>

          {/* Salutation */}
          <p className="text-xs font-bold text-slate-800 mb-4">{data.salutation}</p>

          {/* Letter Body */}
          <div className="text-xs text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap">
            {data.bodyText || 'Write your letter text here...'}
          </div>

          {/* Sign-off */}
          <div className="mt-8 text-xs text-slate-700 whitespace-pre-wrap">{data.signOff}</div>
        </div>

        <div className="text-[10px] text-slate-400 text-right">Generated as PDF</div>
      </div>
    </div>
  )
}
