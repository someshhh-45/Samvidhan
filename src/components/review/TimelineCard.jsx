import React from 'react'
import { formatDateTime } from '../../utils/formatDate.js'

export default function TimelineCard({ events = [] }) {
  return (
    <div className="timeline-list">
      {events.map((e, i) => (
        <div className="tl-item" key={i}>
          <div className="tl-date" style={{ width: 80, fontSize: 9 }}>{formatDateTime(e.timestamp)}</div>
          <div className="tl-dot-col">
            <div className="tl-dot" />
            {i < events.length - 1 && <div className="tl-line" />}
          </div>
          <div>
            <div className="tl-content-title">{e.action}</div>
            <div className="tl-content-sub">{e.user} · {e.note}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
