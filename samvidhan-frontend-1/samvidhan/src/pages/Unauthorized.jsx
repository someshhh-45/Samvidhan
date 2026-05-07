import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--deep-navy)' }}>
      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 80, color: 'var(--gold)', opacity: 0.3, lineHeight: 1 }}>403</div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 18, color: 'var(--cream)', letterSpacing: 3, margin: '16px 0 8px' }}>Access Restricted</div>
        <div style={{ fontSize: 14, color: 'var(--silver)', marginBottom: 32, maxWidth: 400, lineHeight: 1.7 }}>
          You do not have the required permissions to access this resource. Please contact your administrator.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
          <Link to="/" className="btn-secondary">Return Home</Link>
        </div>
      </div>
    </div>
  )
}
