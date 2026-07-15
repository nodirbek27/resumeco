import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function ExecutivePhotoTemplate({ data }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header band with overlapping photo */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#0f172a',
          paddingTop: '24px',
          paddingBottom: '40px',
          paddingLeft: '128px',
          paddingRight: '32px',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '0.025em',
            lineHeight: 1.25,
          }}
        >
          {data.fullname || 'Enter Full Name'}
        </h2>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#cbd5e1',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginTop: '6px',
          }}
        >
          {data.title || 'Job Title'}
        </p>
        <div
          style={{
            position: 'absolute',
            left: '32px',
            bottom: '-32px',
            width: '80px',
            height: '80px',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '4px solid #ffffff',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
            backgroundColor: '#e2e8f0',
          }}
        >
          {data.photo ? (
            <img
              src={data.photo}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt=""
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontSize: '9px',
              }}
            >
              No Photo
            </div>
          )}
        </div>
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', flex: '1 1 0%' }}
      >
        {/* Sidebar (left) */}
        <div
          style={{
            gridColumn: 'span 4 / span 4',
            backgroundColor: '#f1f5f9',
            paddingTop: '48px',
            paddingBottom: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
        >
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#1e293b',
              marginBottom: '12px',
            }}
          >
            Details
          </h3>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              paddingLeft: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '11px',
              color: '#475569',
              marginBottom: '24px',
            }}
          >
            {data.email && (
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <EmailIcon sx={{ fontSize: 13 }} style={{ marginTop: '2px' }} />
                <span style={{ wordBreak: 'break-all' }}>{data.email}</span>
              </li>
            )}
            {data.address && (
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <PlaceIcon sx={{ fontSize: 13 }} style={{ marginTop: '2px' }} />
                <span>{data.address}</span>
              </li>
            )}
            {data.phone && (
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <PhoneIcon sx={{ fontSize: 13 }} style={{ marginTop: '2px' }} />
                <span>{data.phone}</span>
              </li>
            )}
            {data.website && (
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <LanguageIcon sx={{ fontSize: 13 }} style={{ marginTop: '2px' }} />
                <span style={{ wordBreak: 'break-all' }}>{data.website}</span>
              </li>
            )}
          </ul>

          <h3
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#1e293b',
              marginBottom: '12px',
            }}
          >
            Skills
          </h3>
          <ul
            style={{
              listStyleType: 'disc',
              listStylePosition: 'inside',
              margin: 0,
              paddingLeft: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '11px',
              color: '#475569',
              marginBottom: '24px',
            }}
          >
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
            {!data.skills && (
              <li style={{ color: '#94a3b8', fontStyle: 'italic', listStyle: 'none' }}>
                Not provided
              </li>
            )}
          </ul>

          {data.languages && (
            <>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#1e293b',
                  marginBottom: '8px',
                  borderTop: '1px solid #cbd5e1',
                  paddingTop: '16px',
                }}
              >
                Languages
              </h3>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#334155',
                  lineHeight: 1.625,
                  whiteSpace: 'pre-line',
                }}
              >
                {data.languages}
              </p>
            </>
          )}
        </div>

        {/* Main (right) */}
        <div
          style={{
            gridColumn: 'span 8 / span 8',
            paddingTop: '32px',
            paddingBottom: '24px',
            paddingLeft: '32px',
            paddingRight: '32px',
          }}
        >
          {data.summary && (
            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#0f172a',
                  marginBottom: '8px',
                }}
              >
                Summary
              </h3>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.625 }}>
                {data.summary}
              </p>
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#0f172a',
                marginBottom: '12px',
              }}
            >
              Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.experience.map((exp, idx) => (
                <div key={idx} style={{ fontSize: '12px' }}>
                  <h4 style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>
                    {exp.position}, {exp.company}
                  </h4>
                  <p
                    style={{
                      color: '#94a3b8',
                      fontSize: '10px',
                      fontWeight: 600,
                      marginTop: '2px',
                      marginBottom: '6px',
                    }}
                  >
                    {exp.startDate} — {exp.endDate}
                  </p>
                  <ul
                    style={{
                      listStyleType: 'disc',
                      listStylePosition: 'inside',
                      margin: 0,
                      paddingLeft: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      color: '#64748b',
                      fontSize: '11px',
                      lineHeight: 1.625,
                    }}
                  >
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
                color: '#0f172a',
                marginBottom: '12px',
              }}
            >
              Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.education.map((edu, idx) => (
                <div key={idx} style={{ fontSize: '12px' }}>
                  <h4 style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>
                    {edu.degree}, {edu.school}
                  </h4>
                  <p
                    style={{
                      color: '#94a3b8',
                      fontSize: '10px',
                      fontWeight: 600,
                      marginTop: '2px',
                    }}
                  >
                    {edu.startDate} — {edu.endDate}
                  </p>
                  {edu.description && (
                    <p
                      style={{
                        color: '#64748b',
                        fontSize: '11px',
                        marginTop: '4px',
                        lineHeight: 1.625,
                      }}
                    >
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
      </div>
    </div>
  )
}
