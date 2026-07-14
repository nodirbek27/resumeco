import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function ExecutivePhotoTemplate({ data }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

  return (
    <div
      className="h-full flex flex-col bg-white text-slate-800"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header band with overlapping photo */}
      <div className="relative bg-slate-900 pt-6 pb-10 pl-32 pr-8">
        <h2 className="text-2xl font-extrabold text-white uppercase tracking-wide leading-tight">
          {data.fullname || 'Enter Full Name'}
        </h2>
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest mt-1.5">
          {data.title || 'Job Title'}
        </p>
        <div className="absolute left-8 -bottom-8 w-20 h-20 rounded-md overflow-hidden border-4 border-white shadow-lg bg-slate-200">
          {data.photo ? (
            <img src={data.photo} className="w-full h-full object-cover" alt="" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-[9px]">
              No Photo
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 flex-1">
        {/* Sidebar (left) */}
        <div className="col-span-4 bg-slate-100 pt-12 pb-6 px-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-3">
            Details
          </h3>
          <ul className="list-none m-0 pl-0 space-y-2.5 text-[11px] text-slate-600 mb-6">
            {data.email && (
              <li className="flex items-start gap-2">
                <EmailIcon sx={{ fontSize: 13 }} className="mt-0.5" />
                <span className="break-all">{data.email}</span>
              </li>
            )}
            {data.address && (
              <li className="flex items-start gap-2">
                <PlaceIcon sx={{ fontSize: 13 }} className="mt-0.5" />
                <span>{data.address}</span>
              </li>
            )}
            {data.phone && (
              <li className="flex items-start gap-2">
                <PhoneIcon sx={{ fontSize: 13 }} className="mt-0.5" />
                <span>{data.phone}</span>
              </li>
            )}
            {data.website && (
              <li className="flex items-start gap-2">
                <LanguageIcon sx={{ fontSize: 13 }} className="mt-0.5" />
                <span className="break-all">{data.website}</span>
              </li>
            )}
          </ul>

          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-3">
            Skills
          </h3>
          <ul className="m-0 pl-0 space-y-1.5 text-[11px] text-slate-600 mb-6 list-disc list-inside">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
            {!data.skills && <li className="text-slate-400 italic list-none">Not provided</li>}
          </ul>

          {data.languages && (
            <>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2 border-t border-slate-300 pt-4">
                Languages
              </h3>
              <p className="text-[11px] font-bold text-slate-700 leading-relaxed whitespace-pre-line">
                {data.languages}
              </p>
            </>
          )}
        </div>

        {/* Main (right) */}
        <div className="col-span-8 pt-8 pb-6 px-8">
          {data.summary && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2">
                Summary
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{data.summary}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">
              Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {exp.position}, {exp.company}
                  </h4>
                  <p className="text-slate-400 text-[10px] font-semibold mt-0.5 mb-1.5">
                    {exp.startDate} — {exp.endDate}
                  </p>
                  <ul className="m-0 pl-0 list-disc list-inside space-y-0.5 text-slate-500 text-[11px] leading-relaxed">
                    {exp.description
                      .split('\n')
                      .filter(Boolean)
                      .map((line, lidx) => (
                        <li key={lidx}>{line}</li>
                      ))}
                  </ul>
                </div>
              ))}
              {data.experience.length === 0 && (
                <p className="text-xs text-slate-400 italic">No experience added</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">
              Education
            </h3>
            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx} className="text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {edu.degree}, {edu.school}
                  </h4>
                  <p className="text-slate-400 text-[10px] font-semibold mt-0.5">
                    {edu.startDate} — {edu.endDate}
                  </p>
                  {edu.description && (
                    <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
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
      </div>
    </div>
  )
}
