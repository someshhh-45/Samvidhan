import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate.js'

export default function ActionPlanCard({ plan }) {
  return (
    <div className="action-card" style={{ marginBottom: 12 }}>
      <div className="action-header">
        <span className="action-icon">📌</span>
        <span className="action-title">{plan.title}</span>
      </div>
      <div className="action-body">
        {plan.steps?.map((step, i) => (
          <div className="action-step" key={i}>
            <span className="step-num">{String(i + 1).padStart(2, '0')}.</span>
            <span className="step-text">{step}</span>
          </div>
        ))}
        <div style={{ marginTop: 10, fontSize: 10, color: 'var(--silver)', fontFamily: 'Cinzel, serif', letterSpacing: 1 }}>
          Due: {formatDate(plan.dueDate)} · {plan.department}
        </div>
      </div>
    </div>
  )
}
