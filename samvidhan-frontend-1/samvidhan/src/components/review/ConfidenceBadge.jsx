import React from 'react'
import { getConfidenceClass } from '../../utils/confidenceColor.js'

export default function ConfidenceBadge({ score }) {
  return (
    <span className={`confidence-badge ${getConfidenceClass(score)}`}>
      {score}%
    </span>
  )
}
