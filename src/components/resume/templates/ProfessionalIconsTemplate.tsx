import { PersonOutlineIcon, WorkOutlineIcon, SchoolOutlinedIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function ProfessionalIconsTemplate({ data }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        padding: '40px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header row: photo + name */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          paddingBottom: '24px',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '24px',
        }}
      >
        {data.photo ? (
          <img
            src={data.photo}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '8px',
              objectFit: 'cover',
              flexShrink: 0,
            }}
            alt=""
          />
        ) : (
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '8px',
              backgroundColor: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              fontSize: '9px',
              flexShrink: 0,
            }}
          >
            No Photo
          </div>
        )}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
            {data.fullname || 'Enter Full Name'}
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>
            {data.title || 'Job Title'}
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          gap: '32px',
          flex: '1 1 0%',
        }}
      >
        {/* Main (left) */}
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
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#1e293b',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <PersonOutlineIcon sx={{ fontSize: 14, color: data.accentColor }} />
                Summary
              </h3>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.625 }}>
                {data.summary}
              </p>
            </div>
          )}

          <div>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#1e293b',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <WorkOutlineIcon sx={{ fontSize: 14, color: data.accentColor }} />
              Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.experience.map((exp, idx) => (
                <div key={idx} style={{ fontSize: '12px' }}>
                  <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '14px' }}>
                    {exp.position}, {exp.company}
                  </h4>
                  <p
                    style={{
                      color: '#94a3b8',
                      fontSize: '10px',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}
                  >
                    {exp.startDate} — {exp.endDate}
                  </p>
                  <p
                    style={{
                      color: '#64748b',
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

          <div>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#1e293b',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <SchoolOutlinedIcon sx={{ fontSize: 14, color: data.accentColor }} />
              Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.education.map((edu, idx) => (
                <div key={idx} style={{ fontSize: '12px' }}>
                  <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '14px' }}>
                    {edu.degree}, {edu.school}
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '10px', fontWeight: 600 }}>
                    {edu.startDate} — {edu.endDate}
                  </p>
                  {edu.description && (
                    <p style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>
                      {edu.description}
                    </p>
                  )}
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

        {/* Sidebar (right) */}
        <div
          style={{
            gridColumn: 'span 4 / span 4',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#1e293b',
                marginBottom: '8px',
              }}
            >
              Details
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: '11px',
                color: '#475569',
              }}
            >
              {data.address && <p>{data.address}</p>}
              {data.phone && <p>{data.phone}</p>}
              {data.email && <p style={{ wordBreak: 'break-all' }}>{data.email}</p>}
              {data.website && <p style={{ wordBreak: 'break-all' }}>{data.website}</p>}
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#1e293b',
                marginBottom: '8px',
              }}
            >
              Skills
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: '11px',
                color: '#475569',
              }}
            >
              {skills.map((skill) => (
                <p key={skill}>{skill}</p>
              ))}
              {!data.skills && (
                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Not provided</p>
              )}
            </div>
          </div>

          {data.languages && (
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#1e293b',
                  marginBottom: '8px',
                }}
              >
                Languages
              </h3>
              <p style={{ fontSize: '11px', color: '#475569', whiteSpace: 'pre-line' }}>
                {data.languages}
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          fontSize: '10px',
          color: '#94a3b8',
          textAlign: 'right',
          paddingTop: '24px',
        }}
      >
        Generated as PDF
      </div>
    </div>
  )
}
