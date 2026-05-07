import React, { useState } from 'react'
import ReviewTable from '../components/review/ReviewTable.jsx'
import SearchBar from '../components/common/SearchBar.jsx'
import Pagination from '../components/common/Pagination.jsx'
import Loader from '../components/common/Loader.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import useReviews from '../hooks/useReviews.js'

const STATUS_FILTERS = ['All', 'Pending', 'Review', 'Verified', 'Appeal', 'Rejected']

export default function ReviewQueue() {
  const [page,   setPage]   = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const { reviews, total, loading, error, refetch } = useReviews({
    page,
    search,
    status: status === 'All' ? undefined : status.toLowerCase(),
  })

  /* Fallback mock while API is not connected */
  const MOCK = [
    { id: 1, caseId: 'CIS-2024-0841', title: 'Art. 47 DPSP Directive',    department: 'Min. of Health',    createdAt: '2024-01-12', status: 'pending',  priority: 'high',   confidence: 98 },
    { id: 2, caseId: 'CIS-2024-0792', title: 'Fundamental Rights Review', department: 'Min. of Law',       createdAt: '2024-01-09', status: 'review',   priority: 'medium', confidence: 87 },
    { id: 3, caseId: 'CIS-2024-0755', title: 'Art. 21 Compliance',        department: 'Min. of Home',      createdAt: '2024-01-07', status: 'verified', priority: 'high',   confidence: 95 },
    { id: 4, caseId: 'CIS-2024-0718', title: 'Education Policy Directive', department: 'Min. of Education', createdAt: '2024-01-04', status: 'pending',  priority: 'low',    confidence: 91 },
    { id: 5, caseId: 'CIS-2024-0703', title: 'Finance DPSP Art. 39',      department: 'Min. of Finance',   createdAt: '2024-01-02', status: 'appeal',   priority: 'medium', confidence: 82 },
  ]

  const displayReviews = (reviews?.results || reviews || []).length > 0
    ? (reviews?.results || reviews)
    : MOCK

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Review <em>Queue</em></h1>
        <p className="page-subtitle">Pending constitutional directives awaiting officer review and verification</p>
      </div>

      <div className="page-body">
        <ErrorAlert message={error} />

        {/* Filters */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <SearchBar
              placeholder="Search by case ID, title, department…"
              value={search}
              onChange={setSearch}
              onSearch={() => { setPage(1); refetch() }}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => { setStatus(s); setPage(1) }}
                style={{
                  fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: 1, padding: '6px 14px',
                  background: status === s ? 'rgba(201,168,76,0.15)' : 'transparent',
                  color: status === s ? 'var(--gold)' : 'var(--silver)',
                  border: `1px solid ${status === s ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="dash-panel">
          <div className="panel-header">
            <span className="panel-title">Cases</span>
            <span className="panel-badge">{total || displayReviews.length} Total</span>
          </div>
          {loading ? (
            <Loader />
          ) : displayReviews.length === 0 ? (
            <EmptyState icon="📋" title="No cases found" desc="Try adjusting your filters or search query." />
          ) : (
            <ReviewTable reviews={displayReviews} />
          )}
        </div>

        <Pagination page={page} total={total || 0} pageSize={20} onChange={setPage} />
      </div>
    </>
  )
}
