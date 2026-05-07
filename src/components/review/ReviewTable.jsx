import React from 'react'
import { Link } from 'react-router-dom'

import ReviewStatusBadge from './ReviewStatusBadge.jsx'
import ConfidenceBadge from './ConfidenceBadge.jsx'

import { formatDate } from '../../utils/formatDate.js'

export default function ReviewTable({
  reviews = [],
  onSelect,
}) {
  return (
    <table
      className="case-table"
      style={{ width: '100%' }}
    >
      <thead>
        <tr>
          <th>Priority</th>
          <th>Case ID</th>
          <th>Title / Document</th>
          <th>Department</th>
          <th>Date</th>
          <th>Confidence</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {reviews.length === 0 ? (
          <tr>
            <td
              colSpan="7"
              style={{
                textAlign: 'center',
                padding: '24px',
                color: 'var(--silver)',
              }}
            >
              No review tasks found
            </td>
          </tr>
        ) : (
          reviews.map(r => {
            const priority =
              r.priority?.toLowerCase() ||
              'low'

            return (
              <tr
                key={r.id}
                onClick={() =>
                  onSelect?.(r)
                }
                style={{
                  cursor: onSelect
                    ? 'pointer'
                    : 'default',
                }}
              >
                <td>
                  <span
                    className={`priority-dot p-${
                      priority === 'high'
                        ? 'high'
                        : priority ===
                          'medium'
                        ? 'med'
                        : priority ===
                          'critical'
                        ? 'high'
                        : 'low'
                    }`}
                  />
                </td>

                <td>
                  <Link
                    to={`/reviews/${r.id}`}
                    style={{
                      color:
                        'var(--gold)',
                      textDecoration:
                        'none',
                      fontFamily:
                        'Cinzel, serif',
                      fontSize: 11,
                    }}
                  >
                    {r.caseId ||
                      r.id}
                  </Link>
                </td>

                <td
                  style={{
                    maxWidth: 200,
                    overflow:
                      'hidden',
                    textOverflow:
                      'ellipsis',
                    whiteSpace:
                      'nowrap',
                  }}
                >
                  {r.title ||
                    r.fileName ||
                    'Untitled Review'}
                </td>

                <td
                  style={{
                    color:
                      'var(--silver-light)',
                    fontSize: 11,
                  }}
                >
                  {r.department ||
                    '—'}
                </td>

                <td
                  style={{
                    color:
                      'var(--silver)',
                    fontSize: 10,
                  }}
                >
                  {r.createdAt
                    ? formatDate(
                        r.createdAt
                      )
                    : '—'}
                </td>

                <td>
                  {r.confidence !==
                  undefined ? (
                    <ConfidenceBadge
                      score={
                        r.confidence
                      }
                    />
                  ) : (
                    '—'
                  )}
                </td>

                <td>
                  <ReviewStatusBadge
                    status={
                      r.status ||
                      'PENDING'
                    }
                  />
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}