import React from 'react'

const STATUS_MAP = {
  verified:  { cls: 'status-verified',  label: 'Verified'  },
  pending:   { cls: 'status-pending',   label: 'Pending'   },
  review:    { cls: 'status-review',    label: 'In Review' },
  appeal:    { cls: 'status-appeal',    label: 'Appeal'    },
  approved:  { cls: 'status-verified',  label: 'Approved'  },
  rejected:  { cls: 'status-appeal',    label: 'Rejected'  },
}

export default function ReviewStatusBadge({ status }) {
  const s = STATUS_MAP[status?.toLowerCase()] || { cls: 'status-review', label: status || 'Unknown' }
  return <span className={`status-badge ${s.cls}`}>{s.label}</span>
}
