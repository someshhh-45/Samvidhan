import React from 'react'

export default function Pagination({ page, total, pageSize = 20, onChange }) {
  const totalPages = Math.ceil(total / pageSize)
  if (totalPages <= 1) return null

  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1)

  return (
    <div className="pagination">
      <button className="page-btn" onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>‹</button>
      {pages.map(p => (
        <button
          key={p}
          className={`page-btn ${p === page ? 'active' : ''}`}
          onClick={() => onChange(p)}
        >{p}</button>
      ))}
      <button className="page-btn" onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>›</button>
    </div>
  )
}
