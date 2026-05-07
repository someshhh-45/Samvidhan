export function getConfidenceClass(score) {
  if (score >= 90) return 'conf-high'
  if (score >= 70) return 'conf-med'
  return 'conf-low'
}

export function getConfidenceLabel(score) {
  if (score >= 90) return 'High'
  if (score >= 70) return 'Medium'
  return 'Low'
}
