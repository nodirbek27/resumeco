import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function CreativeTemplate({ data, accentDark, accentSoft2 }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

  return (
    <div
      className="h-full flex flex-col justify-between text-slate-800 bg-white"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div>
        {/* Colorful top banner header */}
        <div
          className="text-white p-6 relative"
          style={{ background: `linear-gradient(to right, ${data.accentColor}, ${accentDark})` }}
        >
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-wide">
                {data.fullname || 'Enter Full Name'}
              </h2>
              <p
                className="text-xs font-semibold uppercase tracking-widest mt-1"
                style={{ color: accentSoft2 }}
              >
                {data.title || 'Job Title'}
              </p>

              {/* Contact details small grid */}
              <div
                className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] mt-4 font-mono"
                style={{ color: accentSoft2 }}
              >
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

            {/* Small round image */}
            {data.photo && (
              <div
                className="w-16 h-16 rounded-full border-2 overflow-hidden flex-shrink-0 bg-slate-900 shadow-md"
                style={{ borderColor: data.accentColor }}
              >
                <img src={data.photo} className="w-full h-full object-cover" alt="" />
              </div>
            )}
          </div>
        </div>

        {/* Main content in columns */}
        <div className="p-6 grid grid-cols-12 gap-6">
          {/* Left side */}
          <div className="col-span-8 space-y-5">
            {/* Summary */}
            {data.summary && (
              <div>
                <h3
                  className="text-xs font-extrabold uppercase tracking-widest mb-2"
                  style={{ color: data.accentColor }}
                >
                  Profile
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  {data.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            <div>
              <h3
                className="text-xs font-extrabold uppercase tracking-widest mb-2"
                style={{ color: data.accentColor }}
              >
                Experience
              </h3>
              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="text-xs relative pl-4 border-l-2"
                    style={{ borderColor: data.accentColor }}
                  >
                    {/* Bullet dot */}
                    <span
                      className="w-2 h-2 rounded-full absolute -left-[5px] top-1"
                      style={{ backgroundColor: data.accentColor }}
                    ></span>
                    <div className="font-semibold">
                      <h4 className="text-slate-800 font-bold">{exp.position}</h4>
                      <div className="text-[9px] mt-0.5" style={{ color: data.accentColor }}>
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    <p className="text-slate-500 font-medium text-[10px] mt-0.5">{exp.company}</p>
                    <p className="text-slate-600 mt-1 text-[11px] leading-relaxed whitespace-pre-wrap">
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

          {/* Right side */}
          <div className="col-span-4 space-y-5">
            {/* Education */}
            <div>
              <h3
                className="text-xs font-extrabold uppercase tracking-widest mb-2"
                style={{ color: data.accentColor }}
              >
                Education
              </h3>
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="text-[11px]">
                    <strong className="text-slate-800 block text-xs">{edu.degree}</strong>
                    <span className="text-slate-500 block text-[10px]">{edu.school}</span>
                    <span className="text-[9px] font-mono text-slate-400 block">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                ))}
                {data.education.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No education added</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3
                className="text-xs font-extrabold uppercase tracking-widest mb-2"
                style={{ color: data.accentColor }}
              >
                Skills
              </h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-bold"
                    style={{ color: data.accentColor }}
                  >
                    &#8226; {skill}
                  </span>
                ))}
                {!data.skills && <span className="text-xs text-slate-400 italic">Not provided</span>}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3
                className="text-xs font-extrabold uppercase tracking-widest mb-2"
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
      </div>

      <div className="text-[10px] text-slate-400 text-center pb-4">Creative Accent Template</div>
    </div>
  )
}
