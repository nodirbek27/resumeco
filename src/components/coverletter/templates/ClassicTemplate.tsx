import type { CoverLetterTemplateProps } from './types'

export default function ClassicTemplate({ data }: CoverLetterTemplateProps) {
  return (
    <div
      className="h-full p-10 flex flex-col justify-between bg-white text-slate-800"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      <div>
        {/* Top Header */}
        <div className="text-center pb-4 border-b border-slate-800 mb-6 font-sans">
          <h2 className="text-2xl font-bold tracking-wide text-slate-900">
            {data.senderName || 'Your Name'}
          </h2>
          <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest mt-1">
            {data.senderTitle}
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 text-[10px] text-slate-500 mt-2 font-mono">
            {data.senderEmail && <span>{data.senderEmail}</span>}
            {data.senderPhone && <span>{data.senderPhone}</span>}
            {data.senderWebsite && <span>{data.senderWebsite}</span>}
          </div>
        </div>

        {/* Date & Recipient Details */}
        <div className="flex justify-between items-start text-xs mb-6 font-sans">
          <div className="space-y-0.5 text-slate-600">
            <strong className="text-slate-800">{data.recipientName}</strong>
            <p>{data.recipientTitle}</p>
            <p className="font-semibold">{data.companyName}</p>
            <p className="text-[11px] text-slate-500">{data.companyAddress}</p>
          </div>
          <div className="text-slate-500 font-mono text-[11px]">{data.date}</div>
        </div>

        {/* Subject Line */}
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-1 font-sans">
            Subject: {data.subject}
          </h3>
        </div>

        {/* Salutation */}
        <p className="text-xs font-bold mb-4 font-sans text-slate-900">{data.salutation}</p>

        {/* Letter Body */}
        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap space-y-4">
          {data.bodyText || 'Enter your letter text...'}
        </div>

        {/* Sign off */}
        <div className="mt-8 text-xs text-slate-800 font-sans whitespace-pre-wrap">
          {data.signOff}
        </div>
      </div>

      <div className="text-[10px] text-slate-400 text-center font-sans">
        Professional Classic Template
      </div>
    </div>
  )
}
