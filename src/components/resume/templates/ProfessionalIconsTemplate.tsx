import { PersonOutlineIcon, WorkOutlineIcon, SchoolOutlinedIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function ProfessionalIconsTemplate({ data }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

  return (
    <div
      className="h-full flex flex-col bg-white text-slate-800 p-10"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header row: photo + name */}
      <div className="flex items-center gap-4 pb-6 border-b border-slate-200 mb-6">
        {data.photo ? (
          <img
            src={data.photo}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
            alt=""
          />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-[9px] flex-shrink-0">
            No Photo
          </div>
        )}
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
            {data.fullname || 'Enter Full Name'}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {data.title || 'Job Title'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-1">
        {/* Main (left) */}
        <div className="col-span-8 space-y-5">
          {data.summary && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2 flex items-center gap-1.5">
                <PersonOutlineIcon sx={{ fontSize: 14, color: data.accentColor }} />
                Summary
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{data.summary}</p>
            </div>
          )}

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2 flex items-center gap-1.5">
              <WorkOutlineIcon sx={{ fontSize: 14, color: data.accentColor }} />
              Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="text-xs">
                  <h4 className="font-bold text-slate-800 text-sm">
                    {exp.position}, {exp.company}
                  </h4>
                  <p className="text-slate-400 text-[10px] font-semibold mb-1">
                    {exp.startDate} — {exp.endDate}
                  </p>
                  <p className="text-slate-500 text-[11px] leading-relaxed whitespace-pre-wrap">
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2 flex items-center gap-1.5">
              <SchoolOutlinedIcon sx={{ fontSize: 14, color: data.accentColor }} />
              Education
            </h3>
            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx} className="text-xs">
                  <h4 className="font-bold text-slate-800 text-sm">
                    {edu.degree}, {edu.school}
                  </h4>
                  <p className="text-slate-400 text-[10px] font-semibold">
                    {edu.startDate} — {edu.endDate}
                  </p>
                  {edu.description && (
                    <p className="text-slate-500 text-[11px] mt-0.5">{edu.description}</p>
                  )}
                </div>
              ))}
              {data.education.length === 0 && (
                <p className="text-xs text-slate-400 italic">No education added</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar (right) */}
        <div className="col-span-4 space-y-5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2">
              Details
            </h3>
            <div className="space-y-1 text-[11px] text-slate-600">
              {data.address && <p>{data.address}</p>}
              {data.phone && <p>{data.phone}</p>}
              {data.email && <p className="break-all">{data.email}</p>}
              {data.website && <p className="break-all">{data.website}</p>}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2">
              Skills
            </h3>
            <div className="space-y-1 text-[11px] text-slate-600">
              {skills.map((skill) => (
                <p key={skill}>{skill}</p>
              ))}
              {!data.skills && <p className="text-slate-400 italic">Not provided</p>}
            </div>
          </div>

          {data.languages && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2">
                Languages
              </h3>
              <p className="text-[11px] text-slate-600 whitespace-pre-line">{data.languages}</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-[10px] text-slate-400 text-right pt-6">Generated as PDF</div>
    </div>
  )
}
