import React, { useState, useEffect } from 'react'
import auditService from '../services/auditService.js'
import SearchBar from '../components/common/SearchBar.jsx'
import Pagination from '../components/common/Pagination.jsx'
import Loader from '../components/common/Loader.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { formatDateTime } from '../utils/formatDate.js'

const MOCK_LOGS = [
  { id: 1, timestamp: '2024-01-12T14:20:00', action: 'REVIEW_APPROVED',  user: 'Raj Sharma',    department: 'Min. of Law',      detail: 'CIS-2024-0841 approved'          },
  { id: 2, timestamp: '2024-01-12T13:10:00', action: 'DOCUMENT_UPLOADED', user: 'Priya Nair',   department: 'Min. of Health',   detail: 'Art. 47 directive uploaded'      },
  { id: 3, timestamp: '2024-01-12T11:45:00', action: 'AI_EXTRACTION',     user: 'AI Engine',    department: 'System',           detail: '6 fields extracted with 95% avg' },
  { id: 4, timestamp: '2024-01-12T10:00:00', action: 'LOGIN',             user: 'Amit Kulkarni',department: 'Min. of Finance',  detail: 'Successful login via SSO'        },
  { id: 5, timestamp: '2024-01-12T09:30:00', action: 'REVIEW_REJECTED',   user: 'Sonal Mehta',  department: 'Min. of Education',detail: 'CIS-2024-0788 returned for edit' },
  { id: 6, timestamp: '2024-01-11T17:20:00', action: 'DEADLINE_SET',      user: 'Admin',        department: 'System',           detail: 'Deadline set for CIS-2024-0841'  },
  { id: 7, timestamp: '2024-01-11T16:00:00', action: 'ANNOTATION_ADDED',  user: 'Raj Sharma',   department: 'Min. of Law',      detail: 'Annotation added to CIS-2024-0822'},
  { id: 8, timestamp: '2024-01-11T14:45:00', action: 'REVIEW_ESCALATED',  user: 'Priya Nair',   department: 'Min. of Health',   detail: 'Escalated to senior officer'     },
]

const ACTION_COLORS = {
  REVIEW_APPROVED:  'var(--jade-light)',
  REVIEW_REJECTED:  '#E74C3C',
  REVIEW_ESCALATED: 'var(--saffron)',
  DOCUMENT_UPLOADED:'var(--gold)',
  AI_EXTRACTION:    'var(--silver-light)',
  LOGIN:            'var(--silver)',
  DEADLINE_SET:     'var(--gold)',
  ANNOTATION_ADDED: 'var(--silver-light)',
}

export default function AuditLogs() {
  const [logs,    setLogs]    = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [page,    setPage]    = useState(1)
  const [total,   setTotal]   = useState(0)

  useEffect(() => {
    auditService.getLogs({ page, search })
      .then(data => { setLogs(data?.results || data || MOCK_LOGS); setTotal(data?.total || MOCK_LOGS.length) })
      .catch(() => { setLogs(MOCK_LOGS); setTotal(MOCK_LOGS.length) })
      .finally(() => setLoading(false))
  }, [page, search])

  const display = logs.length > 0 ? logs : MOCK_LOGS

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Audit <em>Logs</em></h1>
        <p className="page-subtitle">Immutable record of all platform actions, logins, and state changes</p>
      </div>

      <div className="page-body">
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, maxWidth: 400 }}>
            <SearchBar placeholder="Search by user, action, department…" value={search} onChange={setSearch} />
          </div>
          <button className="action-btn btn-edit" style={{ fontFamily: 'Cinzel, serif', fontSize: 10, padding: '8px 20px' }}>
            Export CSV
          </button>
        </div>

        <div className="dash-panel">
          <div className="panel-header">
            <span className="panel-title">Activity Log</span>
            <span className="panel-badge">{total} Entries</span>
          </div>

          {loading ? <Loader /> : display.length === 0 ? (
            <EmptyState icon="🗂️" title="No audit records" desc="No activity matching your search." />
          ) : (
            <div style={{ padding: '0 20px' }}>
              {/* Header row */}
              <div style={{ display: 'grid', gridTemplateColumns: '140px 160px 1fr 140px 120px', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Timestamp','Action','Detail','User','Department'].map(h => (
                  <span key={h} style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: 2, color: 'var(--silver)', textTransform: 'uppercase' }}>{h}</span>
                ))}
              </div>

              {display.map(log => (
                <div key={log.id} style={{ display: 'grid', gridTemplateColumns: '140px 160px 1fr 140px 120px', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: 9, color: 'var(--gold)', letterSpacing: 0.5 }}>{formatDateTime(log.timestamp)}</span>
                  <span style={{ fontSize: 10, color: ACTION_COLORS[log.action] || 'var(--silver-light)', fontFamily: 'Cinzel, serif', letterSpacing: 1 }}>{log.action}</span>
                  <span style={{ fontSize: 12, color: 'var(--cream)' }}>{log.detail}</span>
                  <span style={{ fontSize: 11, color: 'var(--silver-light)' }}>{log.user}</span>
                  <span style={{ fontSize: 10, color: 'var(--jade-light)', letterSpacing: 0.5 }}>{log.department}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Pagination page={page} total={total} pageSize={20} onChange={setPage} />
      </div>
    </>
  )
}
