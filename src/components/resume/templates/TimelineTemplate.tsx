import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function TimelineTemplate({ data }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

  return (
    <div
      className="h-full p-10 flex flex-col justify-between bg-white text-slate-800"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div>
        {/* Centered header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {data.fullname || 'Enter Full Name'}
          </h2>
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mt-2"
            style={{ color: data.accentColor }}
          >
            {data.title || 'Job Title'}
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-500 mt-4">
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
        </div>

        {data.summary && (
          <p className="text-xs text-slate-600 leading-relaxed text-center italic mb-8 px-6">
            {data.summary}
          </p>
        )}

        {/* Experience timeline */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-4 text-center">
            Experience
          </h3>
          <div className="relative pl-6 border-l-2 border-slate-100 space-y-6">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="relative text-xs">
                <span
                  className="absolute -left-[30px] top-0.5 w-3 h-3 rounded-full border-2 border-white"
                  style={{ background: data.accentColor }}
                ></span>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-slate-900 text-sm">{exp.position}</h4>
                  <span className="text-[10px] font-semibold text-slate-400">
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

        {/* Education timeline */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-4 text-center">
            Education
          </h3>
          <div className="relative pl-6 border-l-2 border-slate-100 space-y-6">
            {data.education.map((edu, idx) => (
              <div key={idx} className="relative text-xs">
                <span
                  className="absolute -left-[30px] top-0.5 w-3 h-3 rounded-full border-2 border-white"
                  style={{ background: data.accentColor }}
                ></span>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-slate-900 text-sm">{edu.degree}</h4>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-slate-600 font-semibold text-[11px]">{edu.school}</p>
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

        {/* Skills & Languages */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2 text-center">
              Skills
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-x-1.5 gap-y-1">
              {skills.map((skill, idx) => (
                <span key={skill} className="flex items-center gap-x-1.5">
                  {idx > 0 && <span className="text-slate-300 text-[10px]">&#8226;</span>}
                  <span className="text-[10px] font-semibold" style={{ color: data.accentColor }}>
                    {skill}
                  </span>
                </span>
              ))}
              {!data.skills && <span className="text-xs text-slate-400 italic">Not provided</span>}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2 text-center">
              Languages
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed text-center whitespace-pre-line">
              {data.languages || 'Not provided'}
            </p>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-400 text-center pt-6">Elegant Timeline Template</div>
    </div>
  )
}
