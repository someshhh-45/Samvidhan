import React from 'react'
import { Link } from 'react-router-dom'
import ReviewStatusBadge from './ReviewStatusBadge.jsx'
import ConfidenceBadge from './ConfidenceBadge.jsx'
import { formatDate } from '../../utils/formatDate.js'

export default function ReviewCard({ review }) {
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className={`priority-dot p-${review.priority === 'high' ? 'high' : review.priority === 'medium' ? 'med' : 'low'}`} />
            <Link
              to={`/reviews/${review.id}`}
              style={{ fontFamily: 'Cinzel, serif', fontSize: 12, color: 'var(--gold)', textDecoration: 'none', letterSpacing: 1 }}
            >
              {review.caseId || `CASE-${review.id}`}
            </Link>
            <ReviewStatusBadge status={review.status} />
          </div>
          <div style={{ fontSize: 13, color: 'var(--cream)', marginBottom: 4 }}>{review.title || review.fileName}</div>
          <div style={{ fontSize: 11, color: 'var(--silver)' }}>{review.department} · {formatDate(review.createdAt)}</div>
        </div>
        {review.confidence !== undefined && <ConfidenceBadge score={review.confidence} />}
      </div>
    </div>
  )
}
