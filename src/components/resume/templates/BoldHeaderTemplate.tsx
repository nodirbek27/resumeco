import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function BoldHeaderTemplate({ data }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

  return (
    <div
      className="h-full flex flex-col justify-between bg-white text-slate-800"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div>
        {/* Solid bold header banner */}
        <div className="p-8 text-white" style={{ background: data.accentColor }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-wide leading-none">
                {data.fullname || 'Enter Full Name'}
              </h2>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80 mt-2">
                {data.title || 'Job Title'}
              </p>
            </div>
            {data.photo && (
              <img
                src={data.photo}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/50 shadow-md flex-shrink-0"
                alt=""
              />
            )}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-white/90 mt-5 font-mono">
            {data.email && (
              <span>
                <EmailIcon sx={{ fontSize: 13 }} /> {data.email}
              </span>
            )}
            {data.phone && (
              <span>
                <PhoneIcon sx={{ fontSize: 13 }} /> {data.phone}
              </span>
            )}
            {data.address && (
              <span>
                <PlaceIcon sx={{ fontSize: 13 }} /> {data.address}
              </span>
            )}
            {data.website && (
              <span>
                <LanguageIcon sx={{ fontSize: 13 }} /> {data.website}
              </span>
            )}
          </div>
        </div>

        {/* Body: sidebar + main */}
        <div className="grid grid-cols-12 gap-6 p-8">
          {/* Sidebar (left) */}
          <div className="col-span-4 space-y-6">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-sm"
                  style={{ background: data.accentColor }}
                ></span>
                Skills
              </h3>
              <div className="flex flex-col gap-1.5">
                {skills.map((skill) => (
                  <span key={skill} className="text-[11px] font-semibold text-slate-700">
                    {skill}
                  </span>
                ))}
                {!data.skills && (
                  <span className="text-xs text-slate-400 italic">Not provided</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-sm"
                  style={{ background: data.accentColor }}
                ></span>
                Languages
              </h3>
              <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-line">
                {data.languages || 'Not provided'}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-sm"
                  style={{ background: data.accentColor }}
                ></span>
                Education
              </h3>
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="text-[11px]">
                    <strong className="text-slate-900 block">{edu.degree}</strong>
                    <span className="text-slate-500 block">{edu.school}</span>
                    <span className="text-slate-400 block font-mono text-[10px]">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                ))}
                {data.education.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No education added</p>
                )}
              </div>
            </div>
          </div>

          {/* Main (right) */}
          <div className="col-span-8 space-y-5">
            {data.summary && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-sm"
                    style={{ background: data.accentColor }}
                  ></span>
                  Profile
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{data.summary}</p>
              </div>
            )}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-sm"
                  style={{ background: data.accentColor }}
                ></span>
                Experience
              </h3>
              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-slate-900 text-sm">{exp.position}</h4>
                      <span className="text-[10px] font-bold" style={{ color: data.accentColor }}>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-slate-600 font-semibold text-[11px]">{exp.company}</p>
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
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-400 text-center pb-4">Bold Header Template</div>
    </div>
  )
}
