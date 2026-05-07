import React from 'react'

const TYPE_CLASS = {
  directive:  'highlight-gold',
  department: 'highlight-jade',
  date:       'highlight-saffron',
}

export default function PdfHighlights({ text = '', highlights = [] }) {
  if (!highlights.length) return <p className="pdf-body" style={{ padding: 0 }}>{text}</p>

  let result = text
  return (
    <p style={{ lineHeight: 1.9, fontSize: 13, color: 'var(--silver-light)', fontFamily: 'Cormorant Garamond, serif' }}>
      {highlights.map((h, i) => (
        <span key={i}>
          {h.before && <span>{h.before}</span>}
          <span className={`highlight ${TYPE_CLASS[h.type] || 'highlight-gold'}`} title={h.label}>
            {h.text}
          </span>
          {h.after && <span>{h.after}</span>}
        </span>
      ))}
    </p>
  )
}
