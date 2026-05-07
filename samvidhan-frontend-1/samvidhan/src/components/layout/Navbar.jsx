import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import NotificationBell from '../notifications/NotificationBell.jsx'

export default function Navbar() {
  const { user } = useAuth()
  const location = useLocation()
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['workflow', 'dashboard', 'upload', 'verify', 'features']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom > 100) { setActive(id); return }
        }
      }
      setActive('')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="main-nav">
      <Link to="/" className="nav-logo">
        <span className="nav-logo-text">Sam<span>vidhan</span></span>
      </Link>

      <ul className="nav-links">
        {['workflow','dashboard','upload','features'].map(id => (
          <li key={id}>
            <a
              className={active === id ? 'active' : ''}
              onClick={() => scrollTo(id)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {user ? (
          <>
            <NotificationBell />
            <Link to="/dashboard" className="nav-badge">Dashboard</Link>
          </>
        ) : (
          <Link to="/login" className="nav-badge">Sign In</Link>
        )}
      </div>
    </nav>
  )
}
