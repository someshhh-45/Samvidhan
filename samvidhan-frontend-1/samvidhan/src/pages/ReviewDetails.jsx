import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import reviewService from '../services/reviewService.js'
import ReviewStatusBadge from '../components/review/ReviewStatusBadge.jsx'
import ReviewActions from '../components/review/ReviewActions.jsx'
import ConfidenceBadge from '../components/review/ConfidenceBadge.jsx'
import TimelineCard from '../components/review/TimelineCard.jsx'
import FieldEditor from '../components/review/FieldEditor.jsx'
import PdfHighlights from '../components/pdf/PdfHighlights.jsx'
import AnnotationLayer from '../components/pdf/AnnotationLayer.jsx'
import Loader from '../components/common/Loader.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import { formatDate } from '../utils/formatDate.js'

/* Highlights for mock PDF text */
const MOCK_HIGHLIGHTS = [
  { before: 'The ', text: 'Ministry of Health and Family Welfare', type: 'department', label: 'Department', after: ' is directed to submit a compliance report under ' },
  { text: 'Article 47', type: 'directive', label: 'Article', after: ' of the Constitution of India, pertaining to the duty of the State to raise the level of nutrition. Compliance must be filed by ' },
  { text: '31 March 2024', type: 'date', label: 'Deadline', after: '. Submit to the Ministry of Law and Justice.' },
]

const MOCK_FIELDS = [
  { key: 'article',    icon: '⚖️', label: 'Constitutional Article', value: 'Article 47, Directive Principles', confidence: 98 },
  { key: 'department', icon: '🏛️', label: 'Responsible Department', value: 'Ministry of Health & Family Welfare',  confidence: 95 },
  { key: 'deadline',   icon: '📅', label: 'Compliance Deadline',    value: '31 March 2024',                       confidence: 87 },
  { key: 'docType',    icon: '📋', label: 'Document Type',          value: 'DPSP Directive',                      confidence: 99 },
  { key: 'caseRef',    icon: '🔢', label: 'Case Reference',         value: 'CIS/2024/DPSP/0047',                  confidence: 94 },
  { key: 'priority',   icon: '⚡', label: 'Priority Level',         value: 'High — Immediate Action Required',    confidence: 91 },
]

const MOCK_TIMELINE = [
  { timestamp: '2024-01-12T09:00:00', action: 'Document Uploaded',     user: 'System',         note: 'Auto-ingested via CIS' },
  { timestamp: '2024-01-12T09:01:30', action: 'AI Extraction Complete', user: 'AI Engine',      note: '6 fields extracted, 95% avg confidence' },
  { timestamp: '2024-01-12T10:45:00', action: 'Assigned for Review',    user: 'Admin',          note: 'Assigned to Reviewing Officer' },
  { timestamp: '2024-01-12T14:20:00', action: 'Under Review',           user: 'Raj Sharma',     note: 'Officer reviewing extracted fields' },
]

const MOCK_REVIEW = {
  id: 1, caseId: 'CIS-2024-0841',
  title: 'Art. 47 DPSP Compliance Directive',
  department: 'Ministry of Health & Family Welfare',
  status: 'review', priority: 'high', confidence: 95,
  createdAt: '2024-01-12',
  actionPlan: [
    'Acknowledge receipt of DPSP directive under Article 47',
    'Constitute a compliance committee within Ministry of Health',
    'Collect data on nutrition levels across all states/UTs',
    'Prepare draft report with measurable targets and timelines',
    'Submit to Ministry of Law by 31 March 2024',
  ],
}

export default function ReviewDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [review,      setReview]      = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState('')
  const [annotations, setAnnotations] = useState([])
  const [editMode,    setEditMode]    = useState(false)
  const [editedFields, setEditedFields] = useState({})

  useEffect(() => {
    reviewService.getById(id)
      .then(setReview)
      .catch(() => setReview(MOCK_REVIEW))
      .finally(() => setLoading(false))
  }, [id])

  const handleDone = (action) => {
    if (action === 'edit') { setEditMode(true); return }
    navigate('/reviews')
  }

  if (loading) return <Loader />

  const r = review || MOCK_REVIEW

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>{r.caseId}</h1>
          <ReviewStatusBadge status={r.status} />
          <ConfidenceBadge score={r.confidence} />
        </div>
        <p className="page-subtitle">{r.title} · {r.department} · {formatDate(r.createdAt)}</p>
      </div>

      <div className="page-body">
        <ErrorAlert message={error} />

        <div className="verify-grid" style={{ marginBottom: 24 }}>
          {/* PDF + Highlights */}
          <div className="pdf-viewer-mock">
            <div className="pdf-header">
              <span className="pdf-title">{r.caseId} · Source Document</span>
              <span style={{ fontSize: 10, color: 'var(--silver)', fontFamily: 'Cinzel, serif', letterSpacing: 1 }}>Page 1 / 3</span>
            </div>
            <div className="pdf-body">
              <p style={{ marginBottom: 16, fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: 1, color: 'var(--cream)' }}>
                CONSTITUTIONAL COMPLIANCE DIRECTIVE
              </p>
              <PdfHighlights highlights={MOCK_HIGHLIGHTS} />
              <div style={{ marginTop: 20, padding: '10px 14px', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)', fontSize: 11, color: 'var(--silver)' }}>
                <span style={{ color: 'var(--gold)' }}>■ </span> Directive &nbsp;&nbsp;
                <span style={{ color: 'var(--jade-light)' }}>■ </span> Department &nbsp;&nbsp;
                <span style={{ color: 'var(--saffron)' }}>■ </span> Date
              </div>
            </div>
            <AnnotationLayer reviewId={id} annotations={annotations} onAdd={a => setAnnotations(prev => [...prev, a])} />
          </div>

          {/* Action Panel */}
          <div className="action-panel">
            {/* Extracted Fields */}
            <div className="action-card">
              <div className="action-header">
                <span className="action-icon">📄</span>
                <span className="action-title">Extracted Fields</span>
              </div>
              {editMode ? (
                <FieldEditor fields={MOCK_FIELDS} onChange={setEditedFields} />
              ) : (
                <div className="field-list">
                  {MOCK_FIELDS.map(f => (
                    <div className="field-item" key={f.key}>
                      <span className="field-icon">{f.icon}</span>
                      <div className="field-info">
                        <div className="field-label">{f.label}</div>
                        <div className="field-value">{editedFields[f.key] || f.value}</div>
                      </div>
                      <ConfidenceBadge score={f.confidence} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Action Plan */}
            <div className="action-card">
              <div className="action-header">
                <span className="action-icon">🧠</span>
                <span className="action-title">AI Action Plan</span>
              </div>
              <div className="action-body">
                {(r.actionPlan || []).map((step, i) => (
                  <div className="action-step" key={i}>
                    <span className="step-num">{String(i + 1).padStart(2, '0')}.</span>
                    <span className="step-text">{step}</span>
                  </div>
                ))}
              </div>
              <ReviewActions reviewId={id} onDone={handleDone} />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="dash-panel">
          <div className="panel-header">
            <span className="panel-title">Case Timeline</span>
          </div>
          <TimelineCard events={MOCK_TIMELINE} />
        </div>
      </div>
    </>
  )
}
