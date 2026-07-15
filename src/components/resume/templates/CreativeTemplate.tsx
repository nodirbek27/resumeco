import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function CreativeTemplate({ data, accentDark, accentSoft2 }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#1e293b',
        backgroundColor: '#ffffff',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div>
        {/* Colorful top banner header */}
        <div
          style={{
            color: '#ffffff',
            padding: '24px',
            position: 'relative',
            background: `linear-gradient(to right, ${data.accentColor}, ${accentDark})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '0.025em' }}>
                {data.fullname || 'Enter Full Name'}
              </h2>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: '4px',
                  color: accentSoft2,
                }}
              >
                {data.title || 'Job Title'}
              </p>

              {/* Contact details small grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  columnGap: '16px',
                  rowGap: '4px',
                  fontSize: '10px',
                  marginTop: '16px',
                  fontFamily: 'monospace',
                  color: accentSoft2,
                }}
              >
                {data.email && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <EmailIcon sx={{ fontSize: 12 }} /> {data.email}
                  </span>
                )}
                {data.phone && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <PhoneIcon sx={{ fontSize: 12 }} /> {data.phone}
                  </span>
                )}
                {data.address && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <PlaceIcon sx={{ fontSize: 12 }} /> {data.address}
                  </span>
                )}
                {data.website && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <LanguageIcon sx={{ fontSize: 12 }} /> {data.website}
                  </span>
                )}
              </div>
            </div>

            {/* Small round image */}
            {data.photo && (
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '9999px',
                  border: '2px solid',
                  borderColor: data.accentColor,
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: '#0f172a',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
                }}
              >
                <img
                  src={data.photo}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>

        {/* Main content in columns */}
        <div
          style={{
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: '24px',
          }}
        >
          {/* Left side */}
          <div
            style={{
              gridColumn: 'span 8 / span 8',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Summary */}
            {data.summary && (
              <div>
                <h3
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '8px',
                    color: data.accentColor,
                  }}
                >
                  Profile
                </h3>
                <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.625, textAlign: 'justify' }}>
                  {data.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                  color: data.accentColor,
                }}
              >
                Experience
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {data.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontSize: '12px',
                      position: 'relative',
                      paddingLeft: '16px',
                      borderLeft: '2px solid',
                      borderColor: data.accentColor,
                    }}
                  >
                    {/* Bullet dot */}
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '9999px',
                        position: 'absolute',
                        left: '-5px',
                        top: '4px',
                        backgroundColor: data.accentColor,
                      }}
                    ></span>
                    <div style={{ fontWeight: 600 }}>
                      <h4 style={{ color: '#1e293b', fontWeight: 700 }}>{exp.position}</h4>
                      <div style={{ fontSize: '9px', marginTop: '2px', color: data.accentColor }}>
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    <p style={{ color: '#64748b', fontWeight: 500, fontSize: '10px', marginTop: '2px' }}>
                      {exp.company}
                    </p>
                    <p
                      style={{
                        color: '#475569',
                        marginTop: '4px',
                        fontSize: '11px',
                        lineHeight: 1.625,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {exp.description}
                    </p>
                  </div>
                ))}
                {data.experience.length === 0 && (
                  <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>No experience added</p>
                )}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div
            style={{
              gridColumn: 'span 4 / span 4',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Education */}
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                  color: data.accentColor,
                }}
              >
                Education
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.education.map((edu, idx) => (
                  <div key={idx} style={{ fontSize: '11px' }}>
                    <strong style={{ color: '#1e293b', display: 'block', fontSize: '12px' }}>{edu.degree}</strong>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '10px' }}>{edu.school}</span>
                    <span style={{ fontSize: '9px', fontFamily: 'monospace', color: '#94a3b8', display: 'block' }}>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                ))}
                {data.education.length === 0 && (
                  <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>No education added</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                  color: data.accentColor,
                }}
              >
                Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '12px', rowGap: '6px' }}>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    style={{ fontSize: '10px', fontWeight: 700, color: data.accentColor }}
                  >
                    &#8226; {skill}
                  </span>
                ))}
                {!data.skills && (
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>Not provided</span>
                )}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                  color: data.accentColor,
                }}
              >
                Languages
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: '#475569',
                  lineHeight: 1.625,
                  whiteSpace: 'pre-line',
                }}
              >
                {data.languages || 'Not provided'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', paddingBottom: '16px' }}>
        Creative Accent Template
      </div>
    </div>
  )
}
