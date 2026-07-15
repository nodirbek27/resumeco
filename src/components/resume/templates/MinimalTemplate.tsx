import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { type ResumeTemplateProps } from './types'

export default function MinimalTemplate({ data }: ResumeTemplateProps) {
  return (
    <div
      style={{
        height: '100%',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: `2px solid ${data.accentColor}`,
          }}
        >
          {data.photo && (
            <img
              src={data.photo}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '8px',
                objectFit: 'cover',
                flexShrink: 0,
              }}
              alt=""
            />
          )}
          <div>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.25,
              }}
            >
              {data.fullname || 'Enter Full Name'}
            </h2>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginTop: '4px',
                color: data.accentColor,
              }}
            >
              {data.title || 'Job Title'}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '16px',
            rowGap: '4px',
            fontSize: '10px',
            color: '#64748b',
            marginBottom: '24px',
            fontFamily: 'monospace',
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

        {data.summary && (
          <p
            style={{
              fontSize: '12px',
              color: '#475569',
              lineHeight: 1.625,
              marginBottom: '24px',
            }}
          >
            {data.summary}
          </p>
        )}

        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px',
              color: data.accentColor,
            }}
          >
            Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.experience.map((exp, idx) => (
              <div key={idx} style={{ fontSize: '12px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 600,
                    color: '#1e293b',
                  }}
                >
                  <span>
                    {exp.position} — {exp.company}
                  </span>
                  <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p
                  style={{
                    color: '#64748b',
                    fontSize: '11px',
                    marginTop: '2px',
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

        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px',
              color: data.accentColor,
            }}
          >
            Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.education.map((edu, idx) => (
              <div
                key={idx}
                style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}
              >
                <span style={{ fontWeight: 600, color: '#1e293b' }}>
                  {edu.degree}
                  {edu.school && <span>, {edu.school}</span>}
                </span>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '24px',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '8px',
                color: data.accentColor,
              }}
            >
              Skills
            </h3>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.625 }}>
              {data.skills || 'Not provided'}
            </p>
          </div>
          <div>
            <h3
              style={{
                fontSize: '11px',
                fontWeight: 700,
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

      <div
        style={{
          fontSize: '10px',
          color: '#94a3b8',
          textAlign: 'center',
          paddingTop: '16px',
        }}
      >
        Minimal Lines Template
      </div>
    </div>
  )
}
