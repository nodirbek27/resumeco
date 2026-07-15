import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function SidebarRightTemplate({ data }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

  return (
    <div
      style={{
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        color: '#1e293b',
        backgroundColor: '#ffffff',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Main Content (left) */}
      <div
        style={{
          gridColumn: 'span 8 / span 8',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div>
          <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
            {data.fullname || 'Enter Full Name'}
          </h2>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginTop: '4px',
              color: data.accentColor,
            }}
          >
            {data.title || 'Job Title'}
          </p>

          {data.summary && (
            <p
              style={{
                fontSize: '12px',
                color: '#475569',
                lineHeight: 1.625,
                fontStyle: 'italic',
                marginTop: '16px',
                marginBottom: '24px',
              }}
            >
              {data.summary}
            </p>
          )}

          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#94a3b8',
                marginBottom: '12px',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '4px',
              }}
            >
              Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.experience.map((exp, idx) => (
                <div key={idx} style={{ fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '14px' }}>{exp.position}</h4>
                      <p style={{ color: '#475569', fontWeight: 600 }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: data.accentColor }}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
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
                <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>No experience added</p>
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
                color: '#94a3b8',
                marginBottom: '12px',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '4px',
              }}
            >
              Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.education.map((edu, idx) => (
                <div key={idx} style={{ fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '14px' }}>{edu.degree}</h4>
                      <p style={{ color: '#475569', fontWeight: 600 }}>{edu.school}</p>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: data.accentColor }}>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p
                      style={{
                        color: '#64748b',
                        marginTop: '4px',
                        fontSize: '11px',
                        lineHeight: 1.625,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
              {data.education.length === 0 && (
                <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>No education added</p>
              )}
            </div>
          </div>
        </div>

        <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'right' }}>Generated as PDF</div>
      </div>

      {/* Sidebar (right) */}
      <div
        style={{
          gridColumn: 'span 4 / span 4',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          background: data.accentColor,
        }}
      >
        <div style={{ color: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            {data.photo ? (
              <img
                src={data.photo}
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '9999px',
                  objectFit: 'cover',
                  border: '2px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
                }}
                alt=""
              />
            ) : (
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '12px',
                }}
              >
                No Photo
              </div>
            )}
          </div>

          <h4
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px',
              paddingBottom: '4px',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            Contact
          </h4>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              paddingLeft: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {data.phone && (
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <PhoneIcon sx={{ fontSize: 14, mt: '2px' }} />
                <span style={{ wordBreak: 'break-all' }}>{data.phone}</span>
              </li>
            )}
            {data.email && (
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <EmailIcon sx={{ fontSize: 14, mt: '2px' }} />
                <span style={{ wordBreak: 'break-all' }}>{data.email}</span>
              </li>
            )}
            {data.address && (
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <PlaceIcon sx={{ fontSize: 14, mt: '2px' }} />
                <span>{data.address}</span>
              </li>
            )}
            {data.website && (
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <LanguageIcon sx={{ fontSize: 14, mt: '2px' }} />
                <span style={{ wordBreak: 'break-all' }}>{data.website}</span>
              </li>
            )}
          </ul>

          <h4
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginTop: '32px',
              marginBottom: '12px',
              paddingBottom: '4px',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            Skills
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '12px', rowGap: '6px' }}>
            {skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: '10px',
                  color: '#ffffff',
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                }}
              >
                &#8226; {skill}
              </span>
            ))}
            {!data.skills && (
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
                Not provided
              </span>
            )}
          </div>

          <h4
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginTop: '32px',
              marginBottom: '12px',
              paddingBottom: '4px',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            Languages
          </h4>
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.625,
              whiteSpace: 'pre-line',
            }}
          >
            {data.languages || 'Not provided'}
          </p>
        </div>

        <div
          style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '12px',
          }}
        >
          Sidebar Right
        </div>
      </div>
    </div>
  )
}
