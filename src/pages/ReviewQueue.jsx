import React, {
  useState,
} from 'react'

import ReviewTable from '../components/review/ReviewTable.jsx'
import SearchBar from '../components/common/SearchBar.jsx'
import Pagination from '../components/common/Pagination.jsx'
import Loader from '../components/common/Loader.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import EmptyState from '../components/common/EmptyState.jsx'

import useReviews from '../hooks/useReviews.js'

const STATUS_FILTERS = [
  'All',
  'Pending',
  'Assigned',
  'Verified',
  'Rejected',
]

export default function ReviewQueue() {

  const [page, setPage] =
    useState(1)

  const [search, setSearch] =
    useState('')

  const [status, setStatus] =
    useState('All')

  const {
    reviews,
    total,
    loading,
    error,
    refetch,
  } = useReviews({
    page,
    search,
    status:
      status === 'All'
        ? undefined
        : status.toUpperCase(),
  })

  // PURE BACKEND DATA
  const displayReviews =
    reviews?.results ||
    reviews ||
    []

  return (
    <>
      <div className="page-header">

        <h1 className="page-title">
          Review <em>Queue</em>
        </h1>

        <p className="page-subtitle">
          Pending constitutional
          directives awaiting
          officer review and
          verification
        </p>
      </div>

      <div className="page-body">

        <ErrorAlert
          message={error}
        />

        {/* FILTERS */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 20,
            alignItems:
              'center',
            flexWrap: 'wrap',
          }}
        >

          <div
            style={{
              flex: 1,
              minWidth: 240,
            }}
          >

            <SearchBar
              placeholder="Search by case ID, department..."
              value={search}
              onChange={setSearch}
              onSearch={() => {
                setPage(1)

                refetch()
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: 6,
            }}
          >

            {STATUS_FILTERS.map(
              s => (
                <button
                  key={s}
                  onClick={() => {

                    setStatus(s)

                    setPage(1)
                  }}

                  style={{
                    fontFamily:
                      'Cinzel, serif',

                    fontSize: 10,

                    letterSpacing: 1,

                    padding:
                      '6px 14px',

                    background:
                      status === s
                        ? 'rgba(201,168,76,0.15)'
                        : 'transparent',

                    color:
                      status === s
                        ? 'var(--gold)'
                        : 'var(--silver)',

                    border: `1px solid ${
                      status === s
                        ? 'rgba(201,168,76,0.4)'
                        : 'rgba(255,255,255,0.08)'
                    }`,

                    cursor:
                      'pointer',

                    transition:
                      'all 0.2s',
                  }}
                >
                  {s}
                </button>
              )
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="dash-panel">

          <div className="panel-header">

            <span className="panel-title">
              Cases
            </span>

            <span className="panel-badge">
              {total ||
                displayReviews.length}{' '}
              Total
            </span>
          </div>

          {loading ? (

            <Loader />

          ) : displayReviews.length ===
            0 ? (

            <EmptyState
              icon="📋"
              title="No review tasks found"
              desc="No reviews available in the system."
            />

          ) : (

            <ReviewTable
              reviews={
                displayReviews
              }
            />
          )}
        </div>

        <Pagination
          page={page}
          total={total || 0}
          pageSize={20}
          onChange={setPage}
        />
      </div>
    </>
  )
}