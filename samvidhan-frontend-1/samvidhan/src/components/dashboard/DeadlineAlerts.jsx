import React from 'react'
import { formatDate } from '../../utils/formatDate.js'

export default function DeadlineAlerts({ deadlines = [] }) {
  return (
    <div className="timeline-list">
      {deadlines.map((d, i) => (
        <div className="tl-item" key={d.id || i}>
          <div className="tl-date">{formatDate(d.dueDate, { day: '2-digit', month: 'short' })}</div>
          <div className="tl-dot-col">
            <div className="tl-dot" />
            {i < deadlines.length - 1 && <div className="tl-line" />}
          </div>
          <div>
            <div className="tl-content-title">{d.title}</div>
            <div className="tl-content-sub">{d.department}</div>
          </div>
        </div>
      ))}
      {deadlines.length === 0 && (
        <div style={{ color: 'var(--silver)', fontSize: 12, padding: '8px 0' }}>No upcoming deadlines</div>
      )}
    </div>
  )
}
