import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { type ResumeTemplateProps } from './types'

export default function ClassicTemplate({ data }: ResumeTemplateProps) {
  return (
    <div
      className="h-full p-8 flex flex-col justify-between text-slate-800 bg-white"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      <div>
        {/* Top Centered Header */}
        <div className="text-center pb-4 border-b-2 border-slate-800 mb-6">
          <h2 className="text-3xl font-extrabold tracking-wide text-slate-900">
            {data.fullname || 'Enter Full Name'}
          </h2>
          <p
            className="text-xs font-bold uppercase tracking-widest mt-1.5"
            style={{ fontFamily: 'sans-serif', color: data.accentColor }}
          >
            {data.title || 'Job Title'}
          </p>

          {/* Contact line */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-500 mt-3 font-sans">
            {data.email && (
              <span className="inline-flex items-center gap-1">
                <EmailIcon sx={{ fontSize: 12 }} /> {data.email}
              </span>
            )}
            {data.phone && (
              <span className="inline-flex items-center gap-1">
                <PhoneIcon sx={{ fontSize: 12 }} /> {data.phone}
              </span>
            )}
            {data.address && (
              <span className="inline-flex items-center gap-1">
                <PlaceIcon sx={{ fontSize: 12 }} /> {data.address}
              </span>
            )}
            {data.website && (
              <span className="inline-flex items-center gap-1">
                <LanguageIcon sx={{ fontSize: 12 }} /> {data.website}
              </span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2 font-sans border-b border-slate-200 pb-2">
              Summary
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">{data.summary}</p>
          </div>
        )}

        {/* Experience Section */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-3 font-sans border-b border-slate-200 pb-2">
            Experience
          </h3>
          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-baseline font-sans">
                  <div className="flex gap-2">
                    <strong className="text-slate-900 text-sm font-serif">{exp.position}</strong>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-700 font-medium">{exp.company}</span>
                  </div>
                  <span className="text-[10px] text-slate-600 font-semibold">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-slate-600 mt-1.5 text-[11px] leading-relaxed text-justify whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
            {data.experience.length === 0 && (
              <p className="text-xs text-slate-400 italic font-sans">No experience added</p>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-3 font-sans border-b border-slate-200 pb-2">
            Education
          </h3>
          <div className="space-y-3">
            {data.education.map((edu, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-baseline font-sans">
                  <div className="flex gap-2">
                    <strong className="text-slate-900 text-sm font-serif">{edu.degree}</strong>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-700 font-medium">{edu.school}</span>
                  </div>
                  <span className="text-[10px] text-slate-600 font-semibold">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-slate-600 mt-1 text-[11px] leading-relaxed whitespace-pre-wrap">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
            {data.education.length === 0 && (
              <p className="text-xs text-slate-400 italic font-sans">No education added</p>
            )}
          </div>
        </div>

        {/* Grid of Skills and Languages */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2 font-sans border-b border-slate-200 pb-2">
              Skills
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {data.skills || 'Not provided'}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2 font-sans border-b border-slate-200 pb-2">
              Languages
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {data.languages || 'Not provided'}
            </p>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-400 text-center font-sans">
        Professional Classic Template
      </div>
    </div>
  )
}
