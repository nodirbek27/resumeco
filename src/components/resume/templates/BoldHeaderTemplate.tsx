import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function BoldHeaderTemplate({ data }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div>
        {/* Solid bold header banner */}
        <div style={{ padding: '32px', color: '#ffffff', background: data.accentColor }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '30px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.025em',
                  lineHeight: 1,
                }}
              >
                {data.fullname || 'Enter Full Name'}
              </h2>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  color: 'rgba(255,255,255,0.8)',
                  marginTop: '8px',
                }}
              >
                {data.title || 'Job Title'}
              </p>
            </div>
            {data.photo && (
              <img
                src={data.photo}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '2px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
                  flexShrink: 0,
                }}
                alt=""
              />
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: '20px',
              rowGap: '4px',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.9)',
              marginTop: '20px',
              fontFamily: 'monospace',
            }}
          >
            {data.email && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <EmailIcon sx={{ fontSize: 13 }} /> {data.email}
              </span>
            )}
            {data.phone && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <PhoneIcon sx={{ fontSize: 13 }} /> {data.phone}
              </span>
            )}
            {data.address && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <PlaceIcon sx={{ fontSize: 13 }} /> {data.address}
              </span>
            )}
            {data.website && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <LanguageIcon sx={{ fontSize: 13 }} /> {data.website}
              </span>
            )}
          </div>
        </div>

        {/* Body: sidebar + main */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: '24px',
            padding: '32px',
          }}
        >
          {/* Sidebar (left) */}
          <div
            style={{
              gridColumn: 'span 4 / span 4',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '2px', background: data.accentColor }}
                ></span>
                Skills
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {skills.map((skill) => (
                  <span key={skill} style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>
                    {skill}
                  </span>
                ))}
                {!data.skills && (
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
                    Not provided
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '2px', background: data.accentColor }}
                ></span>
                Languages
              </h3>
              <p
                style={{
                  fontSize: '11px',
                  color: '#334155',
                  lineHeight: 1.625,
                  whiteSpace: 'pre-line',
                }}
              >
                {data.languages || 'Not provided'}
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '2px', background: data.accentColor }}
                ></span>
                Education
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.education.map((edu, idx) => (
                  <div key={idx} style={{ fontSize: '11px' }}>
                    <strong style={{ color: '#0f172a', display: 'block' }}>{edu.degree}</strong>
                    <span style={{ color: '#64748b', display: 'block' }}>{edu.school}</span>
                    <span
                      style={{
                        color: '#94a3b8',
                        display: 'block',
                        fontFamily: 'monospace',
                        fontSize: '10px',
                      }}
                    >
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                ))}
                {data.education.length === 0 && (
                  <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
                    No education added
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Main (right) */}
          <div
            style={{
              gridColumn: 'span 8 / span 8',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {data.summary && (
              <div>
                <h3
                  style={{
                    fontSize: '12px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{ width: '8px', height: '8px', borderRadius: '2px', background: data.accentColor }}
                  ></span>
                  Profile
                </h3>
                <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.625 }}>{data.summary}</p>
              </div>
            )}
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '2px', background: data.accentColor }}
                ></span>
                Experience
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {data.experience.map((exp, idx) => (
                  <div key={idx} style={{ fontSize: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h4 style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>
                        {exp.position}
                      </h4>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: data.accentColor }}>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p style={{ color: '#475569', fontWeight: 600, fontSize: '11px' }}>{exp.company}</p>
                    <p
                      style={{
                        color: '#64748b',
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
                  <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
                    No experience added
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', paddingBottom: '16px' }}>
        Bold Header Template
      </div>
    </div>
  )
}
