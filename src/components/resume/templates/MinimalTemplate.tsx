import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { type ResumeTemplateProps } from './types'

export default function MinimalTemplate({ data }: ResumeTemplateProps) {
  return (
    <div
      className="h-full p-10 flex flex-col justify-between bg-white text-slate-800"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div>
        <div
          className="flex items-center gap-4 mb-6 pb-4"
          style={{ borderBottom: `2px solid ${data.accentColor}` }}
        >
          {data.photo && (
            <img
              src={data.photo}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              alt=""
            />
          )}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
              {data.fullname || 'Enter Full Name'}
            </h2>
            <p
              className="text-xs font-semibold uppercase tracking-wider mt-1"
              style={{ color: data.accentColor }}
            >
              {data.title || 'Job Title'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500 mb-6 font-mono">
          {data.email && (
            <span>
              <EmailIcon sx={{ fontSize: 12 }} /> {data.email}
            </span>
          )}
          {data.phone && (
            <span>
              <PhoneIcon sx={{ fontSize: 12 }} /> {data.phone}
            </span>
          )}
          {data.address && (
            <span>
              <PlaceIcon sx={{ fontSize: 12 }} /> {data.address}
            </span>
          )}
          {data.website && (
            <span>
              <LanguageIcon sx={{ fontSize: 12 }} /> {data.website}
            </span>
          )}
        </div>

        {data.summary && (
          <p className="text-xs text-slate-600 leading-relaxed mb-6">{data.summary}</p>
        )}

        <div className="mb-6">
          <h3
            className="text-[11px] font-bold uppercase tracking-widest mb-2"
            style={{ color: data.accentColor }}
          >
            Experience
          </h3>
          <div className="space-y-3">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>
                    {exp.position} — {exp.company}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
            {data.experience.length === 0 && (
              <p className="text-xs text-slate-400 italic">No experience added</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3
            className="text-[11px] font-bold uppercase tracking-widest mb-2"
            style={{ color: data.accentColor }}
          >
            Education
          </h3>
          <div className="space-y-2">
            {data.education.map((edu, idx) => (
              <div key={idx} className="text-xs flex justify-between">
                <span className="font-semibold text-slate-800">
                  {edu.degree}
                  {edu.school && <span>, {edu.school}</span>}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
            {data.education.length === 0 && (
              <p className="text-xs text-slate-400 italic">No education added</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-widest mb-2"
              style={{ color: data.accentColor }}
            >
              Skills
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {data.skills || 'Not provided'}
            </p>
          </div>
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-widest mb-2"
              style={{ color: data.accentColor }}
            >
              Languages
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {data.languages || 'Not provided'}
            </p>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-400 text-center pt-4">Minimal Lines Template</div>
    </div>
  )
}
