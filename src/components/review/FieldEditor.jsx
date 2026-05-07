import React, { useState } from 'react'
import ConfidenceBadge from './ConfidenceBadge.jsx'

export default function FieldEditor({ fields = [], onChange }) {
  const [edited, setEdited] = useState({})

  const handleChange = (key, value) => {
    const next = { ...edited, [key]: value }
    setEdited(next)
    onChange?.(next)
  }

  return (
    <div className="field-list">
      {fields.map(f => (
        <div className="field-item" key={f.key}>
          <span className="field-icon">{f.icon || '📄'}</span>
          <div className="field-info">
            <div className="field-label">{f.label}</div>
            <input
              className="form-input"
              style={{ padding: '4px 8px', fontSize: 12, marginTop: 2 }}
              value={edited[f.key] !== undefined ? edited[f.key] : (f.value || '')}
              onChange={e => handleChange(f.key, e.target.value)}
            />
          </div>
          <ConfidenceBadge score={f.confidence} />
        </div>
      ))}
    </div>
  )
}
