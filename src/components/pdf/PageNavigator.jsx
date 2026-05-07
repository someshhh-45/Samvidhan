import React from 'react'

export default function PageNavigator({ page, total, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        className="page-btn"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        style={{ width: 24, height: 24, fontSize: 12 }}
      >‹</button>
      <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: 'var(--silver)', letterSpacing: 1 }}>
        {page} / {total}
      </span>
      <button
        className="page-btn"
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page >= total}
        style={{ width: 24, height: 24, fontSize: 12 }}
      >›</button>
    </div>
  )
}
