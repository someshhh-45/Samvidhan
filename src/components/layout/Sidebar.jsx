import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import { getRoleBadgeClass } from '../../utils/roleUtils.js'

const NAV_ITEMS = [
  { to: '/dashboard',    icon: '📊', label: 'Dashboard' },
  { to: '/reviews',      icon: '📋', label: 'Review Queue', count: true },
  { to: '/action-plans', icon: '📌', label: 'Action Plans' },
  { to: '/departments',  icon: '🏛️',  label: 'Departments' },
  { to: '/notifications',icon: '🔔', label: 'Notifications' },
  { to: '/audit',        icon: '🗂️',  label: 'Audit Logs' },
  { to: '/profile',      icon: '👤', label: 'Profile' },
]

export default function Sidebar({ reviewCount = 0 }) {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-logo">
        <span className="sidebar-logo-text">Sam<span>vidhan</span></span>
      </Link>

      <div className="sidebar-section-label">Navigation</div>

      {NAV_ITEMS.map(item => (
        <Link
          key={item.to}
          to={item.to}
          className={`sidebar-item ${pathname.startsWith(item.to) ? 'active' : ''}`}
        >
          <span className="sidebar-item-icon">{item.icon}</span>
          {item.label}
          {item.count && reviewCount > 0 && (
            <span className="sidebar-count">{reviewCount}</span>
          )}
        </Link>
      ))}

      {user && (
        <div className="sidebar-user">
          <div className="sidebar-user-name">{user.name || user.username}</div>
          <span className={getRoleBadgeClass(user.role)}>{user.role}</span>
          <div
            style={{ marginTop: 12, fontSize: 11, color: 'var(--silver)', cursor: 'pointer' }}
            onClick={logout}
          >
            Sign out →
          </div>
        </div>
      )}
    </aside>
  )
}
