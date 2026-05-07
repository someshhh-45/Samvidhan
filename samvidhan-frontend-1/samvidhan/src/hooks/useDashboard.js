import { useState, useEffect } from 'react'
import dashboardService from '../services/dashboardService.js'

export default function useDashboard() {
  const [kpis,      setKpis]      = useState(null)
  const [deadlines, setDeadlines] = useState([])
  const [recent,    setRecent]    = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)

  useEffect(() => {
    Promise.all([
      dashboardService.getKPIs(),
      dashboardService.getDeadlines(),
      dashboardService.getRecent(),
    ])
      .then(([k, d, r]) => { setKpis(k); setDeadlines(d); setRecent(r) })
      .catch(e => setError(e.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  return { kpis, deadlines, recent, loading, error }
}
