import type { CoverLetterTemplateProps } from './types'

export default function TimelineTemplate({ data }: CoverLetterTemplateProps) {
  return (
    <div
      className="h-full p-10 flex flex-col justify-between bg-white text-slate-800"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {data.senderName || 'Your Name'}
          </h2>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mt-2">
            {data.senderTitle}
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-500 mt-3 font-mono">
            {data.senderEmail && <span>{data.senderEmail}</span>}
            {data.senderPhone && <span>{data.senderPhone}</span>}
            {data.senderWebsite && <span>{data.senderWebsite}</span>}
          </div>
        </div>

        {/* Meta block with decorative timeline spine */}
        <div className="relative pl-6 border-l-2 border-slate-100 mb-8">
          <span className="absolute -left-[7px] top-0.5 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white"></span>
          <div className="flex justify-between items-start text-xs">
            <div className="space-y-0.5 text-slate-600">
              <strong className="text-slate-800">{data.recipientName}</strong>
              <p>{data.recipientTitle}</p>
              <p className="font-semibold">{data.companyName}</p>
              <p className="text-[11px] text-slate-500">{data.companyAddress}</p>
            </div>
            <div className="text-slate-500 font-mono text-[11px]">{data.date}</div>
          </div>
        </div>

        {/* Subject Line */}
        <div className="mb-4 text-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800">
            Subject: {data.subject || 'Job Application'}
          </h3>
        </div>

        {/* Salutation */}
        <p className="text-xs font-bold mb-4 text-slate-900">{data.salutation}</p>

        {/* Letter Body */}
        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap space-y-4">
          {data.bodyText || 'Write your letter text here...'}
        </div>

        {/* Sign off */}
        <div className="mt-8 text-xs text-slate-800 whitespace-pre-wrap">{data.signOff}</div>
      </div>

      <div className="text-[10px] text-slate-400 text-center pt-6">Elegant Timeline Template</div>
    </div>
  )
}
