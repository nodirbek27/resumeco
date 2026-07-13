import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#1976d2',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 16,
      }}
    >
      <div>
        <div style={{ fontSize: '30vh', lineHeight: 1 }}>404</div>
        <div style={{ fontSize: '2.5rem', opacity: 0.4, margin: '16px 0 32px' }}>
          Oops. Nothing here...
        </div>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            background: '#fff',
            color: '#1976d2',
            padding: '12px 32px',
            borderRadius: 4,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
