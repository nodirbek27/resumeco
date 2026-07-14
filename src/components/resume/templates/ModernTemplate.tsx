import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function ModernTemplate({ data }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

  return (
    <div
      className="h-full grid grid-cols-12 text-slate-800 bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Sidebar */}
      <div className="col-span-4 bg-slate-900 text-slate-100 p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-center mb-6">
            {data.photo ? (
              <img
                src={data.photo}
                className="w-24 h-24 rounded-full object-cover border-2 border-slate-700 shadow-md"
                alt=""
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400 text-xs">
                No Photo
              </div>
            )}
          </div>

          <h4
            className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b border-slate-800"
            style={{ color: data.accentColor }}
          >
            Contact
          </h4>
          <ul className="list-none m-0 pl-0 space-y-3.5 text-xs text-slate-300">
            {data.phone && (
              <li className="flex items-start gap-2">
                <PhoneIcon sx={{ fontSize: 14, color: data.accentColor, mt: '2px' }} />
                <span className="break-all">{data.phone}</span>
              </li>
            )}
            {data.email && (
              <li className="flex items-start gap-2">
                <EmailIcon sx={{ fontSize: 14, color: data.accentColor, mt: '2px' }} />
                <span className="break-all">{data.email}</span>
              </li>
            )}
            {data.address && (
              <li className="flex items-start gap-2">
                <PlaceIcon sx={{ fontSize: 14, color: data.accentColor, mt: '2px' }} />
                <span>{data.address}</span>
              </li>
            )}
            {data.website && (
              <li className="flex items-start gap-2">
                <LanguageIcon sx={{ fontSize: 14, color: data.accentColor, mt: '2px' }} />
                <span className="break-all">{data.website}</span>
              </li>
            )}
          </ul>

          <h4
            className="text-xs font-bold uppercase tracking-widest mt-8 mb-3 pb-1 border-b border-slate-800"
            style={{ color: data.accentColor }}
          >
            Skills
          </h4>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {skills.map((skill) => (
              <span key={skill} className="text-[10px] text-slate-300 font-mono">
                &#8226; {skill}
              </span>
            ))}
            {!data.skills && <span className="text-xs text-slate-500 italic">Not provided</span>}
          </div>

          <h4
            className="text-xs font-bold uppercase tracking-widest mt-8 mb-3 pb-1 border-b border-slate-800"
            style={{ color: data.accentColor }}
          >
            Languages
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
            {data.languages || 'Not provided'}
          </p>
        </div>

        <div className="text-[10px] text-slate-600 text-center border-t border-slate-800 pt-3">
          Modern Minimalist
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-8 p-8 flex flex-col justify-between h-full bg-slate-50/30">
        <div>
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              {data.fullname || 'Enter Full Name'}
            </h2>
            <p
              className="text-sm font-bold uppercase tracking-wider mt-1"
              style={{ color: data.accentColor }}
            >
              {data.title || 'Job Title'}
            </p>
          </div>

          {data.summary && (
            <div className="mb-6">
              <p className="text-xs text-slate-600 leading-relaxed italic">{data.summary}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-200 pb-2">
              Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{exp.position}</h4>
                      <p className="text-slate-600 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: data.accentColor }}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1 text-[11px] leading-relaxed whitespace-pre-wrap">
                    {exp.description}
                  </p>
                </div>
              ))}
              {data.experience.length === 0 && (
                <p className="text-xs text-slate-400 italic">No experience added</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-200 pb-2">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{edu.degree}</h4>
                      <p className="text-slate-600 font-semibold">{edu.school}</p>
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: data.accentColor }}>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-slate-500 mt-1 text-[11px] leading-relaxed whitespace-pre-wrap">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
              {data.education.length === 0 && (
                <p className="text-xs text-slate-400 italic">No education added</p>
              )}
            </div>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 text-right">Generated as PDF</div>
      </div>
    </div>
  )
}
