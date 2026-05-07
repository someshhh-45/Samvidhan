import React from 'react'

import useDashboard from '../hooks/useDashboard.js'
import useAuth from '../hooks/useAuth.js'

import StatsCard from '../components/dashboard/StatsCard.jsx'
import RecentReviews from '../components/dashboard/RecentReviews.jsx'
import DeadlineAlerts from '../components/dashboard/DeadlineAlerts.jsx'
import DepartmentChart from '../components/dashboard/DepartmentChart.jsx'

import Loader from '../components/common/Loader.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'

export default function Dashboard() {
  const { user } = useAuth()

  const {
    kpis,
    recent,
    deadlines,
    departments,
    loading,
    error,
  } = useDashboard()

  const displayKpis =
    kpis?.cards || []

  const displayRecent =
    recent?.results ||
    recent ||
    []

  const displayDeadlines =
    deadlines?.results ||
    deadlines ||
    []

  const displayDepartments =
    departments?.results ||
    departments ||
    []

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">
          Welcome,{' '}
          <em>
            {user?.name ||
              user?.username ||
              'Officer'}
          </em>
        </h1>

        <p className="page-subtitle">
          Constitutional Compliance Dashboard ·{' '}
          {new Date().toLocaleDateString(
            'en-IN',
            {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }
          )}
        </p>
      </div>

      <div className="page-body">
        <ErrorAlert message={error} />

        {/* KPI Cards */}
        {loading ? (
          <Loader />
        ) : (
          <div
            className="grid-4"
            style={{ marginBottom: 28 }}
          >
            {displayKpis.map((k, i) => (
              <StatsCard
                key={i}
                label={k.label}
                value={k.value}
                change={k.change}
                colorClass={
                  k.colorClass || k.color
                }
              />
            ))}
          </div>
        )}

        {/* Main content grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr',
            gap: 20,
            marginBottom: 28,
          }}
        >
          {/* Recent Reviews */}
          <div className="dash-panel">
            <div className="panel-header">
              <span className="panel-title">
                Recent Cases
              </span>

              <span className="panel-badge">
                Live
              </span>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <RecentReviews
                reviews={displayRecent}
              />
            )}
          </div>

          {/* Deadlines */}
          <div className="dash-panel">
            <div className="panel-header">
              <span className="panel-title">
                Upcoming Deadlines
              </span>

              <span className="panel-badge">
                {displayDeadlines.length} Due
              </span>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <DeadlineAlerts
                deadlines={
                  displayDeadlines
                }
              />
            )}
          </div>
        </div>

        {/* Department Breakdown */}
        <div
          className="dash-panel"
          style={{ marginBottom: 0 }}
        >
          <div className="panel-header">
            <span className="panel-title">
              Department Breakdown
            </span>

            <span className="panel-badge">
              All Ministries
            </span>
          </div>

          <DepartmentChart
            data={displayDepartments}
          />
        </div>
      </div>
    </>
  )
}