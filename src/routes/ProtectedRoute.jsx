import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } =
    useContext(AuthContext)

  // auth still loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    )
  }

  // not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // logged in
  return children
}