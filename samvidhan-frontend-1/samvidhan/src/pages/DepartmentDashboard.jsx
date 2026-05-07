import React, { useState } from 'react'
import { DEPARTMENTS } from '../utils/departmentUtils.js'
import DepartmentChart from '../components/dashboard/DepartmentChart.jsx'
import StatsCard from '../components/dashboard/StatsCard.jsx'
import DeadlineAlerts from '../components/dashboard/DeadlineAlerts.jsx'

const DEPT_STATS = {
  law:       { total: 24, pending: 4, verified: 18, escalated: 2 },
  finance:   { total: 18, pending: 3, verified: 14, escalated: 1 },
  home:      { total: 31, pending: 8, verified: 21, escalated: 2 },
  education: { total: 12, pending: 2, verified: 10, escalated: 0 },
  health:    { total: 19, pending: 5, verified: 12, escalated: 2 },
  defence:   { total: 8,  pending: 1, verified: 7,  escalated: 0 },
  external:  { total: 6,  pending: 1, verified: 5,  escalated: 0 },
  commerce:  { total: 10, pending: 2, verified: 8,  escalated: 0 },
}

const CHART_DATA = DEPARTMENTS.map(d => ({ name: d.label.replace('Ministry of ', ''), count: DEPT_STATS[d.id]?.total || 0 }))

const DEADLINES = [
  { id: 1, title: 'Art. 47 Compliance Review',      department: 'Ministry of Health',  dueDate: '2024-01-20' },
  { id: 2, title: 'DPSP Implementation Report',     department: 'Ministry of Finance', dueDate: '2024-02-01' },
  { id: 3, title: 'Fundamental Rights Audit',       department: 'Ministry of Law',     dueDate: '2024-02-15' },
]

export default function DepartmentDashboard() {
  const [selected, setSelected] = useState(DEPARTMENTS[0].id)
  const dept  = DEPARTMENTS.find(d => d.id === selected)
  const stats = DEPT_STATS[selected] || {}

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Department <em>Overview</em></h1>
        <p className="page-subtitle">Ministry-wise compliance status and case distribution</p>
      </div>

      <div className="page-body">
        {/* Department selector */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {DEPARTMENTS.map(d => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              style={{
                fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: 1,
                padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s',
                background: selected === d.id ? 'rgba(201,168,76,0.15)' : 'transparent',
                color: selected === d.id ? 'var(--gold)' : 'var(--silver)',
                border: `1px solid ${selected === d.id ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {d.icon} {d.label.replace('Ministry of ', '')}
            </button>
          ))}
        </div>

        {/* Selected dept KPIs */}
        <div style={{ marginBottom: 8, fontFamily: 'Cinzel, serif', fontSize: 13, color: 'var(--gold)', letterSpacing: 2, marginBottom: 16 }}>
          {dept?.icon} {dept?.label}
        </div>
        <div className="grid-4" style={{ marginBottom: 24 }}>
          <StatsCard label="Total Cases"    value={stats.total}     colorClass="gold"    />
          <StatsCard label="Pending"        value={stats.pending}   colorClass="saffron" />
          <StatsCard label="Verified"       value={stats.verified}  colorClass="jade"    />
          <StatsCard label="Escalated"      value={stats.escalated} colorClass="crimson" />
        </div>

        <div className="grid-2">
          {/* All-dept chart */}
          <div className="dash-panel">
            <div className="panel-header">
              <span className="panel-title">All Department Distribution</span>
              <span className="panel-badge">All Ministries</span>
            </div>
            <DepartmentChart data={CHART_DATA} />
          </div>

          {/* Deadlines */}
          <div className="dash-panel">
            <div className="panel-header">
              <span className="panel-title">Upcoming Deadlines</span>
              <span className="panel-badge">{DEADLINES.length} Due</span>
            </div>
            <DeadlineAlerts deadlines={DEADLINES} />
          </div>
        </div>
      </div>
    </>
  )
}
