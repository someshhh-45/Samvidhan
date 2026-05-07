import React from 'react'
import useDashboard from '../hooks/useDashboard.js'
import useAuth from '../hooks/useAuth.js'
import StatsCard from '../components/dashboard/StatsCard.jsx'
import RecentReviews from '../components/dashboard/RecentReviews.jsx'
import DeadlineAlerts from '../components/dashboard/DeadlineAlerts.jsx'
import DepartmentChart from '../components/dashboard/DepartmentChart.jsx'
import Loader from '../components/common/Loader.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'

/* Fallback mock data when API is not yet connected */
const MOCK_KPIS = [
  { label: 'Total Cases',    value: '12,847', change: '↑ 342 this month', colorClass: 'gold'    },
  { label: 'Pending Review', value: '284',    change: '↓ 18 from yesterday', colorClass: 'saffron' },
  { label: 'Verified',       value: '11,941', change: '↑ 99.2% compliance',  colorClass: 'jade'    },
  { label: 'Escalated',      value: '23',     change: '↑ 3 new today',       colorClass: 'crimson' },
]

const MOCK_RECENT = [
  { id: 1, caseId: 'CIS-2024-0841', department: 'Min. of Law',      createdAt: '2024-01-12', status: 'verified', priority: 'high'   },
  { id: 2, caseId: 'CIS-2024-0792', department: 'Min. of Finance',  createdAt: '2024-01-09', status: 'pending',  priority: 'medium' },
  { id: 3, caseId: 'CIS-2024-0755', department: 'Min. of Home',     createdAt: '2024-01-07', status: 'review',   priority: 'high'   },
  { id: 4, caseId: 'CIS-2024-0718', department: 'Min. of Education',createdAt: '2024-01-04', status: 'verified', priority: 'low'    },
  { id: 5, caseId: 'CIS-2024-0703', department: 'Min. of Health',   createdAt: '2024-01-02', status: 'appeal',   priority: 'medium' },
]

const MOCK_DEADLINES = [
  { id: 1, title: 'Art. 47 Compliance Review',      department: 'Ministry of Health',   dueDate: '2024-01-20' },
  { id: 2, title: 'DPSP Implementation Report',     department: 'Ministry of Finance',  dueDate: '2024-02-01' },
  { id: 3, title: 'Fundamental Rights Audit',       department: 'Ministry of Law',      dueDate: '2024-02-15' },
  { id: 4, title: 'Art. 21 Action Plan Submission', department: 'Ministry of Home',     dueDate: '2024-03-01' },
]

const MOCK_DEPT = [
  { name: 'Ministry of Home Affairs',  count: 31 },
  { name: 'Ministry of Law & Justice', count: 24 },
  { name: 'Ministry of Health',        count: 19 },
  { name: 'Ministry of Finance',       count: 18 },
  { name: 'Ministry of Education',     count: 12 },
]

export default function Dashboard() {
  const { user }                     = useAuth()
  const { kpis, recent, deadlines, loading, error } = useDashboard()

  const displayKpis      = kpis?.cards      || MOCK_KPIS
  const displayRecent    = recent?.results  || recent || MOCK_RECENT
  const displayDeadlines = deadlines?.results || deadlines || MOCK_DEADLINES

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">
          Welcome, <em>{user?.name || user?.username || 'Officer'}</em>
        </h1>
        <p className="page-subtitle">Constitutional Compliance Dashboard · {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="page-body">
        <ErrorAlert message={error} />

        {/* KPI Cards */}
        {loading ? <Loader /> : (
          <div className="grid-4" style={{ marginBottom: 28 }}>
            {displayKpis.map((k, i) => (
              <StatsCard key={i} label={k.label} value={k.value} change={k.change} colorClass={k.colorClass || k.color} />
            ))}
          </div>
        )}

        {/* Main content grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 28 }}>
          {/* Recent Reviews */}
          <div className="dash-panel">
            <div className="panel-header">
              <span className="panel-title">Recent Cases</span>
              <span className="panel-badge">Live</span>
            </div>
            {loading ? <Loader /> : <RecentReviews reviews={displayRecent} />}
          </div>

          {/* Deadlines */}
          <div className="dash-panel">
            <div className="panel-header">
              <span className="panel-title">Upcoming Deadlines</span>
              <span className="panel-badge">{displayDeadlines.length} Due</span>
            </div>
            {loading ? <Loader /> : <DeadlineAlerts deadlines={displayDeadlines} />}
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="dash-panel" style={{ marginBottom: 0 }}>
          <div className="panel-header">
            <span className="panel-title">Department Breakdown</span>
            <span className="panel-badge">All Ministries</span>
          </div>
          <DepartmentChart data={MOCK_DEPT} />
        </div>
      </div>
    </>
  )
}
