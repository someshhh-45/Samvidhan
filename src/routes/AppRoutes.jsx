import React from 'react'

import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import ProtectedRoute from '../components/layout/ProtectedRoute.jsx'

import Login from '../pages/Login.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import ReviewQueue from '../pages/ReviewQueue.jsx'
import ReviewDetails from '../pages/ReviewDetails.jsx'
import Notifications from '../pages/Notifications.jsx'
import AuditLogs from '../pages/AuditLogs.jsx'
import DepartmentDashboard from '../pages/DepartmentDashboard.jsx'
import ActionPlans from '../pages/ActionPlans.jsx'
import Profile from '../pages/Profile.jsx'
import Unauthorized from '../pages/Unauthorized.jsx'
import LandingPage from '../pages/LandingPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* Protected Routes */}
      <Route
        element={<ProtectedRoute />}
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/reviews"
          element={<ReviewQueue />}
        />

        <Route
          path="/reviews/:id"
          element={<ReviewDetails />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/audit"
          element={<AuditLogs />}
        />

        <Route
          path="/departments"
          element={
            <DepartmentDashboard />
          }
        />

        <Route
          path="/action-plans"
          element={<ActionPlans />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  )
}