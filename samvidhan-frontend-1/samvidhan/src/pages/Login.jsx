import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm.jsx'

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-overlay" />
      <div className="tricolour-bar" />

      <div className="login-card">
        <div className="login-logo">
          <div className="login-title">Sam<span>vidhan</span></div>
          <div className="login-sub">Constitutional Intelligence Platform</div>
        </div>

        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', margin: '0 auto 28px' }} />

        <LoginForm />

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Link to="/" style={{ fontSize: 11, color: 'var(--silver)', fontFamily: 'Cinzel, serif', letterSpacing: 2, textDecoration: 'none' }}>
            ← Return to Platform
          </Link>
        </div>

        <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(201,168,76,0.1)', display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {['MEITY', 'NIC Hosted', 'ISO 27001'].map(b => (
            <span key={b} className="footer-badge" style={{ fontSize: 9 }}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
