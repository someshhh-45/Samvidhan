import {
  useState,
  useEffect,
  useCallback,
} from 'react'

import reviewService from '../services/reviewService.js'

export default function useReviews(
  params = {}
) {

  const [reviews, setReviews] =
    useState([])

  const [total, setTotal] =
    useState(0)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState(null)

  const fetchReviews =
    useCallback(async () => {

      setLoading(true)

      setError(null)

      try {

        const data =
          await reviewService.getAll(
            params
          )

        // backend returns plain array
        if (
          Array.isArray(data)
        ) {

          setReviews(data)

          setTotal(
            data.length
          )

        }

        // backend returns paginated object
        else {

          setReviews(
            data?.results ||
              []
          )

          setTotal(
            data?.total ||
              0
          )
        }

      } catch (e) {

        console.error(e)

        setError(
          e?.message ||
            'Failed to load reviews'
        )

      } finally {

        setLoading(false)
      }

    }, [JSON.stringify(params)])

  useEffect(() => {

    fetchReviews()

  }, [fetchReviews])

  return {
    reviews,
    total,
    loading,
    error,
    refetch:
      fetchReviews,
  }
}