import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { type ResumeTemplateProps } from './types'

export default function ClassicTemplate({ data }: ResumeTemplateProps) {
  return (
    <div
      style={{
        height: '100%',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#1e293b',
        backgroundColor: '#ffffff',
        fontFamily: "'Georgia', serif",
      }}
    >
      <div>
        {/* Top Centered Header */}
        <div
          style={{
            textAlign: 'center',
            paddingBottom: '16px',
            borderBottom: '2px solid #1e293b',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontSize: '30px',
              fontWeight: 800,
              letterSpacing: '0.025em',
              color: '#0f172a',
            }}
          >
            {data.fullname || 'Enter Full Name'}
          </h2>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginTop: '6px',
              fontFamily: 'sans-serif',
              color: data.accentColor,
            }}
          >
            {data.title || 'Job Title'}
          </p>

          {/* Contact line */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              columnGap: '16px',
              rowGap: '4px',
              fontSize: '11px',
              color: '#64748b',
              marginTop: '12px',
              fontFamily: 'sans-serif',
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

        {/* Professional Summary */}
        {data.summary && (
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#1e293b',
                marginBottom: '8px',
                fontFamily: 'sans-serif',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '8px',
              }}
            >
              Summary
            </h3>
            <p
              style={{
                fontSize: '12px',
                color: '#334155',
                lineHeight: 1.625,
                textAlign: 'justify',
              }}
            >
              {data.summary}
            </p>
          </div>
        )}

        {/* Experience Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#1e293b',
              marginBottom: '12px',
              fontFamily: 'sans-serif',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '8px',
            }}
          >
            Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.experience.map((exp, idx) => (
              <div key={idx} style={{ fontSize: '12px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    fontFamily: 'sans-serif',
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <strong
                      style={{ color: '#0f172a', fontSize: '14px', fontFamily: 'Georgia, serif' }}
                    >
                      {exp.position}
                    </strong>
                    <span style={{ color: '#64748b' }}>|</span>
                    <span style={{ color: '#334155', fontWeight: 500 }}>{exp.company}</span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#475569', fontWeight: 600 }}>
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p
                  style={{
                    color: '#475569',
                    marginTop: '6px',
                    fontSize: '11px',
                    lineHeight: 1.625,
                    textAlign: 'justify',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {exp.description}
                </p>
              </div>
            ))}
            {data.experience.length === 0 && (
              <p
                style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  fontStyle: 'italic',
                  fontFamily: 'sans-serif',
                }}
              >
                No experience added
              </p>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#1e293b',
              marginBottom: '12px',
              fontFamily: 'sans-serif',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '8px',
            }}
          >
            Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.education.map((edu, idx) => (
              <div key={idx} style={{ fontSize: '12px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    fontFamily: 'sans-serif',
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <strong
                      style={{ color: '#0f172a', fontSize: '14px', fontFamily: 'Georgia, serif' }}
                    >
                      {edu.degree}
                    </strong>
                    <span style={{ color: '#64748b' }}>|</span>
                    <span style={{ color: '#334155', fontWeight: 500 }}>{edu.school}</span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#475569', fontWeight: 600 }}>
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p
                    style={{
                      color: '#475569',
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
              <p
                style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  fontStyle: 'italic',
                  fontFamily: 'sans-serif',
                }}
              >
                No education added
              </p>
            )}
          </div>
        </div>

        {/* Grid of Skills and Languages */}
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
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#1e293b',
                marginBottom: '8px',
                fontFamily: 'sans-serif',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '8px',
              }}
            >
              Skills
            </h3>
            <p
              style={{
                fontSize: '12px',
                color: '#334155',
                lineHeight: 1.625,
                fontFamily: 'sans-serif',
              }}
            >
              {data.skills || 'Not provided'}
            </p>
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
                fontFamily: 'sans-serif',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '8px',
              }}
            >
              Languages
            </h3>
            <p
              style={{
                fontSize: '12px',
                color: '#334155',
                lineHeight: 1.625,
                fontFamily: 'sans-serif',
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
          fontFamily: 'sans-serif',
        }}
      >
        Professional Classic Template
      </div>
    </div>
  )
}
