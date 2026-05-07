import React from 'react'
import { Link } from 'react-router-dom'
import ReviewStatusBadge from '../review/ReviewStatusBadge.jsx'
import { formatDate } from '../../utils/formatDate.js'

export default function RecentReviews({ reviews = [] }) {
  return (
    <table className="case-table">
      <thead>
        <tr>
          <th>Case ID</th>
          <th>Department</th>
          <th>Date</th>
          <th>Status</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map(r => (
          <tr key={r.id}>
            <td>
              <Link to={`/reviews/${r.id}`} style={{ color: 'var(--gold)', textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: 11 }}>
                {r.caseId || r.id}
              </Link>
            </td>
            <td style={{ color: 'var(--silver-light)' }}>{r.department}</td>
            <td style={{ color: 'var(--silver)', fontSize: 10 }}>{formatDate(r.createdAt)}</td>
            <td><ReviewStatusBadge status={r.status} /></td>
            <td>
              <span className={`priority-dot p-${r.priority === 'high' ? 'high' : r.priority === 'medium' ? 'med' : 'low'}`} />
              <span style={{ fontSize: 10, color: 'var(--silver)', textTransform: 'capitalize' }}>{r.priority}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
