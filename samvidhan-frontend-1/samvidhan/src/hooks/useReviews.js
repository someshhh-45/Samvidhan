import { useState, useEffect, useCallback } from 'react'
import reviewService from '../services/reviewService.js'

export default function useReviews(params = {}) {
  const [reviews,  setReviews]  = useState([])
  const [total,    setTotal]    = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  const fetch = useCallback(() => {
    setLoading(true)
    reviewService.getAll(params)
      .then(data => { setReviews(data.results || data); setTotal(data.total || data.length) })
      .catch(e => setError(e.message || 'Failed to load reviews'))
      .finally(() => setLoading(false))
  }, [JSON.stringify(params)])

  useEffect(() => { fetch() }, [fetch])

  return { reviews, total, loading, error, refetch: fetch }
}
