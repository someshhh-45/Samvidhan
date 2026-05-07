import React from 'react'

export default function EmptyState({ icon = '📋', title = 'No records found', desc = '' }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <div className="empty-title">{title}</div>
      {desc && <div className="empty-desc">{desc}</div>}
    </div>
  )
}
