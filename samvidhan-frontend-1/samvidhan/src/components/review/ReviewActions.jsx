import React, { useState } from 'react'
import reviewService from '../../services/reviewService.js'
import ErrorAlert from '../common/ErrorAlert.jsx'

export default function ReviewActions({ reviewId, onDone }) {
  const [note, setNote]     = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const act = async (action) => {
    setLoading(true)
    setError('')
    try {
      if (action === 'approve') await reviewService.approve(reviewId, note)
      else if (action === 'reject') await reviewService.reject(reviewId, note)
      onDone?.()
    } catch (e) {
      setError(e.message || `Failed to ${action}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <ErrorAlert message={error} />
      <div className="form-group" style={{ marginTop: error ? 12 : 0 }}>
        <label className="form-label">Note / Remarks</label>
        <textarea
          className="form-input"
          rows={3}
          placeholder="Add an optional note..."
          value={note}
          onChange={e => setNote(e.target.value)}
          style={{ resize: 'vertical' }}
        />
      </div>
      <div className="action-btn-row" style={{ padding: 0 }}>
        <button className="action-btn btn-approve" onClick={() => act('approve')} disabled={loading}>✓ Approve</button>
        <button className="action-btn btn-edit"    onClick={() => onDone?.('edit')} disabled={loading}>✎ Edit</button>
        <button className="action-btn btn-reject"  onClick={() => act('reject')} disabled={loading}>✕ Reject</button>
      </div>
    </div>
  )
}
