import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import Loader from '../common/Loader.jsx'
import Sidebar from './Sidebar.jsx'
import NotificationBell from '../notifications/NotificationBell.jsx'

export default function ProtectedRoute({ requiredRole }) {
  const { user, loading } = useAuth()

  if (loading) return <Loader fullPage />

  if (!user) return <Navigate to="/login" replace />

  if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/unauthorized" replace />

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="top-bar">
          <span className="top-bar-left">
            Constitutional Intelligence Platform
          </span>
          <div className="top-bar-right">
            <NotificationBell />
            <span style={{ fontSize: 12, color: 'var(--silver)' }}>
              {user.name || user.username}
            </span>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
