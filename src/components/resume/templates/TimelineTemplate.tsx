import { PhoneIcon, EmailIcon, PlaceIcon, LanguageIcon } from '@/components/icons'
import { splitList, type ResumeTemplateProps } from './types'

export default function TimelineTemplate({ data }: ResumeTemplateProps) {
  const skills = splitList(data.skills)

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
        {/* Centered header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '30px',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.025em',
            }}
          >
            {data.fullname || 'Enter Full Name'}
          </h2>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginTop: '8px',
              color: data.accentColor,
            }}
          >
            {data.title || 'Job Title'}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              columnGap: '16px',
              rowGap: '4px',
              fontSize: '11px',
              color: '#64748b',
              marginTop: '16px',
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

        {data.summary && (
          <p
            style={{
              fontSize: '12px',
              color: '#475569',
              lineHeight: 1.625,
              textAlign: 'center',
              fontStyle: 'italic',
              marginBottom: '32px',
              paddingLeft: '24px',
              paddingRight: '24px',
            }}
          >
            {data.summary}
          </p>
        )}

        {/* Experience timeline */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#1e293b',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            Experience
          </h3>
          <div
            style={{
              position: 'relative',
              paddingLeft: '24px',
              borderLeft: '2px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {data.experience.map((exp, idx) => (
              <div key={idx} style={{ position: 'relative', fontSize: '12px' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '-30px',
                    top: '2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '9999px',
                    border: '2px solid #ffffff',
                    background: data.accentColor,
                  }}
                ></span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{exp.position}</h4>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8' }}>
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
              <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>No experience added</p>
            )}
          </div>
        </div>

        {/* Education timeline */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#1e293b',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            Education
          </h3>
          <div
            style={{
              position: 'relative',
              paddingLeft: '24px',
              borderLeft: '2px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {data.education.map((edu, idx) => (
              <div key={idx} style={{ position: 'relative', fontSize: '12px' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '-30px',
                    top: '2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '9999px',
                    border: '2px solid #ffffff',
                    background: data.accentColor,
                  }}
                ></span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{edu.degree}</h4>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8' }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p style={{ color: '#475569', fontWeight: 600, fontSize: '11px' }}>{edu.school}</p>
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

        {/* Skills & Languages */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
          <div>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#1e293b',
                marginBottom: '8px',
                textAlign: 'center',
              }}
            >
              Skills
            </h3>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '6px',
                rowGap: '4px',
              }}
            >
              {skills.map((skill, idx) => (
                <span key={skill} style={{ display: 'flex', alignItems: 'center', columnGap: '6px' }}>
                  {idx > 0 && <span style={{ color: '#cbd5e1', fontSize: '10px' }}>&#8226;</span>}
                  <span style={{ fontSize: '10px', fontWeight: 600, color: data.accentColor }}>
                    {skill}
                  </span>
                </span>
              ))}
              {!data.skills && (
                <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>Not provided</span>
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
                textAlign: 'center',
              }}
            >
              Languages
            </h3>
            <p
              style={{
                fontSize: '12px',
                color: '#475569',
                lineHeight: 1.625,
                textAlign: 'center',
                whiteSpace: 'pre-line',
              }}
            >
              {data.languages || 'Not provided'}
            </p>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', paddingTop: '24px' }}>
        Elegant Timeline Template
      </div>
    </div>
  )
}
