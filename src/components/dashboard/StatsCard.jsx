import React from 'react'

export default function StatsCard({ label, value, change, colorClass = 'gold', icon }) {
  return (
    <div className={`kpi-card ${colorClass}`}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value ?? '—'}</div>
      {change && <div className="kpi-change">{change}</div>}
    </div>
  )
}
